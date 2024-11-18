import prisma from "../src/config/prisma.js";
import { USER, APPLICATION, CHALLENGE, FEEDBACK, WORK } from "./mock.js";

async function main() {
  await prisma.feedback.deleteMany();
  await prisma.work.deleteMany();
  await prisma.application.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  for (const user of USER) {
    try {
      await prisma.user.create({ data: user });
    } catch (error) {
      console.error(error.message);
    }
  }

  for (const challenge of CHALLENGE) {
    try {
      await prisma.challenge.create({ data: challenge });
    } catch (error) {
      console.error(error.message);
    }
  }

  for (const application of APPLICATION) {
    try {
      await prisma.application.create({ data: application });
    } catch (error) {
      console.error(error.message);
    }
  }

  for (const work of WORK) {
    try {
      await prisma.work.create({ data: work });
    } catch (error) {
      console.error(error.message);
    }
  }

  for (const feedback of FEEDBACK) {
    try {
      await prisma.feedback.create({ data: feedback });
    } catch (error) {
      console.error(error.message);
    }
  }
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});