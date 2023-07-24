import {
  Button,
  Col,
  DatePicker,
  Form,
  Radio,
  Row,
  Typography,
  Select,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import { handlerPackages } from "~/shared/helpers";
import {
  filterPackageCheck,
  searchPackageCheck,
} from "~/features/ticket/ticketSlice";
import { tickets } from "../../TicketManagement";
import { useLocation, useNavigate } from "react-router-dom";
import usePathUrlParamsCheck from "~/shared/hooks/usePathUrlParamsCheck";
import { handlerRemovePath, usePathUrl } from "~/config";
import routesConfig from "~/config/routes";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";

export const radioList = [
  { name: "Tất cả" },
  { name: "Đã đối soát" },
  { name: "Chưa đối soát" },
];

const formSubmit = {
  packageName: "",
  startDate: "",
  endDate: "",
  statusCheck: [],
  gates: [],
};
function FilterTicketCheck() {
  const { Option } = Select;
  const { Title } = Typography;
  const list = useSelector((state: RootState) => state.ticket.data);
  const dispatch = useAppDispatch();
  const pathUrl = usePathUrl();
  const location = useLocation();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(formSubmit);
  const formFilter = usePathUrlParamsCheck();
  const uniqueArray: string[] = [];
  list.forEach((item) => {
    if (!uniqueArray.includes(item.tenSuKien || "")) {
      uniqueArray.push(item.tenSuKien || "");
    }
  });

  const [checkedRadio, setCheckedRadio] = useState<string[]>(
    formFilter.statusCheck || []
  );
  const [initialString, setInitialString] = useState("");
  useEffect(() => {
    setInitialString(pathUrl?.toString() || "");
  }, [pathUrl]);
  useEffect(() => {
    if (
      handlerRemovePath(location.pathname) ===
      handlerRemovePath(routesConfig.ticketCheck)
    ) {
      const urlParams = new URLSearchParams(window.location.search);
      const searchValue = urlParams.get("search");
      if (searchValue) {
        dispatch(
          searchPackageCheck({
            packageName: handlerPackages(initialString, tickets) || "",
            ticketNumber: searchValue,
          })
        );
      } else {
        dispatch(filterPackageCheck({ ...formFilter }));
      }
    }
  }, [dispatch, formFilter, location.pathname, initialString]);

  const handlerCheckBox = (value: string) => {
    const isCheckboxChecked = checkedRadio.includes(value);
    let checkboxList = [];
    setCheckedRadio((prev) => {
      if (isCheckboxChecked) {
        checkboxList = checkedRadio.filter((item) => item !== value);
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

  const handlerSubmitCheckForm = () => {
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
      queryParams.set("statusCheck", checkedRadio.join(","));
    }
    if (gates && gates.length > 0) {
      queryParams.set("gates", gates.join(","));
    }

    const newPathURL = `/ticket-check/${pathUrl}/?${queryParams.toString()}`;
    navigate(newPathURL);

    return false;
  };

  return (
    <Col>
      <Row style={{ marginBottom: "24px" }}>
        <Col span={24}>
          <Title style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700" }}>
            Lọc vé
          </Title>
        </Col>
      </Row>
      <Form onFinish={handlerSubmitCheckForm}>
        {initialString === "event" ? (
          <Row style={{ marginBottom: "24px", marginTop: "20px" }}>
            <Col span={24}>
              <Select style={{ width: "100%" }} placeholder={uniqueArray[0]}>
                {uniqueArray.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row style={{ marginBottom: "20px" }}>
          <Col span={12}>
            <Title style={{ margin: 0, fontSize: "0.9em", fontWeight: "500" }}>
              Tình trạng đối soát
            </Title>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "2px",
            }}
          >
            {radioList.map((radio, index) => {
              return (
                <Radio
                  style={{ fontSize: 13, marginBottom: "4px" }}
                  className="radioResetPadding"
                  checked={checkedRadio.includes(radio.name)}
                  key={index}
                  onClick={() => handlerCheckBox(radio.name)}
                >
                  {radio.name}
                </Radio>
              );
            })}
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={12}>
            <Title style={{ margin: 0, fontSize: "0.9em", fontWeight: "500" }}>
              Loại vé
            </Title>
          </Col>
          <Col span={12}>
            <Title style={{ margin: 0, fontSize: "0.9em", fontWeight: "400" }}>
              Vé cổng
            </Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={12} style={{ margin: "auto 0 auto 0" }}>
            <Title style={{ margin: 0, fontSize: "0.9em", fontWeight: "500" }}>
              Từ ngày
            </Title>
          </Col>
          <Col span={12}>
            <DatePicker
              suffixIcon={<CalendarOutlined />}
              showToday={false}
              format="DD/MM/YYYY"
              onChange={handleStartDateChange}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={12} style={{ margin: "auto 0 auto 0" }}>
            <Title style={{ margin: 0, fontSize: "0.9em", fontWeight: "500" }}>
              Đến ngày
            </Title>
          </Col>
          <Col span={12}>
            <DatePicker
              suffixIcon={<CalendarOutlined />}
              showToday={false}
              format="DD/MM/YYYY"
              onChange={handleEndDateChange}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px", textAlign: "center" }}>
          <Col span={24}>
            <Button
              className="buttonFilterReset"
              htmlType="submit"
              style={{ width: "100px" }}
            >
              Lọc
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

export default FilterTicketCheck;
