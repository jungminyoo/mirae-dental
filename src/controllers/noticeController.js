import User from "../models/User";
import Posting from "../models/Posting";
import { async } from "regenerator-runtime";

export const notice = async (req, res) => {
  const postings = await Posting.find({ whichBoard: "공지사항" });
  return res.render("pages/postings", { pageTitle: "공지사항", postings });
};

export const cases = async (req, res) => {
  const postings = await Posting.find({ whichBoard: "치료 전후 사례" });
  return res.render("pages/postings", {
    pageTitle: "치료 전후 사례",
    postings,
  });
};

export const caution = async (req, res) => {
  const postings = await Posting.find({ whichBoard: "치료 후 주의사항" });
  return res.render("pages/postings", {
    pageTitle: "치료 후 주의사항",
    postings,
  });
};

export const posting = (req, res) => {
  return res.render("pages/posting", { pageTitle: "게시글 제목 넣기" });
};

export const deletePosting = (req, res) => {
  return res.send("<h1>Delete</h1>");
};

export const getUploadPosting = (req, res) => {
  return res.render("pages/upload", { pageTitle: "게시글 작성" });
};

export const postUploadPosting = async (req, res) => {
  const { title, whichBoard, content } = req.body;
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

export const getEditPosting = (req, res) => {
  return res.render("pages/edit", { pageTitle: "게시글 수정" });
};

export const postEditPosting = (req, res) => {
  return res.end();
};
