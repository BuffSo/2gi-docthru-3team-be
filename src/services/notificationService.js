import BadRequestError from "../errors/BadRequestError.js";
import ForbiddenError from "../errors/ForbiddenError.js";
import notificationRepository from "../repositories/notificationRepository.js";
import userService from "../services/userService.js";

/*************************************************************************************
 * 사용자 알림 목록 조회 (사용자 정보 함께 반환)
 * ***********************************************************************************
 */
export async function getNotificationWithUserInfo(userId, filters, pagination) {
  const { isRead } = filters;
  const { page, limit, order, sort } = pagination;

  const skip = (page - 1) * limit;
  const take = limit;

  const safeSort = ['asc', 'desc'].includes(sort) ? sort : 'desc';
  const orderField = ['createdAt', 'readAt'].includes(order) ? order : 'createdAt';

  const where = {
    AND: [
      { userId },
      { isRead },
    ],
  };

  const notifications = await notificationRepository.get({
    where,
    skip,
    take,
    orderBy: { [orderField]: safeSort },
    include: {
      challenge: { select: { id: true, title: true } },
      work: { select: { id: true, content: true } },
      feedback: { select: { id: true, content: true } },
    },
  });

  const totalCount = await notificationRepository.count({ where });

  const userInfo = await userService.getUserById(userId);

  return {
    user: {
      id: userId,
      ...userInfo, // Include user info from the request
    },
    notifications: {
      list: notifications,
      totalCount,
      hasMore: skip + take < totalCount,
    },
  };
}

/*************************************************************************************
 * 특정 알림 읽음 표시
 * ***********************************************************************************
 */
export async function markNotificationAsRead(userId, notificationId) {
  // Notification 조회 및 읽음 업데이트
  const notification = await notificationRepository.findById(notificationId);

  if (!notification) {
    throw new BadRequestError("요청하신 알림이 존재하지 않습니다.");
  }
   
  if(notification.userId !== userId) {
    throw new ForbiddenError("자신의 알림만 읽음 처리할 수 있습니다.");
  }

  const updatedNotification = await notificationRepository.update(notificationId, {
    isRead: true,
    readAt: new Date(),
  });

  return updatedNotification;
}

export default {
  getNotificationWithUserInfo,
  markNotificationAsRead,
};
