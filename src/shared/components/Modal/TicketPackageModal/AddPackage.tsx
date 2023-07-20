import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Typography,
  Select,
  Form,
  TimePicker,
} from "antd";
import { FieldTimeOutlined, CalendarOutlined } from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import { addPackageFireBase } from "~/features/ticket/ticketSlice";

export interface FormCreate {
  package: string;
  comboPrice: string;
  comboTickets: string;
  dateApplicable: string;
  dateExpiration: string;
  fare: string;
  status: string;
}

const formAdd = {
  package: "",
  comboPrice: "",
  comboTickets: "",
  dateApplicable: "",
  dateExpiration: "",
  fare: "",
  status: "",
};

function TicketPackageModal() {
  const { Title } = Typography;
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormCreate>(formAdd);
  const [dateAndTimeApplicable, setdateAndTimeApplicable] = useState({
    date: "",
    time: "",
  });
  const [dateAndTimeExpiration, setdateAndTimeExpiration] = useState({
    date: "",
    time: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, package: event.target.value }));
  };

  const handlerTicketFareChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, fare: event.target.value }));
  };
  const handleChangeSelectStatus = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlerSubmitFormAdd = () => {
    dispatch(
      addPackageFireBase({
        ...formData,
        dateApplicable: `${dateAndTimeApplicable.date} ${dateAndTimeApplicable.time}`,
        dateExpiration: `${dateAndTimeExpiration.date} ${dateAndTimeExpiration.time}`,
      })
    );
  };

  return (
    <div>
      <Button onClick={showModal} className="buttonReset">
        Thêm gói vé
      </Button>
      <Modal
        title={
          <Title
            style={{
              fontSize: 24,
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            Thêm gói vé
          </Title>
        }
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={630}
        footer={false}
      >
        <Form onFinish={handlerSubmitFormAdd}>
          {/* Nội dung của Modal */}
          <Col>
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Title
                  style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Tên gói vé*
                </Title>
                <Input
                  placeholder="Nhập tên gói vé"
                  onChange={handleInputChange}
                  style={{ width: "70%" }}
                />
              </Col>
            </Row>

            {/* Thêm ngày  */}
            <Row style={{ marginBottom: 15 }}>
              <Col span={12}>
                <Row>
                  <Title
                    style={{
                      fontSize: 14,
                      margin: "0 0 5px 0",
                      fontWeight: 500,
                    }}
                  >
                    Ngày áp dụng
                  </Title>
                </Row>
                <Row>
                  <Col span={10}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      suffixIcon={<CalendarOutlined />}
                      style={{ width: "90%" }}
                      placeholder="dd/mm/yyyy"
                      onChange={(date: any, dateString: any) =>
                        setdateAndTimeApplicable((prev) => ({
                          ...prev,
                          date: dateString,
                        }))
                      }
                    />
                  </Col>
                  <Col span={10}>
                    <TimePicker
                      format="hh:mm:ss"
                      suffixIcon={<FieldTimeOutlined />}
                      style={{ width: "90%" }}
                      placeholder="hh:mm:ss"
                      onChange={(date: any, dateString: any) =>
                        setdateAndTimeApplicable((prev) => ({
                          ...prev,
                          time: dateString,
                        }))
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Title
                    style={{
                      fontSize: 14,
                      margin: "0 0 5px 0",
                      fontWeight: 500,
                    }}
                  >
                    Ngày hết hạn
                  </Title>
                </Row>
                <Row>
                  <Col span={10}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      suffixIcon={<CalendarOutlined />}
                      style={{ width: "90%" }}
                      placeholder="dd/mm/yyyy"
                      onChange={(date: any, dateString: any) =>
                        setdateAndTimeExpiration((prev) => ({
                          ...prev,
                          date: dateString,
                        }))
                      }
                    />
                  </Col>
                  <Col span={10}>
                    <TimePicker
                      format="hh:mm:ss"
                      suffixIcon={<FieldTimeOutlined />}
                      style={{ width: "90%" }}
                      placeholder="hh:mm:ss"
                      onChange={(date: any, dateString: any) =>
                        setdateAndTimeExpiration((prev) => ({
                          ...prev,
                          time: dateString,
                        }))
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Thêm giá vé  */}
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Title
                  style={{ fontSize: 14, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Giá vé áp dụng
                </Title>
                <Row style={{ marginBottom: "6px" }}>
                  <Col span={24}>
                    <Checkbox
                      style={{ lineHeight: "32px", borderColor: "#27AEF9" }}
                    >
                      Vé lẻ (vnđ/vé) với giá
                    </Checkbox>
                    <Input
                      placeholder=""
                      onChange={handlerTicketFareChange}
                      style={{
                        width: "20%",
                        border: "none",
                        background: "#F1F4F8",
                        marginRight: "7px",
                      }}
                    />
                    <span>/ vé</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Checkbox
                      style={{ lineHeight: "32px", borderColor: "#27AEF9" }}
                    >
                      Combo vé với giá
                    </Checkbox>
                    <Input
                      placeholder=""
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev) => ({
                          ...prev,
                          comboPrice: e.target.value,
                        }))
                      }
                      style={{
                        width: "20%",
                        border: "none",
                        background: "#F1F4F8",
                        marginRight: "7px",
                      }}
                    />
                    <span
                      style={{
                        marginRight: "7px",
                      }}
                    >
                      /
                    </span>
                    <Input
                      placeholder=""
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev) => ({
                          ...prev,
                          comboTickets: e.target.value,
                        }))
                      }
                      style={{
                        width: "10%",
                        border: "none",
                        background: "#F1F4F8",
                        marginRight: "7px",
                      }}
                    />
                    <span>vé</span>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Thêm tình trạng  */}
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Title
                  style={{ fontSize: 16, margin: "0 0 5px 0", fontWeight: 500 }}
                >
                  Tình trạng
                </Title>
                <Select
                  defaultValue="Đang áp dụng"
                  style={{ width: 150 }}
                  onChange={handleChangeSelectStatus}
                  options={[
                    { value: "Đang áp dụng", label: "Đang áp dụng" },
                    { value: "Tắt", label: "Tắt" },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  fontSize: 13,
                  color: "#1E0D03",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                <span style={{ color: "#FD5959", marginRight: 3 }}>*</span>
                là thông tin bắt buộc
              </Col>
            </Row>
            {/* Hành động nút bấm  */}
            <Row>
              <Col
                span={24}
                style={{
                  gap: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => setVisible(false)}
                  className="buttonFilterReset"
                >
                  Huỷ
                </Button>
                <Button
                  className="buttonReset"
                  htmlType="submit"
                  onClick={() => {
                    setVisible(false);
                    setFormData(formAdd);
                  }}
                >
                  Lưu
                </Button>
              </Col>
            </Row>
          </Col>
          {/* Nội dung của Modal */}
        </Form>
      </Modal>
    </div>
  );
}

export default TicketPackageModal;
