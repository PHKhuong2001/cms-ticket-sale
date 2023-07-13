import { DataManageMent } from "~/shared/interfaces";

export const dataManage: DataManageMent[] = [];

export const columnsOffManageFamily = [
  { title: "STT", dataIndex: "stt", key: "stt" },
  { title: "Booking code", dataIndex: "bookingCode", key: "bookingCode" },
  { title: "Số vé", dataIndex: "soVe", key: "soVe" },
  { title: "Tình trạng sử dụng", dataIndex: "trangThai", key: "trangThai" },
  { title: "Ngày sử dụng", dataIndex: "ngaySuDung", key: "ngaySuDung" },
  { title: "Ngày xuất vé", dataIndex: "ngayXuatVe", key: "ngayXuatVe" },
  { title: "Cổng check-in", dataIndex: "congCheckIn", key: "congCheckIn" },
  { title: "", dataIndex: "actions", key: "actions" },
];

export const columnsOffManageEvent = [
  { title: "STT", dataIndex: "stt", key: "stt" },
  { title: "Booking code", dataIndex: "bookingCode", key: "bookingCode" },
  { title: "Số vé", dataIndex: "soVe", key: "soVe" },
  { title: "Tên sự kiện", dataIndex: "tenSuKien", key: "tenSuKien" },
  { title: "Tình trạng sử dụng", dataIndex: "trangThai", key: "trangThai" },
  { title: "Ngày sử dụng", dataIndex: "ngaySuDung", key: "ngaySuDung" },
  { title: "Ngày xuất vé", dataIndex: "ngayXuatVe", key: "ngayXuatVe" },
  { title: "Cổng check-in", dataIndex: "congCheckIn", key: "congCheckIn" },
  { title: "", dataIndex: "actions", key: "actions" },
];
