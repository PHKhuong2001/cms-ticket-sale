import { Avatar, Col, Row } from "antd";
import { BellIcon, MailIcon } from "~/shared/components/Icons";
import InputComponent from "~/shared/components/Input";
import { headerStyles } from "~/shared/styles/AntdStyles/HeaderStyles";
import images from "~/shared/assets/images";
function HeaderComponent() {
  const onSearch = (value: string) => console.log(value);

  return (
    <div>
      <Row>
        <Col span={12}>
          <InputComponent
            inputProps={{
              onSearch,
              style: headerStyles.inputStyle,
              placeholder: "Search",
            }}
            className="searchInput"
          />
        </Col>
        <Col span={12}>
          <Row
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <MailIcon width="1.5rem" height="1.5rem" />
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <BellIcon width="1.5rem" height="1.5rem" />
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar size="large" src={images.avatar} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderComponent;
