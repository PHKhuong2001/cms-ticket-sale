import { Col, Row, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import routesConfig from "~/config/routes";
import TableComponent from "~/shared/components/Table";
import Tool from "~/shared/components/Tool";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { getAllPackageManage } from "~/features/ticket/ticketSlice";
import { handlerPackages } from "~/shared/helpers";
export interface Packages {
  name: string;
  filterTicket: string;
}
export const tickets: Packages[] = [
  {
    name: "Gói gia đình",
    filterTicket: "family",
  },
  {
    name: "Gói sự kiện",
    filterTicket: "event",
  },
];
function TicketManagement() {
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const list = useSelector((state: RootState) => state.ticket.data);
  const navigate = useNavigate();
  const location = useLocation();
  const [initialString, setInitialString] = useState("");

  const loadData = () => {
    dispatch(getAllPackageManage(tickets[0].name));
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
      dispatch(getAllPackageManage(handlerPackages(initialString, tickets)));
    }
  }, [initialString, dispatch]);

  const handlerFilterPackage = (packageType: string) => {
    const routeTicketManage = routesConfig.ticketManagement;
    navigate(`${routeTicketManage}/?package=${packageType}`);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Col span={24}>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Title style={HomeStyles.titleHead}>Danh sách vé</Title>
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
          <Tool />
        </Row>
        <Row>
          <Col span={24}>
            <TableComponent
              ticketType="ticketManage"
              data={list}
              packageName={initialString}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default TicketManagement;
