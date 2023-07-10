import { Col, Row } from "antd";
import InputComponent from "../../../shared/components/Input";
import { headerStyles } from "../../../shared/styles/AntdStyles/HeaderStyles";

function HeaderComponent() {
  const onSearch = (value: string) => console.log(value);

  return (
    <div>
      <Row>
        <Col span={12}>
          <InputComponent
            search
            inputProps={{
              onSearch,
              style: headerStyles.inputStyle,
              placeholder: "Search",
            }}
            className="searchInput"
          />
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}

export default HeaderComponent;
