import express from "express";
import passport from "../config/passport.js";
import { postParticipation, getOriginal } from "../controllers/participationController.js";

const router = express.Router();

router.post("/:id/participations",
  passport.authenticate("access-token", { session: false }),
  postParticipation
);

router.get("/:id/original",
  passport.authenticate("access-token", { session: false }),
  getOriginal
);

export default router;
