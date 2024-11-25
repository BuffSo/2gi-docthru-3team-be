import CustomError from './CustomError.js';

export default class ConflictError extends CustomError {
  constructor(message = '리소스 충돌이 발생했습니다.', data) {
    super(message, 409);
    this.data = data;
  }
}
