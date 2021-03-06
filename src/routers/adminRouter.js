import express from "express";
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getEditAdmin,
  postEditAdmin,
  logout,
  getEditPassword,
  postEditPassword,
} from "../controllers/adminController";
import { protectorMiddleware, publicOnlyMiddleWare } from "../middlewares";

const adminRouter = express.Router();

adminRouter
  .route("/register")
  .all(publicOnlyMiddleWare)
  .get(getRegister)
  .post(postRegister);
adminRouter
  .route("/login")
  .all(publicOnlyMiddleWare)
  .get(getLogin)
  .post(postLogin);
adminRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditAdmin)
  .post(postEditAdmin);
adminRouter
  .route("/edit/password")
  .all(protectorMiddleware)
  .get(getEditPassword)
  .post(postEditPassword);
adminRouter.get("/logout", protectorMiddleware, logout);

export default adminRouter;
