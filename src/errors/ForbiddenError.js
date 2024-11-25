import CustomError from './CustomError.js';

export default class ForbiddenError extends CustomError {
  constructor(message = '권한이 없습니다.') {
    super(message, 403);
  }
}