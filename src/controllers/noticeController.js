import User from "../models/User";
import Posting from "../models/Posting";
import { async } from "regenerator-runtime";

const POSTING_MAX = 10;
const IMP_POSTING_MAX = 5;

const processPage = (page, importantPostings, postings) => {
  importantPostings = importantPostings.slice(0, IMP_POSTING_MAX);
  const impLength = importantPostings.length;
  postings = postings.reverse();
  const originalLength = postings.length;
  const postLength = POSTING_MAX - impLength;
  postings = postings.slice(
    postLength * (page - 1),
    postLength * (page - 1) + postLength
  );
  const realLength = postings.length;
  for (let i = 0; i < realLength; i++) {
    postings[i].index = originalLength - (postLength * (page - 1) + i);
  }
  const resultPostings = [importantPostings, postings];
  return resultPostings;
};

export const notice = async (req, res) => {
  const { page } = req.params;
  let importantPostings = await Posting.find({
    whichBoard: "공지사항",
    isImportant: true,
  }).populate("author");
  let postings = await Posting.find({ whichBoard: "공지사항" }).populate(
    "author"
  );
  const result = processPage(page, importantPostings, postings);
  importantPostings = result[0];
  postings = result[1];
  return res.render("pages/postings", {
    pageTitle: "공지사항",
    importantPostings,
    postings,
  });
};

export const cases = async (req, res) => {
  const { page } = req.params;
  let importantPostings = await Posting.find({
    whichBoard: "치료 전후 사례",
    isImportant: true,
  }).populate("author");
  let postings = await Posting.find({
    whichBoard: "치료 전후 사례",
  }).populate("author");
  const result = processPage(page, importantPostings, postings);
  importantPostings = result[0];
  postings = result[1];
  return res.render("pages/postings", {
    pageTitle: "치료 전후 사례",
    importantPostings,
    postings,
  });
};

export const caution = async (req, res) => {
  const { page } = req.params;
  let importantPostings = await Posting.find({
    whichBoard: "치료 후 주의사항",
    isImportant: true,
  }).populate("author");
  let postings = await Posting.find({
    whichBoard: "치료 후 주의사항",
  }).populate("author");
  const result = processPage(page, importantPostings, postings);
  importantPostings = result[0];
  postings = result[1];
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
      errorMessage: "게시물을 찾을 수 없습니다",
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
    return res.status(404).render("404", {
      pageTitle: "게시물을 찾을 수 없습니다.",
      errorMessage: "게시물을 찾을 수 없습니다.",
    });
  }
  if (String(posting.author) !== String(_id)) {
    req.flash("error", "이 게시물의 작성자가 아닙니다.");
    return res.status(403).redirect(`/notice/${id}`);
  }
  await Posting.findByIdAndDelete(id);
  req.flash("notice", "게시물이 정상적으로 삭제되었습니다.");
  return res.redirect("/notice/1");
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
    return res.redirect("/notice/1");
  } catch (error) {
    return res.status(400).render("pages/upload", {
      pageTitle: "게시글 작성",
      errorMessage: "게시물 등록 도중 오류가 발생했습니다. 다시 시도해주세요.",
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
  if (String(posting.author) !== String(_id)) {
    req.flash("error", "이 게시물의 작성자가 아닙니다.");
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
  const posting = await Posting.findById(id);
  if (String(posting.author) !== String(_id)) {
    req.flash("error", "이 게시물의 작성자가 아닙니다.");
    return res.status(403).redirect(`/notice/${id}`);
  }
  try {
    await Posting.findByIdAndUpdate(id, {
      title,
      whichBoard,
      content,
      isImportant,
      lastEdit: Date.now(),
    });
    return res.redirect(`/notice/${id}`);
  } catch (error) {
    return res.status(400).render("pages/editPosting", {
      pageTitle,
      errorMessage: "게시물 수정 도중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
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
