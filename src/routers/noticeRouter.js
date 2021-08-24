import express from "express";
import {
  postings,
  getUploadPosting,
  postUploadPosting,
  posting,
  getEditPosting,
  postEditPosting,
  deletePosting,
} from "../controllers/noticeController";
import { protectorMiddleware } from "../middlewares";

const noticeRouter = express.Router();

noticeRouter.get("/:page(\\d+)", postings);
noticeRouter.get("/search/:page(\\d+)", postings);
noticeRouter.get("/media/:page(\\d+)", postings);
noticeRouter.get("/media/search/:page(\\d+)", postings);
noticeRouter.get("/caution/:page(\\d+)", postings);
noticeRouter.get("/caution/search/:page(\\d+)", postings);
noticeRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUploadPosting)
  .post(postUploadPosting);
noticeRouter.get("/:id([0-9a-f]{24})", posting);
noticeRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEditPosting)
  .post(postEditPosting);
noticeRouter.get(
  "/:id([0-9a-f]{24})/delete",
  protectorMiddleware,
  deletePosting
);

export default noticeRouter;
