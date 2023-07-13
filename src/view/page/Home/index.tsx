import { Col, Row, Typography } from "antd";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import PieChartComponent from "~/shared/components/Chart/PieChart";
import LineChartComponent from "~/shared/components/Chart/LineChart";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
function Home() {
  const { Title, Text } = Typography;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Col span={24}>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <Title style={HomeStyles.titleHead}>Thống Kê</Title>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Title style={HomeStyles.title}>Doanh Thu</Title>
          </Col>
          <Col span={12} style={{ textAlign: "end" }}>
            <DatePicker
              suffixIcon={<CalendarOutlined />}
              showToday={false}
              format="YYYY-MM-DD"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <LineChartComponent />
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <Title
              style={{ fontSize: 12, margin: 0, opacity: 0.5, marginBottom: 3 }}
            >
              Tổng doanh thu theo tuần
            </Title>
            <Title style={{ fontSize: 18, margin: 0 }}>
              <Text style={{ fontSize: 18 }}>525.145.000</Text>
              <Text>đồng</Text>
            </Title>
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Col span={6} style={{ padding: 15 }}>
            <DatePicker
              suffixIcon={<CalendarOutlined />}
              showToday={false}
              format="YYYY-MM-DD"
            />
          </Col>
          <Col
            span={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Title
              style={{
                fontSize: 15,
                margin: 0,
                marginBottom: 2,
              }}
            >
              Gói gia đình
            </Title>
            <PieChartComponent></PieChartComponent>
          </Col>
          <Col
            span={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Title
              style={{
                fontSize: 15,
                margin: 0,
                marginBottom: 2,
              }}
            >
              Gói sự kiện
            </Title>
            <PieChartComponent></PieChartComponent>
          </Col>
          <Col span={6}>
            <Title style={HomeStyles.titleHead}>Thống Kê</Title>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default Home;
