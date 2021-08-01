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
import { protectorMiddleware } from "../middlewares";

const noticeRouter = express.Router();

noticeRouter.get("/:page(\\d+)", notice);
noticeRouter.get("/cases/:page(\\d+)", cases);
noticeRouter.get("/caution/:page(\\d+)", caution);
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
