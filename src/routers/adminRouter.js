import express from "express";
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getEditAdmin,
  postEditAdmin,
} from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.route("/register").get(getRegister).post(postRegister);
adminRouter.route("/login").get(getLogin).post(postLogin);
adminRouter.route("/edit").get(getEditAdmin).post(postEditAdmin);

export default adminRouter;
