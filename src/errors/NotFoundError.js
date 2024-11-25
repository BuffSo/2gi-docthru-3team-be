import CustomError from './CustomError.js';

export default class NotFoundError extends CustomError {
  constructor(message = '요청하신 리소스를 찾을 수 없습니다.') {
    super(message, 404);
  }
}