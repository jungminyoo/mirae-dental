import express from "express";
import { director, guide, intro } from "../controllers/pageController";

const introRouter = express.Router();

introRouter.get("/", intro);
introRouter.get("/director", director);
introRouter.get("/guide", guide);

export default introRouter;
