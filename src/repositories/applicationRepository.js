import prisma from "../config/prisma.js";

async function create(data) {
    return await prisma.application.create({ data });
}

export default { create };