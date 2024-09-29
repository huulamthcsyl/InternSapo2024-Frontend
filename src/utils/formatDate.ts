export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Lấy ngày, tháng và năm
    const day = String(date.getDate()).padStart(2, '0'); // Ngày
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Năm

    // Trả về định dạng "dd-mm-yyyy"
    return `${day}-${month}-${year}`;
};
