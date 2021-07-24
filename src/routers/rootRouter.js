import express from "express";
import { home } from "../controllers/pageController";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
