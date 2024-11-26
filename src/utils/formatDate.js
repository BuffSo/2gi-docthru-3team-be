import { BadRequestError } from "../errors/index.js";

export default function formatDate(date) {
    const format = /^\d{4}\/\d{2}\/\d{2}$/;

    if (!format.test(date)) {
        throw new BadRequestError("날짜 형식이 올바르지 않습니다.");
    }

    const [year, month, day] = date.split("/").map(Number);
    
    const parsedDate = new Date(year, month - 1, day);
    if (parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day) {
        throw new BadRequestError("유효하지 않은 날짜입니다.");
    }
    
    return parsedDate;
}