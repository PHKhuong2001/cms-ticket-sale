import { DataManageMent } from "~/shared/interfaces";
import { Tag } from "antd";
import TicketChangeDateModal from "~/shared/components/Modal/TicketChangeDateModal";

export const dataManage: DataManageMent[] = [];

export const columnsOffManageFamily = [
  { title: "STT", dataIndex: "stt", key: "stt" },
  { title: "Booking code", dataIndex: "bookingCode", key: "bookingCode" },
  { title: "Số vé", dataIndex: "soVe", key: "soVe" },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "trangThai",
    key: "trangThai",
    render: (text: string) => {
      let colorTag = "";
      if (text) {
        if (text === "Đã sử dụng") {
          colorTag = "geekblue";
        } else if (text === "Chưa sử dụng") {
          colorTag = "green";
        } else if (text === "Hết hạn") {
          colorTag = "volcano";
        }
      }
      return (
        <Tag color={colorTag} className="custom-span">
          {text}
        </Tag>
      );
    },
  },
  { title: "Ngày sử dụng", dataIndex: "ngaySuDung", key: "ngaySuDung" },
  { title: "Ngày xuất vé", dataIndex: "ngayXuatVe", key: "ngayXuatVe" },
  { title: "Cổng check-in", dataIndex: "congCheckIn", key: "congCheckIn" },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    // render: (text: { text: string; ticketNumber: string }) => {
    //   if (text?.text.includes("Chưa sử dụng") && text?.text.includes("event")) {
    //     return <TicketChangeDateModal ticketNumber={text?.ticketNumber} />;
    //   } else {
    //     return <></>;
    //   }
    // },
  },
];

export const columnsOffManageEvent = [
  { title: "STT", dataIndex: "stt", key: "stt" },
  { title: "Booking code", dataIndex: "bookingCode", key: "bookingCode" },
  { title: "Số vé", dataIndex: "soVe", key: "soVe" },
  { title: "Tên sự kiện", dataIndex: "tenSuKien", key: "tenSuKien" },
  { title: "Tình trạng sử dụng", dataIndex: "trangThai", key: "trangThai" },
  { title: "Ngày sử dụng", dataIndex: "ngaySuDung", key: "ngaySuDung" },
  // { title: "Ngày xuất vé", dataIndex: "ngayXuatVe", key: "ngayXuatVe" },
  { title: "Hạn sử dụng", dataIndex: "hanSudung", key: "hanSudung" },
  { title: "Cổng check-in", dataIndex: "congCheckIn", key: "congCheckIn" },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (text: { text: string; ticketNumber: string }) => {
      if (text?.text.includes("Chưa sử dụng") && text?.text.includes("event")) {
        return <TicketChangeDateModal ticketNumber={text.ticketNumber} />;
      } else {
        return <></>;
      }
    },
  },
];
