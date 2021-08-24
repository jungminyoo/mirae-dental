import { IMP_POSTING_MAX } from "./noticeController";
import User from "../models/User";
import Posting from "../models/Posting";
import { async } from "regenerator-runtime";

export const home = async (req, res) => {
  let importantPostings = await Posting.find({
    whichBoard: "공지사항",
    isImportant: true,
  })
    .populate("author")
    .sort({ createdAt: "desc" });
  importantPostings = importantPostings.slice(0, IMP_POSTING_MAX);
  return res.render("pages/home", { pageTitle: "홈", importantPostings });
};

export const intro = (req, res) => {
  return res.render("pages/intro", { pageTitle: "병원소개" });
};

export const director = (req, res) => {
  return res.render("pages/director", { pageTitle: "원장소개" });
};

export const guide = (req, res) => {
  res.locals.KAKAO_JS_KEY = process.env.KAKAO_JS_KEY;
  return res.render("pages/guide", { pageTitle: "진료안내" });
};

export const prosthetic = (req, res) => {
  return res.render("pages/prosthetic", { pageTitle: "심미보철" });
};

export const implant = (req, res) => {
  return res.render("pages/implant", { pageTitle: "임플란트" });
};

export const dentures = (req, res) => {
  return res.render("pages/dentures", { pageTitle: "틀니" });
};

export const endodontic = (req, res) => {
  return res.render("pages/endodontic", { pageTitle: "신경치료" });
};

export const periodental = (req, res) => {
  return res.render("pages/periodental", { pageTitle: "치주치료" });
};

export const cervical = (req, res) => {
  return res.render("pages/cervical", { pageTitle: "치경부마모" });
};

export const sitemap = (req, res) => {
  return res.render("pages/sitemap", { pageTitle: "사이트맵" });
};
