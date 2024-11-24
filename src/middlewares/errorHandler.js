import { Prisma } from "@prisma/client";

export default function errorHandler(error, req, res, next) {
  let status = error.status || error.code || 500;

  // 상태 코드가 없거나 유효하지 않은 경우 500으로 설정
  if (!status || status < 100 || status >= 600) {
    status = 500;
  }

  // UnauthorizedError에 대한 메시지 간소화
  if (error.name === 'UnauthorizedError') {
    status = 401;
    error.message = '인증 토큰이 없거나 유효하지 않습니다.';
  }

  // Prisma 에러 처리
  if (error instanceof Prisma.PrismaClientValidationError) {
    status = 400; // Bad Request
    error.message = error.message || "유효하지 않은 데이터가 제공되었습니다.";
  } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    status = 404; // Not Found
    error.message = "해당 ID를 찾을 수 없습니다."; // Prisma에서 제공된 에러 메시지를 간소화
  }

  if (process.env.NODE_ENV === 'development') {
    //console.warn('WARN', status, error);                                    // 개발 환경에서는 전체 오류 출력
    const stackLine = error.stack ? error.stack.split('\n')[1].trim() : '';   // 개발 환경에서는 스택 트레이스의 첫 줄만 출력
    console.warn(`WARN ${status} - ${error.name}: ${error.message}\n  at ${stackLine}`);
  } else {
    console.warn(`WARN ${status} - ${error.message}`);                        // 운영 환경에서는 간단한 메시지만 출력
  }

  return res.status(status).json({
    path: req.path,
    method: req.method,
    message: error.message || 'Internal Server Error',
    data: error.data || undefined,
    date: new Date(),
  });
}
