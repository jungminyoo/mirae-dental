import express from "express";
import { sitemap } from "../controllers/pageController";

const metaRouter = express.Router();

metaRouter.get("/sitemap", sitemap);

export default metaRouter;
