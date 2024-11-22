import express from "express";
import passport from "../config/passport.js";
import { getChallenges, getChallengeById, createChallenge, patchChallenge, deleteChallenge } from "../controllers/challengeController.js";
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 챌린지 목록 조회(Accepted 상태) -> 비회원도 가능
router.get("/", getChallenges);

// 챌린지 상세 조회 -> 여기서부터는 회원만 가능
router.get("/:id", 
  passport.authenticate('access-token', { session: false }),
  getChallengeById
);

// 챌린지 신청
router.post("/", 
  passport.authenticate('access-token', { session: false }),
  createChallenge
);

// 챌린지 수정
router.patch("/:id", 
  passport.authenticate('access-token', { session: false }),
  patchChallenge
);

// 챌린지 삭제(Admin)
router.patch(
  "/:id/invalidate",
  passport.authenticate("access-token", { session: false }),
  adminOnly,
  deleteChallenge
);

export default router;
