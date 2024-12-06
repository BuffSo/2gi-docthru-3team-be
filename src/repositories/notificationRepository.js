import prisma from '../config/prisma.js';

/*************************************************************************************
 * 알림 데이터 가져오기
 * ***********************************************************************************
 */
async function get({ where, skip, take, orderBy, include }) {
  return prisma.notification.findMany({
    where,
    skip,
    take,
    orderBy,
    include,
  });
}

/*************************************************************************************
 * 알림 데이터 총 개수 계산
 * ***********************************************************************************
 */
async function count({ where }) {
  return prisma.notification.count({ where });
}

/*************************************************************************************
 * 알림 ID로 조회
 * ***********************************************************************************
 */
async function findById(notificationId) {
  return prisma.notification.findUnique({
    where: { id: notificationId },
  });
}

/*************************************************************************************
 * 알림 업데이트
 * ***********************************************************************************
 */
async function update(notificationId, data) {
  return prisma.notification.update({
    where: { id: notificationId },
    data,
  });
}

export default {
  get,
  count,
  findById,
  update,
};
