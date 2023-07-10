import { Col, Row, Image, Typography } from "antd";
import { ComponentState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import images from "../../../shared/assets/images";
import routesConfig from "../../../config/routes";
import SideBarCssStyle from "../../../shared/styles/AntdStyles/SideBarStyles";
import listSideBar from "./SideBarList";

export interface SideBarList {
  icon: ComponentState;
  iconClick: ComponentState;
  name: string;
  path: string;
  setting?: SideBarSetting[];
}

interface SideBarSetting {
  name: string;
  path: string;
}

const SideBar: React.FunctionComponent = () => {
  const { Paragraph } = Typography;
  const {
    linkButton,
    linkTextButton,
    linkButtonClick,
    linkTextButtonClick,
    linkSettingButton,
    linkSettingButtonClick,
  } = SideBarCssStyle;
  const location = useLocation();
  const currentPath = location.pathname;
  const settinghandlerPath = () => {
    if (currentPath === routesConfig.ticketPackage) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Col>
        <Row style={{ marginBottom: "45px" }}>
          <Col>
            <Image src={images.logo} width={110} height={58} />
          </Col>
        </Row>
        {listSideBar.map((item, index) => {
          return (
            <Row style={{}} key={index}>
              <Col span={24}>
                {item.setting ? (
                  <button
                    style={settinghandlerPath() ? linkButtonClick : linkButton}
                    className="buttonReset"
                  >
                    {settinghandlerPath() ? item.iconClick : item.icon}
                    <Paragraph
                      style={
                        settinghandlerPath()
                          ? linkTextButtonClick
                          : linkTextButton
                      }
                    >
                      {item.name}
                    </Paragraph>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    style={
                      currentPath === item.path ? linkButtonClick : linkButton
                    }
                  >
                    {currentPath === item.path ? item.iconClick : item.icon}
                    <Paragraph
                      style={
                        currentPath === item.path
                          ? linkTextButtonClick
                          : linkTextButton
                      }
                    >
                      {item.name}
                    </Paragraph>
                  </Link>
                )}
                {item.setting?.map((setting, index) => {
                  return (
                    <Link to={setting.path} key={index}>
                      <Paragraph
                        style={
                          currentPath === setting.path
                            ? linkSettingButtonClick
                            : linkSettingButton
                        }
                      >
                        {setting.name}
                      </Paragraph>
                    </Link>
                  );
                })}
              </Col>
            </Row>
          );
        })}
      </Col>
    </>
  );
};

export default SideBar;
