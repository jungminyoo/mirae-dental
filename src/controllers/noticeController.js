import User from "../models/User";
import Posting from "../models/Posting";
import { async } from "regenerator-runtime";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const POSTING_MAX = 10;
export const IMP_POSTING_MAX = 4;

const processPage = (page, importantPostings, postings) => {
  importantPostings = importantPostings.slice(0, IMP_POSTING_MAX);
  const impLength = importantPostings.length;
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

const findPostings = async (search, value, whichBoard) => {
  let importantPostings;
  let postings;
  if (search === "title") {
    importantPostings = await Posting.find({
      whichBoard,
      isImportant: true,
      title: { $regex: `${value}` },
    })
      .populate("author")
      .sort({ createdAt: "desc" });
    postings = await Posting.find({
      whichBoard,
      title: { $regex: `${value}` },
    }).populate("author");
  } else if (search === "content") {
    importantPostings = await Posting.find({
      whichBoard,
      isImportant: true,
    })
      .populate("author")
      .sort({ createdAt: "desc" });
    postings = await Posting.find({
      whichBoard,
    })
      .populate("author")
      .sort({ createdAt: "desc" });

    importantPostings = importantPostings.filter((posting) => {
      const converter = new QuillDeltaToHtmlConverter(posting.content.ops);
      const content = converter.convert();
      return content.includes(value);
    });
    postings = postings.filter((posting) => {
      const converter = new QuillDeltaToHtmlConverter(posting.content.ops);
      const content = converter.convert();
      return content.includes(value);
    });
  } else if (search === "author") {
    importantPostings = await Posting.find({
      whichBoard,
      isImportant: true,
    })
      .populate("author")
      .sort({ createdAt: "desc" });
    postings = await Posting.find({
      whichBoard,
    })
      .populate("author")
      .sort({ createdAt: "desc" });

    importantPostings = importantPostings.filter((posting) => {
      return posting.author.name.includes(value);
    });
    postings = postings.filter((posting) => {
      return posting.author.name.includes(value);
    });
  } else {
    importantPostings = [];
    postings = [];
  }
  return [importantPostings, postings];
};

export const postings = async (req, res) => {
  const { page } = req.params;
  const { search, value } = req.query;
  let searchPage;
  let searchQuery;
  let whichBoard;
  if (req.originalUrl.includes("search")) {
    searchQuery = `?search=${search}&value=${value}`;
    if (req.originalUrl.includes("media")) {
      whichBoard = "????????????";
      searchPage = "/media/search/";
    } else if (req.originalUrl.includes("caution")) {
      whichBoard = "?????? ??? ????????????";
      searchPage = "/caution/search/";
    } else {
      whichBoard = "????????????";
      searchPage = "/search/";
    }
  } else {
    if (req.originalUrl.includes("media")) {
      whichBoard = "????????????";
      searchPage = "/media/";
    } else if (req.originalUrl.includes("caution")) {
      whichBoard = "?????? ??? ????????????";
      searchPage = "/caution/";
    } else {
      whichBoard = "????????????";
      searchPage = "/";
    }
  }
  let importantPostings;
  let postings;
  if (search && value) {
    const searchPostings = await findPostings(search, value, whichBoard);
    importantPostings = searchPostings[0];
    postings = searchPostings[1];
  } else {
    importantPostings = await Posting.find({
      whichBoard,
      isImportant: true,
    })
      .populate("author")
      .sort({ createdAt: "desc" });
    postings = await Posting.find({
      whichBoard,
    })
      .populate("author")
      .sort({ createdAt: "desc" });
  }
  let maxPage;
  const postLength = POSTING_MAX - importantPostings.length;
  if (postings.length % postLength > 0) {
    maxPage = Math.floor(postings.length / postLength) + 1;
  } else {
    maxPage = Math.floor(postings.length / postLength);
  }
  const pageArr = [...Array(maxPage).keys()];
  const result = processPage(page, importantPostings, postings);
  importantPostings = result[0];
  postings = result[1];
  return res.render("pages/postings", {
    pageTitle: whichBoard,
    importantPostings,
    postings,
    searchPage,
    searchQuery,
    page,
    maxPage,
    pageArr,
  });
};

export const posting = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.findById(id).populate("author");
  let backPage;
  if (posting.whichBoard === "????????????") {
    backPage = "/media/";
  } else if (posting.whichBoard === "?????? ??? ????????????") {
    backPage = "/caution/";
  } else {
    backPage = "/";
  }
  if (!posting) {
    return res.status(400).render("pages/404", {
      pageTitle: "???????????? ?????? ??? ????????????",
      errorMessage: "???????????? ?????? ??? ????????????",
    });
  }
  return res.render("pages/posting", {
    pageTitle: posting.title,
    posting,
    backPage,
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
      pageTitle: "???????????? ?????? ??? ????????????.",
      errorMessage: "???????????? ?????? ??? ????????????.",
    });
  }
  if (String(posting.author) !== String(_id)) {
    req.flash("error", "??? ???????????? ???????????? ????????????.");
    return res.status(403).redirect(`/notice/${id}`);
  }
  await Posting.findByIdAndDelete(id);
  req.flash("notice", "???????????? ??????????????? ?????????????????????.");
  return res.redirect("/notice/1");
};

export const getUploadPosting = (req, res) => {
  return res.render("pages/upload", { pageTitle: "????????? ??????" });
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
    res.append("id", newPosting._id);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).render("pages/upload", {
      pageTitle: "????????? ??????",
      errorMessage: "????????? ?????? ?????? ????????? ??????????????????. ?????? ??????????????????.",
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
  const isNotice = posting.whichBoard === "????????????" ? true : false;
  const isMedia = posting.whichBoard === "????????????" ? true : false;
  const isCaution = posting.whichBoard === "?????? ??? ????????????" ? true : false;
  if (String(posting.author) !== String(_id)) {
    req.flash("error", "??? ???????????? ???????????? ????????????.");
    return res.status(403).redirect(`/notice/${id}`);
  }
  return res.render("pages/editPosting", {
    pageTitle: "????????? ??????",
    posting,
    isImportant,
    isNotice,
    isMedia,
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
    req.flash("error", "??? ???????????? ???????????? ????????????.");
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
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).render("pages/editPosting", {
      pageTitle,
      errorMessage: "????????? ?????? ?????? ????????? ??????????????????. ?????? ??????????????????.",
    });
  }
};

export const apiImage = (req, res) => {
  const { file } = req;
  const isHeroku = process.env.NODE_ENV === "production";
  res.append("imgPath", isHeroku ? file.location : file.path);
  res.append("isHeroku", isHeroku);
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
