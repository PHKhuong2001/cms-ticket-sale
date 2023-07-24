import { Col, Radio, Row, Typography } from "antd";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import PieChartComponent from "~/shared/components/Chart/PieChart";
import LineChartComponent from "~/shared/components/Chart/LineChart";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import {
  getAllTicketsByPackageNameEvent,
  getAllTicketsByPackageNameAndMonth,
  getAllTotalFareChart,
  getWeeklyData,
} from "~/features/ticket/ticketSlice";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { formatDateToMonthYear, getCurrentDate } from "~/shared/helpers";

const radioList = [{ name: "Theo ngày" }, { name: "Theo tuần" }];

function Home() {
  const { Title, Text } = Typography;
  const dispatch = useAppDispatch();
  const currentDate = getCurrentDate();
  const dataPackageFamily = useSelector(
    (state: RootState) => state.ticket.dataPackageFamily
  );

  const dataPackageEvent = useSelector(
    (state: RootState) => state.ticket.dataPackageEvenet
  );
  const dataChart = useSelector((state: RootState) => state.ticket.dataChart);
  const [getTotalWithDaysOrWeek, setTotalWithDaysOrWeek] = useState(
    radioList[0].name
  );

  useEffect(() => {
    dispatch(
      getAllTicketsByPackageNameAndMonth({
        packageName: "Gói gia đình",
        dateString: currentDate,
      })
    );
    dispatch(
      getAllTicketsByPackageNameEvent({
        packageName: "Gói sự kiện",
        dateString: currentDate,
      })
    );
    if (getTotalWithDaysOrWeek === radioList[1].name) {
      dispatch(getAllTotalFareChart({ dateString: currentDate }));
    } else if (getTotalWithDaysOrWeek === radioList[0].name) {
      dispatch(getWeeklyData({ dateString: currentDate }));
    }
  }, [dispatch, currentDate, getTotalWithDaysOrWeek]);

  const handlerChangeDate = (date: any, dateSring: string) => {
    dispatch(
      getAllTicketsByPackageNameAndMonth({
        packageName: "Gói gia đình",
        dateString: dateSring,
      })
    );
    dispatch(
      getAllTicketsByPackageNameEvent({
        packageName: "Gói sự kiện",
        dateString: dateSring,
      })
    );
  };

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
              placeholder={formatDateToMonthYear(currentDate)}
              showToday={false}
              format="DD/MM/YYYY"
              // onChange={}
              renderExtraFooter={() => (
                <div
                  style={{
                    padding: "8px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {radioList.map((radio, index) => {
                    return (
                      <Radio
                        style={{ fontSize: 13 }}
                        key={index}
                        checked={getTotalWithDaysOrWeek.includes(radio.name)}
                        onClick={() => setTotalWithDaysOrWeek(radio.name)}
                      >
                        {radio.name}
                      </Radio>
                    );
                  })}
                </div>
              )}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <LineChartComponent dataChart={dataChart} />
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
        <Row>
          <Col span={6} style={{ padding: 15, textAlign: "center" }}>
            <DatePicker
              placeholder={formatDateToMonthYear(currentDate)}
              suffixIcon={<CalendarOutlined />}
              showToday={false}
              format="DD/MM/YYYY"
              onChange={handlerChangeDate}
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
            <PieChartComponent dataStatus={dataPackageFamily} />
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
            <PieChartComponent dataStatus={dataPackageEvent} />
          </Col>
          <Col span={6} style={{ marginTop: "40px" }}>
            <div className="wrapper-use">
              <Title style={{ margin: "0", fontSize: "0.8rem" }}>
                Vé đã sử dụng
              </Title>
            </div>
            <div className="wrapper-unuse">
              <Title style={{ margin: "0", fontSize: "0.8rem" }}>
                Vé chưa sử dụng
              </Title>
            </div>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default Home;
