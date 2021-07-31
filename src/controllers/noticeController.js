import User from "../models/User";
import Posting from "../models/Posting";
import { async } from "regenerator-runtime";

export const notice = async (req, res) => {
  const importantPostings = await Posting.find({
    whichBoard: "공지사항",
    isImportant: true,
  }).populate("author");
  const postings = await Posting.find({ whichBoard: "공지사항" }).populate(
    "author"
  );
  return res.render("pages/postings", {
    pageTitle: "공지사항",
    importantPostings,
    postings,
  });
};

export const cases = async (req, res) => {
  const importantPostings = await Posting.find({
    whichBoard: "치료 전후 사례",
    isImportant: true,
  }).populate("author");
  const postings = await Posting.find({
    whichBoard: "치료 전후 사례",
  }).populate("author");
  return res.render("pages/postings", {
    pageTitle: "치료 전후 사례",
    importantPostings,
    postings,
  });
};

export const caution = async (req, res) => {
  const importantPostings = await Posting.find({
    whichBoard: "치료 후 주의사항",
    isImportant: true,
  }).populate("author");
  const postings = await Posting.find({
    whichBoard: "치료 후 주의사항",
  }).populate("author");
  return res.render("pages/postings", {
    pageTitle: "치료 후 주의사항",
    importantPostings,
    postings,
  });
};

export const posting = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.findById(id).populate("author");
  if (!posting) {
    return res.status(400).render("pages/404", {
      pageTitle: "게시물을 찾을 수 없습니다",
    });
  }
  return res.render("pages/posting", {
    pageTitle: posting.title,
    posting,
  });
};

export const deletePosting = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res
      .status(404)
      .render("404", { pageTitle: "게시물을 찾을 수 없습니다." });
  }
  if (String(posting.author) !== String(_id)) {
    return res.status(403).redirect(`/notice/${id}`);
  }
  await Posting.findByIdAndDelete(id);
  return res.redirect("/notice");
};

export const getUploadPosting = (req, res) => {
  return res.render("pages/upload", { pageTitle: "게시글 작성" });
};

export const postUploadPosting = async (req, res) => {
  const { title, whichBoard, content, isImportant } = req.body;
  const {
    user: { _id },
  } = req.session;
  try {
    const newPosting = await Posting.create({
      title,
      content,
      createdAt: Date.now(),
      lastEdit: Date.now(),
      whichBoard,
      isImportant,
      meta: {
        views: 0,
      },
      author: _id,
    });
    const user = await User.findById(_id);
    user.postings.push(newPosting._id);
    await user.save();
    return res.redirect("/notice");
  } catch (error) {
    return res.status(400).render("pages/upload", {
      pageTitle: "게시글 작성",
      errorMessage: error._message,
    });
  }
};

export const getEditPosting = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const posting = await Posting.findById(id);
  const isImportant = posting.isImportant === "true";
  const isNotice = posting.whichBoard === "공지사항" ? true : false;
  const isCase = posting.whichBoard === "치료 전후 사례" ? true : false;
  const isCaution = posting.whichBoard === "치료 후 주의사항" ? true : false;
  console.log(typeof isImportant, isImportant);
  if (String(posting.author) !== String(_id)) {
    return res.status(403).redirect(`/notice/${id}`);
  }
  return res.render("pages/editPosting", {
    pageTitle: "게시글 수정",
    posting,
    isImportant,
    isNotice,
    isCase,
    isCaution,
  });
};

export const postEditPosting = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, whichBoard, content, isImportant } = req.body;
  const postingEdited = await Posting.findByIdAndUpdate(id, {
    title,
    whichBoard,
    content,
    isImportant: isImportant,
    lastEdit: Date.now(),
  });
  if (String(postingEdited.author) !== String(_id)) {
    return res.status(403).redirect(`/notice/${id}`);
  }
  return res.redirect(`/notice/${id}`);
};

export const apiImage = (req, res) => {
  const { path: fileUrl } = req.file;
  res.append("imgPath", fileUrl);
  return res.sendStatus(200);
};

export const apiViews = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.sendStatus(404);
  }
  posting.meta.views = posting.meta.views + 1;
  await posting.save();
  return res.sendStatus(200);
};
