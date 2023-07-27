import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Packages } from "~/view/page/TicketManagement";
import dayjs, { Dayjs } from "dayjs";

export const handlerPackages = (name: string, packages: Packages[]) => {
  const findPackage = packages.find((item) => item.filterTicket === name);
  return findPackage?.name || "";
};

export const changeDate = (time: any) => {
  return moment.unix(time).format("DD/MM/YYYY");
};

export const changeTime = (time: any) => {
  return moment.unix(time).format("hh:mm:ss");
};

export const convertMoneyToVND = (money: string) => {
  const options = { style: "currency", currency: "VND" };
  return parseInt(money).toLocaleString("vi-VN", options).replace("₫", "VNĐ");
};

function generateRandomChars(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
export const generateCustomId = (): string => {
  const date = new Date();
  const formattedDate = moment(date).format("YYYYMMDD");
  const randomChars = generateRandomChars(3).toUpperCase(); // Lấy 3 chữ cái ngẫu nhiên
  return `${randomChars}${formattedDate}`;
};

export const convertToTimestamp = (dateTimeString: string): Timestamp => {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute, second] = timePart.split(":");

  const dateObj = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );

  return Timestamp.fromDate(dateObj);
};

export const formatDateToMonthYear = (dateString: string) => {
  const parts = dateString.split("/");
  // const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const formattedDate = `${monthNames[month - 1]}, ${year}`;
  return formattedDate;
};

export const getCurrentDate = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (tháng 0 là tháng 1)
  const year = today.getFullYear();

  const currentDate = `${day}/${month}/${year}`;
  return currentDate;
};

export const getStartAndEndOfWeekInMonth = (year: any, month: any) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const weeksInMonth = [];
  let currentWeekStart = new Date(firstDayOfMonth);

  while (currentWeekStart <= lastDayOfMonth) {
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

    // Đảm bảo ngày cuối tuần không vượt quá ngày cuối cùng của tháng
    if (currentWeekEnd > lastDayOfMonth) {
      currentWeekEnd.setDate(lastDayOfMonth.getDate());
    }

    weeksInMonth.push({
      start: new Date(currentWeekStart),
      end: new Date(currentWeekEnd),
    });

    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeksInMonth;
};
export const splitDate = (date: String) => {
  const [day, month, year] = date.split("/").map(Number);

  return { day, month, year };
};

export const splitDateFare = (dateString: string) => {
  const dateParts = dateString.split("/");
  return {
    day: parseInt(dateParts[0]),
    month: parseInt(dateParts[1]),
    year: parseInt(dateParts[2]),
  };
};
export const splitMonthAndDay = (date: String) => {
  const [day, month] = date.split("/").map(Number);

  return `${day}/${month}`;
};

export const slitString = (date: String) => {
  const [first, second] = date.split(" ").map(Number);
  return { first, second };
};

export const getWeekDates = (year: number, month: number, day: number) => {
  const currentDate = moment(new Date(year, month - 1, day)); // month trong JavaScript là 0-indexed, nên trừ 1
  const startOfWeekDate = currentDate.startOf("isoWeek"); // Tuần bắt đầu từ thứ 2 (monday)

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeekDate.clone().add(i, "days");
    weekDates.push(currentDate.format("DD/MM/YYYY"));
  }

  return weekDates;
};

export const getDayOfWeek = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number);

  // Tạo một đối tượng Date từ các giá trị trên (lưu ý: tháng trong JavaScript bắt đầu từ 0)
  const dateObject = new Date(year, month - 1, day);

  // Lấy thứ trong tuần (0 = Chủ Nhật, 1 = Thứ 2, ..., 6 = Thứ 7)
  const dayOfWeek = dateObject.getDay();

  // Chuyển đổi thành tên thứ trong tuần (tùy chọn)
  const weekdays = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const dayName = weekdays[dayOfWeek];

  return dayName; // Hoặc trả về dayOfWeek nếu bạn muốn lấy giá trị số thứ tự thay vì tên thứ
};

const isValidDateString = (dateString: string): boolean => {
  return typeof dateString === "string" && dateString.trim().length > 0;
};
export const parseTimeToTimePickerValue = (
  timeString: string
): Dayjs | null => {
  if (!isValidDateString(timeString)) {
    return null;
  }

  const [hours, minutes, seconds] = timeString.split(":");
  let currentDate = dayjs();
  currentDate = currentDate.set("hour", Number(hours));
  currentDate = currentDate.set("minute", Number(minutes));
  currentDate = currentDate.set("second", Number(seconds));
  return currentDate.isValid() ? currentDate : null;
};
