import { Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import TableComponent from "~/shared/components/Table";
import Tool from "~/shared/components/Tool";
import HomeStyles from "~/shared/styles/AntdStyles/HomeStyles";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { usePathUrl } from "~/config";

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
  const list = useSelector((state: RootState) => state.ticket.data);
  const navigate = useNavigate();
  const pathUrl = usePathUrl();

  const handlerFilterPackage = (packageType: string) => {
    navigate(`/ticket-management/${packageType}`);
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
          <Col span={24} style={{ display: "flex", gap: "50px" }}>
            {tickets.map((ticket, index) => (
              <Title
                style={{ ...HomeStyles.titlePackage }}
                key={index}
                onClick={() => handlerFilterPackage(ticket.filterTicket)}
                className={pathUrl === ticket.filterTicket ? `active` : ""}
              >
                {ticket.name}
              </Title>
            ))}
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Tool ticketManage />
        </Row>
        <Row>
          <Col span={24}>
            <TableComponent
              packageName={pathUrl}
              ticketType="ticketManage"
              data={list}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default TicketManagement;
