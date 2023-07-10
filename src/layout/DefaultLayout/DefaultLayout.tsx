import React from "react";
import { Layout } from "antd";
import {
  contentStyle,
  headerStyle,
  layoutStyle,
  siderStyle,
} from "../../shared/styles/AntdStyles/DefaultLayoutStyles";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/Header";
interface DefaultLayoutProps {
  children: any;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout className="layout-default" style={layoutStyle}>
      <Sider style={siderStyle} className="layout-default-sidebar">
        <SideBar></SideBar>
      </Sider>
      <Layout style={{ background: "transparent" }}>
        <Header style={headerStyle}>
          <HeaderComponent></HeaderComponent>
        </Header>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
