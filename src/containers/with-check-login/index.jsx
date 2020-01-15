/**
 * 用来检测登录的高阶组件
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function withCheckLogin(WrappedComponent) {
  @connect(data => ({ user: data.user }), null)
  class CheckLogin extends Component {
    static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    render() {
      const {
        user: { token },
        location: { pathname }
      } = this.props;

      if (token) {
        if (pathname === "/login") {
          return <Redirect to="/" />;
        }
      } else {
        if (pathname !== "/login") {
          return <Redirect to="/login" />;
        }
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return CheckLogin;
}
