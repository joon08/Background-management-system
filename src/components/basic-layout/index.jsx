import React, { Component } from "react";
import { Layout } from "antd";
import { FormattedMessage } from "react-intl";

import withCheckLogin from "$cont/with-check-login";
import LeftNav from "./left-nav";
import HeaderMain from "./header-main";
import ThemePicker from "./theme-picker";

import logo from "$assets/imgs/favicon.ico";
import "./index.less";

const { Content, Footer, Sider } = Layout;

@withCheckLogin
class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    const isDisplay = !this.state.isDisplay;

    this.setState({ collapsed, isDisplay });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            <h1 style={{ display: this.state.isDisplay ? "block" : "none" }}>
              <FormattedMessage id="title" />
            </h1>
          </div>
          <LeftNav />
        </Sider>
        <Layout>
          <HeaderMain />
          <Content style={{ margin: "30px 16px 0 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2020 Created by Ant UED
          </Footer>
        </Layout>
        <ThemePicker />
      </Layout>
    );
  }
}

export default BasicLayout;
