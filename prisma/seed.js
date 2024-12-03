import prisma from "../src/config/prisma.js";
import { USER, APPLICATION, CHALLENGE, FEEDBACK, WORK, PARTICIPATE } from "./mock.js";

async function main() {
  const tableOrder = ["Notification", "FeedbackLog", "WorkLog", "Participate", "Feedback", "Work", "Application", "Challenge", "User"]; // tableOrder 변수 선언

  await prisma.$transaction(async (tx) => {
    // 테이블 순서대로 초기화
    for (const table of tableOrder) {
      await tx.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    }

    // 데이터 삽입
    for (const user of USER) {
      await tx.user.create({ data: user });
    }

    for (const challenge of CHALLENGE) {
      await tx.challenge.create({ data: challenge });
    }

    for (const application of APPLICATION) {
      await tx.application.create({ data: application });
    }

    for (const work of WORK) {
      await tx.work.create({ data: work });
    }

    for (const feedback of FEEDBACK) {
      await tx.feedback.create({ data: feedback });
    }

    for (const participate of PARTICIPATE) {
      await tx.participate.create({ data: participate });
    }
    
    // 시퀀스 초기화
    for (const table of tableOrder) {
      await tx.$executeRawUnsafe(`
        SELECT setval(
          pg_get_serial_sequence('"${table}"', 'id'),
          COALESCE((SELECT MAX(id) FROM "${table}"), 1)
        );
      `);
    }
  });
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});