import { Button, Col, DatePicker, Radio, Row, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";

export const radioList = [
  { name: "Tất cả" },
  { name: "Đã đối soát" },
  { name: "Chưa đối soát" },
];
function FilterTicketCheck() {
  const { Title } = Typography;
  const [checkedRadio, setCheckedRadio] = useState<string[]>([]);
  return (
    <Col>
      <Row style={{ marginBottom: "24px" }}>
        <Col span={24}>
          <Title style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700" }}>
            Lọc vé
          </Title>
        </Col>
      </Row>
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
                key={index}
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
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px", textAlign: "center" }}>
        <Col span={24}>
          <Button className="buttonFilterReset" style={{ width: "100px" }}>
            Lọc
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default FilterTicketCheck;
