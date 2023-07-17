import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Modal,
  Radio,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { ActionIcon, FilterIcon } from "../../Icons";
import { CalendarOutlined } from "@ant-design/icons";
import { useAppDispatch } from "~/app/hooks";
import {
  filterPackage,
  searchPackageManage,
} from "~/features/ticket/ticketSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { handlerPackages } from "~/shared/helpers";
import { tickets } from "~/view/page/TicketManagement";
import { handlerRemovePath, usePathUrl } from "~/config";
import usePathUrlParamsManage from "~/shared/hooks/usePathUrlParamsManage";
import routesConfig from "~/config/routes";

const radioList = [
  { name: "Tất cả" },
  { name: "Đã sử dụng" },
  { name: "Chưa sử dụng" },
  { name: "Hết hạn" },
];

const checkboxList = [
  { name: "Tất cả" },
  { name: "Cổng 1" },
  { name: "Cổng 2" },
  { name: "Cổng 3" },
  { name: "Cổng 4" },
  { name: "Cổng 5" },
];

const formSubmit = {
  packageName: "",
  startDate: "",
  endDate: "",
  status: [],
  gates: [],
};
function TicketChangeDateModal() {
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const formFilter = usePathUrlParamsManage();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [checkedBox, setCheckedBox] = useState<string[]>(
    formFilter.gates || []
  );
  const [checkedRadio, setCheckedRadio] = useState<string[]>(
    formFilter.status || []
  );
  const navigate = useNavigate();
  const pathUrl = usePathUrl();
  const [formValue, setFormValue] = useState(formSubmit);
  const [initialString, setInitialString] = useState("");

  useEffect(() => {
    setInitialString(pathUrl?.toString() || "");
  }, [pathUrl]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlerSubmitFilter = () => {
    const queryParams = new URLSearchParams();
    const { startDate, endDate, gates } = formValue;

    // Thêm các query parameters vào URLSearchParams
    queryParams.set(
      "packageName",
      handlerPackages(initialString, tickets) || "Gói gia đình"
    );
    if (startDate) {
      queryParams.set("startDate", startDate);
    }
    if (endDate) {
      queryParams.set("endDate", endDate);
    }
    if (checkedRadio && checkedRadio.length > 0) {
      queryParams.set("status", checkedRadio.join(","));
    }
    if (gates && gates.length > 0) {
      queryParams.set("gates", gates.join(","));
    }

    const newPathURL = `/ticket-management/${pathUrl}/?${queryParams.toString()}`;
    navigate(newPathURL);

    return false;
  };

  return (
    <div>
      <span onClick={showModal}>
        <ActionIcon width="1rem" height="1rem" />
      </span>

      <Modal
        title={
          <Title
            style={{ fontSize: 24, margin: "0 0 10px 0", textAlign: "center" }}
          >
            Lọc vé
          </Title>
        }
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={530}
        footer={false}
      >
        <Form onFinish={handlerSubmitFilter}>Modal Change Date</Form>
      </Modal>
    </div>
  );
}

export default TicketChangeDateModal;
