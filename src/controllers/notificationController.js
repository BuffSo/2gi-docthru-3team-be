import asyncHandler from "../middlewares/asyncHandler.js"
import notificationService from "../services/notificationService.js";

/*************************************************************************************
 * 사용자 알림 목록 조회 (사용자 정보 함께 반환)
 * ***********************************************************************************
 */
export const getNotificationWithUserInfo = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, order = 'createdAt', sort = 'asc', is_read = false } = req.query;
  const userId = req.user.id;

  const filters = {
    isRead: is_read === 'true',
  };

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    order,
    sort,
  };

  const result = await notificationService.getNotificationWithUserInfo(userId, filters, pagination);
  res.status(200).json(result);
});


/*************************************************************************************
 * 특정 알림 읽음 표시
 * ***********************************************************************************
 */
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notificationId = parseInt(req.params.id, 10);

  const result = await notificationService.markNotificationAsRead(userId, notificationId);

  if (!result) {
    return res.status(404).json({ message: '신규 알림이 없습니다.' });
  }

  res.status(200).json({ message: '알림이 읽음 처리 되었습니다.' });
});



