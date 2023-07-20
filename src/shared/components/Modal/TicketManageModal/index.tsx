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
import { FilterIcon } from "../../Icons";
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
function TicketManageModal() {
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

  useEffect(() => {
    if (
      handlerRemovePath(location.pathname) ===
      handlerRemovePath(routesConfig.ticketManagement)
    ) {
      const urlParams = new URLSearchParams(window.location.search);
      const searchValue = urlParams.get("search");
      if (searchValue) {
        dispatch(
          searchPackageManage({
            packageName: handlerPackages(initialString, tickets) || "",
            ticketNumber: searchValue,
          })
        );
      } else {
        dispatch(filterPackage({ ...formFilter }));
      }
    }
  }, [dispatch, formFilter, location.pathname, initialString]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlerCheckRadio = (value: string) => {
    const isRadioChecked = checkedRadio.includes(value);
    let checkRadioList = [];
    setCheckedRadio((prev) => {
      if (isRadioChecked) {
        checkRadioList = checkedRadio.filter((item) => item !== value);
      } else {
        checkRadioList = [...prev, value];
      }
      return checkRadioList.includes("Tất cả") ? [value] : checkRadioList;
    });
  };

  const handlerCheckBox = (value: string) => {
    const isCheckboxChecked = checkedBox.includes(value);
    let checkboxList = [];
    setCheckedBox((prev) => {
      if (isCheckboxChecked) {
        checkboxList = checkedBox.filter((item) => item !== value);
      } else {
        checkboxList = [...prev, value];
      }
      return checkboxList.includes("Tất cả") ? [value] : checkboxList;
    });
  };

  const handleStartDateChange = (date: any, dateString: any) => {
    setFormValue((prev) => ({
      ...prev,
      startDate: dateString,
    }));
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setFormValue((prev) => ({
      ...prev,
      endDate: dateString,
    }));
  };

  const handlerSubmitFilter = () => {
    const queryParams = new URLSearchParams();
    const { startDate, endDate } = formValue;

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
    if (checkedBox && checkedBox.length > 0) {
      queryParams.set("gates", checkedBox.join(","));
    }

    const newPathURL = `/ticket-management/${pathUrl}/?${queryParams.toString()}`;
    navigate(newPathURL);

    return false;
  };

  return (
    <div>
      <Button
        icon={<FilterIcon width="13" height="13" />}
        style={{ borderColor: "#FF993C" }}
        onClick={showModal}
        className="buttonFilterReset"
      >
        Lọc vé
      </Button>
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
        <Form onFinish={handlerSubmitFilter}>
          {/* Nội dung của Modal */}
          <Col>
            <Row style={{ marginBottom: 15 }}>
              <Col span={12}>
                <Title
                  style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 400 }}
                >
                  Từ ngày
                </Title>
                <DatePicker
                  suffixIcon={<CalendarOutlined />}
                  showToday={false}
                  format="DD/MM/YYYY"
                  onChange={handleStartDateChange}
                />
              </Col>
              <Col span={12}>
                <Title
                  style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Đến ngày
                </Title>
                <DatePicker
                  suffixIcon={<CalendarOutlined />}
                  showToday={false}
                  format="DD/MM/YYYY"
                  onChange={handleEndDateChange}
                />
              </Col>
            </Row>

            {/* Lọc theo tình trạng */}
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Title
                  style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Tình trạng sử dụng
                </Title>
              </Col>
              {radioList.map((radio, index) => {
                return (
                  <Col span={6} key={index}>
                    <Radio
                      style={{ fontSize: 13 }}
                      checked={checkedRadio.includes(radio.name)}
                      onClick={() => handlerCheckRadio(radio.name)}
                    >
                      {radio.name}
                    </Radio>
                  </Col>
                );
              })}
            </Row>

            {/* Lọc theo cổng */}
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Title
                  style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Cổng Check - in
                </Title>
              </Col>
              {checkboxList.map((checkbox, index) => {
                return (
                  <Col span={8} key={index}>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      checked={checkedBox.includes(checkbox.name)}
                      onClick={() => handlerCheckBox(checkbox.name)}
                    >
                      {checkbox.name}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <Button
                  onClick={() => {
                    setVisible(false);
                  }}
                  htmlType="submit"
                  className="buttonFilterReset"
                >
                  Lọc
                </Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </Modal>
    </div>
  );
}

export default TicketManageModal;
