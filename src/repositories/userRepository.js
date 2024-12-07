import prisma from "../config/prisma.js";
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email) {
  return prisma.user.findFirst({
    where: {
      email: {
        equals: email.toLowerCase(), 
        mode: 'insensitive', 
      },
    },
  });
}

async function save(user) {
  return prisma.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      password: user.password
    },
  });
}

async function update(id, data) {
  return prisma.user.update({
    where: {
      id,
    },
    data: data,
  })
}

async function createOrUpdate(provider, providerId, email, nickname) {
  const randomPassword = await bcrypt.hash(randomBytes(8).toString('base64'), 10);
  const existingAccount = await prisma.socialAccount.findUnique({
    where: {
      provider_providerId: {
        provider,
        providerId,
      },
    },
    include: {
      user: true,
    }
  });

  if (existingAccount) {
    return await prisma.user.update({
      where: {
        id: existingAccount.user.id,
      },
      data: {
        email,
        nickname,
      },
    });
  } else {
    const account = await prisma.socialAccount.create({
      data: {
        provider,
        providerId: String(providerId),
        user: {
          create: {
            email,
            nickname,
            password: randomPassword,
          },
        },
      },
      include: {
        user: true,
      },
    });
    return account.user;
  }
  // return prisma.user.upsert({
  //   where: {
  //     // provider_providerId: {
  //     //   provider,
  //       providerId,
  //     // },
  //   },
  //   update: {
  //     email,
  //     nickname,
  //   },
  //   create: {
  //     provider,
  //     providerId,
  //     email,
  //     nickname,
  //     password: randomPassword,
  //   },
  // });
}

export default {
  findById,
  findByEmail,
  save,
  update,
  createOrUpdate,
}
