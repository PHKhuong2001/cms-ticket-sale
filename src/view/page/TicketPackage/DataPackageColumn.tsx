import { ModalPackage } from "~/shared/components/Modal";
import { changeDate, changeTime } from "~/shared/helpers";

export const columnsOffPackage = [
  { title: "STT", dataIndex: "stt", key: "stt" },
  { title: "Mã gói", dataIndex: "maGoi", key: "maGoi" },
  { title: "Tên gói vé", dataIndex: "tenGoiVe", key: "tenGoiVe" },
  {
    title: "Ngày áp dụng",
    dataIndex: "ngayApDung",
    key: "ngayApDung",
    render: (date: any) => {
      const formatDate = changeDate(date);
      const formatTime = changeTime(date);
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span>{formatDate}</span>
          <span>{formatTime}</span>
        </div>
      );
    },
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "ngayHetHan",
    key: "ngayHetHan",
    render: (date: any) => {
      const formatDate = changeDate(date);
      const formatTime = changeTime(date);
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span>{formatDate}</span>
          <span>{formatTime}</span>
        </div>
      );
    },
  },
  { title: "Giá vé (VNĐ/Vé)", dataIndex: "giaVe", key: "giaVe" },
  { title: "Giá Combo (VNĐ/Combo)", dataIndex: "combo", key: "combo" },
  { title: "Tình trạng", dataIndex: "tinhTrang", key: "tinhTrang" },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (text: any) => {
      return <ModalPackage update id={text} />;
    },
  },
];
export default columnsOffPackage;
