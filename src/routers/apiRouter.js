import express from "express";
import { apiImage, apiViews } from "../controllers/noticeController";
import { protectorMiddleware, uploadImage } from "../middlewares";

const apiRouter = express.Router();

apiRouter
  .route("/image")
  .post(protectorMiddleware, uploadImage.single("image"), apiImage);
apiRouter.route("/:id([0-9a-f]{24})/views").post(apiViews);

export default apiRouter;
