import { Col, Row, Typography } from "antd";
import TableComponent from "~/shared/components/Table";
import Tool from "~/shared/components/Tool";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
function TicketPackage() {
  const { Title } = Typography;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Col span={24}>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Title style={HomeStyles.titleHead}>Danh sách gói vé</Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Tool ticketPackage />
        </Row>
        <Row>
          <Col span={24}>
            {/* <TableComponent ticketType="ticketCheck" data={dataCheck} /> */}
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default TicketPackage;
