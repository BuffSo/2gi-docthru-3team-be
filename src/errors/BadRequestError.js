import CustomError from './CustomError.js';

export default class BadRequestError extends CustomError {
  constructor(message = '잘못된 요청입니다.') {
    super(message, 400);
  }
}