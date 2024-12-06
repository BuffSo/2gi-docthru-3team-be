export default function asyncHandler(handler) {
  return async function (req, res, next) {    
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);      // error를 erroHandler에서 전달하여 처리하도록 함
    }
  };
}