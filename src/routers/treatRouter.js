import express from "express";
import {
  cervical,
  dentures,
  endodontic,
  implant,
  periodental,
  prosthetic,
} from "../controllers/pageController";

const treatRouter = express.Router();

treatRouter.get("/prosthetic", prosthetic);
treatRouter.get("/implant", implant);
treatRouter.get("/dentures", dentures);
treatRouter.get("/endodontic", endodontic);
treatRouter.get("/periodental", periodental);
treatRouter.get("/cervical", cervical);

export default treatRouter;
