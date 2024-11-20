export default function formatDate(date) {
    const format = /^\d{4}\/\d{2}\/\d{2}$/;

    if (!format.test(date)) {
        throw new Error("Invalid date format");
    }

    const [year, month, day] = date.split("/").map(Number);
    
    const parsedDate = new Date(year, month - 1, day);
    if (parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day) {
        throw new Error("Invalid date");
    }
    
    return parsedDate;
}