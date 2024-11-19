export default function asyncHandler(handler) {
  return async function (req, res, next) {    
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);      // error를 erroHandler에서 전달하여 처리하도록 함
    }
  };
}
///////////////////////////////////////////////////////////////////////
// ✨ 아래 주석된 코드는 확인하시고 삭제하시면 되겠습니다.
//
// import { Prisma } from "@prisma/client";
//
// export default function asyncHandler(handler) {
//   return async function (req, res) {
//     try {
//       await handler(req, res);
//     } catch (e) {
//       if (
//         e.name === "StructError" ||
//         e instanceof Prisma.PrismaClientValidationError
//       ) {
//         res.status(400).send({ message: e.message });
//       } else if (
//         e instanceof Prisma.PrismaClientKnownRequestError &&
//         e.code === "P2025"
//       ) {
//         res.status(404).send({ message: "Cannot find given id." });
//       } else {
//         res.status(500).send({ message: e.message });
//       }
//     }
//   };
// }
///////////////////////////////////////////////////////////////////////
