import prisma from "../src/config/prisma.js";
import { USER, APPLICATION, CHALLENGE, FEEDBACK, WORK, PARTICIPATE } from "./mock.js";

async function main() {
  const tableOrder = ["Notification", "FeedbackLog", "WorkLog", "Participate", "Feedback", "Work", "Application", "Challenge", "User"]; 
  
  for (const table of tableOrder) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }

  await prisma.$transaction(async (tx) => {
    for (const user of USER) {
      await tx.user.create({ data: user });
    }
  });

  await prisma.$transaction(async (tx) => {
    for (const challenge of CHALLENGE) {
      await tx.challenge.create({ data: challenge });
    }
  });

  await prisma.$transaction(async (tx) => {
    for (const application of APPLICATION) {
      await tx.application.create({ data: application });
    }
  });

  await prisma.$transaction(async (tx) => {
    for (const work of WORK) {
      await tx.work.create({ data: work });
    }
  });

  await prisma.$transaction(async (tx) => {
    for (const feedback of FEEDBACK) {
      await tx.feedback.create({ data: feedback });
    }
  });

  await prisma.$transaction(async (tx) => {
    for (const participate of PARTICIPATE) {
      await tx.participate.create({ data: participate });
    }
  });

   // 시퀀스 초기화
   for (const table of tableOrder) {
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('"${table}"', 'id'),
        COALESCE((SELECT MAX(id) FROM "${table}"), 1)
      );
    `);
  }
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});