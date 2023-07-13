import { Button, Col } from "antd";
import InputComponent from "../Input";
import { TicketManageModal, TicketPackageModal } from "../Modal";
import { headerStyles } from "~/shared/styles/AntdStyles/HeaderStyles";
interface ToolType {
  ticketManage?: boolean;
  ticketCheck?: boolean;
  ticketPackage?: boolean;
}
function Tool({ ticketManage, ticketCheck, ticketPackage }: ToolType) {
  const onSearch = (value: string) => console.log(value);
  const renderTool = () => {
    if (ticketCheck) {
      return <Button className="buttonReset">Chốt đối soát</Button>;
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
          <TicketPackageModal></TicketPackageModal>
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
        <TicketManageModal></TicketManageModal>
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
