import { Col, Row, Typography } from "antd";
import TableComponent from "~/shared/components/Table";
import Tool from "~/shared/components/Tool";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
import { tickets } from "../TicketManagement";
import routesConfig from "~/config/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { handlerPackages } from "~/shared/helpers";
import { useAppDispatch } from "~/app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { getAllPackageCheck } from "~/features/ticket/ticketSlice";
function TicketCheck() {
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const list = useSelector((state: RootState) => state.ticket.data);
  const navigate = useNavigate();
  const location = useLocation();
  const [initialString, setInitialString] = useState("");

  const loadData = () => {
    dispatch(getAllPackageCheck(tickets[0].name));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);
    const packageTicket = params.package;
    setInitialString(packageTicket?.toString() || "");
  }, [location.search]);

  useEffect(() => {
    if (initialString !== "") {
      dispatch(getAllPackageCheck(handlerPackages(initialString, tickets)));
    }
  }, [initialString, dispatch]);

  const handlerFilterPackage = (packageType: string) => {
    const routeTicketManage = routesConfig.ticketCheck;
    navigate(`${routeTicketManage}/?package=${packageType}`);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Col span={24}>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Title style={HomeStyles.titleHead}>Đối soát vé</Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={24} style={{ display: "flex", gap: "25px" }}>
            {tickets.map((ticket, index) => {
              return (
                <Title
                  style={HomeStyles.titlePackage}
                  key={index}
                  onClick={() => handlerFilterPackage(ticket.filterTicket)}
                >
                  {ticket.name}
                </Title>
              );
            })}
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Tool ticketCheck />
        </Row>
        <Row>
          <Col span={24}>
            <TableComponent
              packageName={initialString}
              ticketType="ticketCheck"
              data={list}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default TicketCheck;
