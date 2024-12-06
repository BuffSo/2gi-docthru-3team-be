import * as s from "superstruct";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function validateUserData(data, provider) {
  const { email, nickname } = data;

  try {
    // 이메일 중복 확인
    const existingEmail = await prisma.socialAccount.findFirst({
      where: {
          provider: { not: provider },
          user: { email },
      },
      include: { user: true },
    });

    if (existingEmail) {
      return { isDuplicate: true, field: '이메일' }; // 에러 반환
    }

    // 닉네임 중복 확인
    const existingNickname = await prisma.socialAccount.findFirst({
      where: { 
          provider: { not: provider },
          user: { nickname },
      },
      include: { user: true },
    });

    if (existingNickname) {
      return { isDuplicate: true, field: '닉네임' }; // 에러 반환
    }

    return { isDuplicate: false, user: null }; // 중복 없음
  } catch (error) {
    throw error;
  }
}