import express from "express";
import { privacy, policy } from "../controllers/pageController";

const metaRouter = express.Router();

metaRouter.get("/policy", policy);
metaRouter.get("/privacy", privacy);

export default metaRouter;
