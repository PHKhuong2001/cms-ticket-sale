import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Packages } from "~/view/page/TicketManagement";

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
