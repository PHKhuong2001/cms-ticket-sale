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
} from "antd";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  EditFilled,
} from "@ant-design/icons";

import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import { getPackageById } from "~/features/ticket/ticketSlice";

function TicketPackageModal({ idPackage }: { idPackage: string }) {
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  const handleChangeSelectStatus = (value: string) => {
    console.log(`selected ${value}`);
  };
  const showModal = () => {
    dispatch(getPackageById(idPackage));
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        onClick={showModal}
        style={{
          cursor: "pointer",
          border: "none",
          color: "#ff993c",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <EditFilled /> cập nhật
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
            Cập nhật thông tin gói vé
          </Title>
        }
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={630}
        footer={false}
      >
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
                  style={{ fontSize: 14, margin: "0 0 5px 0", fontWeight: 500 }}
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
                  />
                </Col>
                <Col span={10}>
                  <DatePicker
                    format="hh:mm:ss"
                    suffixIcon={<FieldTimeOutlined />}
                    showTime={false}
                    style={{ width: "90%" }}
                    placeholder="hh:mm:ss"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Title
                  style={{ fontSize: 14, margin: "0 0 5px 0", fontWeight: 500 }}
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
                  />
                </Col>
                <Col span={10}>
                  <DatePicker
                    format="hh:mm:ss"
                    suffixIcon={<FieldTimeOutlined />}
                    showTime={false}
                    style={{ width: "90%" }}
                    placeholder="hh:mm:ss"
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
              style={{ gap: "20px", display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() => setVisible(false)}
                className="buttonFilterReset"
              >
                Huỷ
              </Button>
              <Button onClick={() => setVisible(false)} className="buttonReset">
                Lưu
              </Button>
            </Col>
          </Row>
        </Col>
        {/* Nội dung của Modal */}
      </Modal>
    </div>
  );
}

export default TicketPackageModal;
