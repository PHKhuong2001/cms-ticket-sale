import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Modal,
  Radio,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { FilterIcon } from "../../Icons";
import { CalendarOutlined } from "@ant-design/icons";

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
function TicketPackageModal() {
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);

  const showModal = () => {
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
      <Button icon={<FilterIcon width="13" height="13" />} onClick={showModal}>
        Lọc vé
      </Button>
      <Modal
        title={
          <Title
            style={{ fontSize: 24, margin: "0 0 10px 0", textAlign: "center" }}
          >
            Thêm gói vé
          </Title>
        }
        open={visible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={530}
        footer={false}
      >
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
                  <Radio value={radio.name} style={{ fontSize: 13 }}>
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
                    value={checkbox.name}
                    style={{ lineHeight: "32px" }}
                  >
                    {checkbox.name}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button onClick={() => setVisible(false)}>Lọc</Button>
            </Col>
          </Row>
        </Col>
      </Modal>
    </div>
  );
}

export default TicketPackageModal;
