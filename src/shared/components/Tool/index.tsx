import { Button, Col } from "antd";
import InputComponent from "../Input";
import { TicketManageModal, ModalPackage } from "../Modal";
import { headerStyles } from "~/shared/styles/AntdStyles/HeaderStyles";
import { useNavigate } from "react-router-dom";
import { usePathUrl } from "~/config";
import ButtonCheck from "./TicketCheck";
interface ToolType {
  ticketManage?: boolean;
  ticketCheck?: boolean;
  ticketPackage?: boolean;
}
function Tool({ ticketManage, ticketCheck, ticketPackage }: ToolType) {
  const navigate = useNavigate();
  const pathUrl = usePathUrl();
  const onSearch = (value: string) => {
    if (ticketManage) {
      navigate(`/ticket-management/${pathUrl}/?search=${value}`);
    } else if (ticketCheck) {
      navigate(`/ticket-check/${pathUrl}/?search=${value}`);
    }
  };

  const renderTool = () => {
    if (ticketCheck) {
      return <ButtonCheck />;
    } else if (ticketPackage) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            height: "100%",
          }}
        >
          <Button
            style={{ borderColor: "#FF993C" }}
            className="buttonFilterReset"
          >
            xuất file(.csv)
          </Button>
          <ModalPackage update={false} />
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          height: "100%",
        }}
      >
        <TicketManageModal />
        <Button
          style={{ borderColor: "#FF993C" }}
          className="buttonFilterReset"
        >
          xuất file(.csv)
        </Button>
      </div>
    );
  };
  return (
    <>
      <Col span={12}>
        <InputComponent
          search
          inputProps={{
            placeholder: "Tìm bằng số vé",
            onSearch,
            style: headerStyles.inputStyle,
          }}
          className="searchInput"
        />
      </Col>
      <Col span={12} style={{ textAlign: "end" }}>
        {renderTool()}
      </Col>
    </>
  );
}

export default Tool;
