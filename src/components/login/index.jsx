import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

import "./index.less";
import logo from "./logo.png";

@Form.create()
class Login extends Component {
  validator = (rule, value, callback) => {
    const hint = rule.field === "username" ? "用户名" : "密码";
    const reg = /^\w+$/;
    if (!value) {
      callback(`${hint}不能为空`);
    } else if (value.length < 4 || value.length > 12) {
      callback(`${hint}长度需为4-12位`);
    } else if (!reg.test(value)) {
      callback(`${hint}只能包含数字、字母、下划线`);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
              {getFieldDecorator("username", {
                rules: [
                  /* { required: true, message: "用户名不能为空" },
                  { min: 4, message: "用户名必须4-12位" },
                  { max: 12, message: "用户名必须4-12位" },
                  {
                    pattern: /^\w+$/,
                    message: "用户名只能包含数字、字母、下划线"
                  } */
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.validator }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
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

export default Login;
