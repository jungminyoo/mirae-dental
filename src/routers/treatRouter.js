import express from "express";
import {
  dentures,
  endodontic,
  implant,
  others,
  prosthetic,
} from "../controllers/pageController";

const treatRouter = express.Router();

treatRouter.get("/prosthetic", prosthetic);
treatRouter.get("/implant", implant);
treatRouter.get("/dentures", dentures);
treatRouter.get("/endodontic", endodontic);
treatRouter.get("/others", others);

export default treatRouter;
