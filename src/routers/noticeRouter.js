import express from "express";
import {
  notice,
  getUploadPosting,
  postUploadPosting,
  cases,
  caution,
  posting,
  getEditPosting,
  postEditPosting,
  deletePosting,
} from "../controllers/noticeController";

const noticeRouter = express.Router();

noticeRouter.get("/", notice);
noticeRouter.get("/cases", cases);
noticeRouter.get("/caution", caution);
noticeRouter.route("/upload").get(getUploadPosting).post(postUploadPosting);
noticeRouter.get("/:id([0-9a-f]{24})", posting);
noticeRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getEditPosting)
  .post(postEditPosting);
noticeRouter.get("/:id([0-9a-f]{24})/delete", deletePosting);

export default noticeRouter;
