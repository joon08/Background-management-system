import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

import "./index.less";
import logo from "./logo.png";

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <header className="login-head">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <form className="login-section-form">
            <h2>用户登录</h2>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="login-btn">
                登录
              </Button>
            </Form.Item>
          </form>
        </section>
      </div>
    );
  }
}
