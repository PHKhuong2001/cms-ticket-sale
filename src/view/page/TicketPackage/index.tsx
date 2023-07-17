import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "~/app/hooks";
import { RootState } from "~/app/store";
import { getAllPackage } from "~/features/ticket/ticketSlice";
import TableComponent from "~/shared/components/Table";
import Tool from "~/shared/components/Tool";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
function TicketPackage() {
  const { Title } = Typography;
  const dataPackageList = useSelector(
    (state: RootState) => state.ticket.dataPackage
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPackage()).then((e) => {
      console.log(e);
    });
  }, [dispatch]);

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
            <TableComponent ticketType="packageList" data={dataPackageList} />
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default TicketPackage;
