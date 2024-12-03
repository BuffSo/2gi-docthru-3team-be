import * as s from "superstruct";
import prisma from "./src/config/prisma";
import { BadRequestError } from "./src/errors";

export const UserStructure = s.object({
  email: s.string(),
  nickname: s.size(s.string(), 1, 30),
  password: s.min(s.string(), 8),
});

export const CreateChallenge = s.object({
    title: s.size(s.string(), 2, 100),
    docUrl: s.string(),
    maxParticipants: s.refine(s.number(), 'maxParticipants', (value) => value > 0 && value <= 50),
    description: s.string(),
});

export const CreateFeedback = s.object({
    content: s.size(s.string(), 0, 1000),
});

export const CreateWork = s.object({
    content: s.string(),
});

export const PatchChallenge = s.partial(CreateChallenge);

export const PatchFeedback = s.partial(CreateFeedback);

export const PatchWork = s.partial(CreateWork);

export async function validateUserData(data) {
  try {
    UserStructure(data);
  } catch (error) {
    throw new Error(error.message);
  }

  const { email, nickname } = data;

  // 이메일 중복 확인
  const existingEmail = await prisma.user.findUnique({
    where: { email }
  });

  if (existingEmail) {
    throw new BadRequestError("이미 존재하는 이메일입니다.");
  }

  // 닉네임 중복 확인
  const existingNickname = await prisma.user.findUnique({
    where: { nickname }
  });

  if (existingNickname) {
    throw new BadRequestError("이미 존재하는 닉네임입니다.");
  }
}


