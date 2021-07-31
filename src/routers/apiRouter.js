import express from "express";
import { apiImage } from "../controllers/noticeController";
import { protectorMiddleware, uploadImage } from "../middlewares";

const apiRouter = express.Router();

apiRouter
  .route("/image")
  .post(protectorMiddleware, uploadImage.single("image"), apiImage);

export default apiRouter;
