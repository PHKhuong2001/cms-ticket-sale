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
import { CopyRightIcon } from "~/shared/components/Icons";
interface DefaultLayoutProps {
  children: any;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout className="layout-default" style={layoutStyle}>
      <Sider style={siderStyle} className="layout-default-sidebar">
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SideBar></SideBar>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            <span style={{ fontSize: "0.7rem", color: "#1E0D03" }}>
              Copyright
            </span>
            <CopyRightIcon width="0.7rem" height="0.7rem" />
            <span style={{ fontSize: "0.7rem", color: "#1E0D03" }}>
              2020 Alta Software
            </span>
          </div>
        </div>
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
