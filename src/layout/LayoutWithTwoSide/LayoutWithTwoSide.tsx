import React from "react";
import { Layout } from "antd";
import {
  contentStyle,
  headerStyle,
  layoutStyle,
  siderStyle,
  siderStyleContent,
} from "../../shared/styles/AntdStyles/LayoutWithToside";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/Header";
import styles from "../../shared/styles/scss/LayoutWithToSide.module.scss";
interface DefaultLayoutProps {
  children: any;
}

function LayoutWithTwoSide({ children }: DefaultLayoutProps) {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout className="layout-default" style={layoutStyle}>
      <Sider style={siderStyle} className="layout-default-sidebar">
        <SideBar></SideBar>
      </Sider>
      <Layout
        hasSider
        style={{
          background: "transparent",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header style={headerStyle}>
          <HeaderComponent></HeaderComponent>
        </Header>
        <div
          className={styles.wrapperContent}
          style={{ height: "100%", marginTop: "7px" }}
        >
          <Content style={contentStyle} className={styles.contentReset}>
            {children}
          </Content>
          <Sider style={siderStyleContent} className={styles.siderReset}>
            Sider
          </Sider>
        </div>
      </Layout>
    </Layout>
  );
}

export default LayoutWithTwoSide;
