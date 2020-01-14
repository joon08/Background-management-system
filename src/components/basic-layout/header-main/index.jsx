import React, { Component } from "react";
import { Button, Icon, Layout } from "antd";

import "./index.less";

const { Header } = Layout;

export default class HeaderMain extends Component {
  render() {
    return (
      <Header
        style={{ background: "#fff", padding: 0 }}
        className="layout-head"
      >
        <div className="layout-head-top">
          <Button size="small">
            <Icon type="fullscreen" />
          </Button>
          <Button size="small" className='layout-head-lang'>English</Button>
          <span>hello, admin</span>
          <Button size="small" type="link">
            退 出
          </Button>
        </div>
        <div className="layout-head-bottom">
          <span>商品管理</span>
          <span>2020/01/14 15:58:37</span>
        </div>
      </Header>
    );
  }
}
