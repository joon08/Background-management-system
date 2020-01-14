import React, { Component } from "react";
import { Button, Icon, Layout, Modal } from "antd";
import screenfull from "screenfull";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { removeItem } from "$utils/storage";
import { removeUser } from "$redux/actions";

import "./index.less";

const { Header } = Layout;
const { confirm } = Modal;

@connect(state => ({ username: state.user.user && state.user.user.username }), {
  removeUser
})
@withRouter
class HeaderMain extends Component {
  state = {
    isScreenFull: false,
    time: ""
  };

  timer = null;
  componentDidMount() {
    screenfull.on("change", this.handleScreenFull);

    this.timer = setInterval(() => {
      const date = new Date();
      const time =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        "/" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        " " +
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":" +
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      this.setState({
        time
      });
    }, 1000);
  }

  componentWillUnmount() {
    screenfull.off("change", this.handleScreenFull);
    clearInterval(this.timer);
  }

  handleScreenFull = () => {
    this.setState({
      isScreenFull: !this.state.isScreenFull
    });
  };

  screenFull = () => {
    screenfull.toggle();
  };

  logout = () => {
    confirm({
      title: "您确定要退出登录吗?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        //清除登录信息，跳转到login界面
        removeItem("user"); //删除localStorage中的信息
        this.props.removeUser(); //删除redux中的信息
        this.props.history.replace("/login");
      },
      onCancel() {}
    });
  };

  render() {
    const { isScreenFull } = this.state;
    return (
      <Header
        style={{ background: "#fff", padding: 0 }}
        className="layout-head"
      >
        <div className="layout-head-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenFull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button size="small" className="layout-head-lang">
            English
          </Button>
          <span>hello, {this.props.username}</span>
          <Button size="small" type="link" onClick={this.logout}>
            退 出
          </Button>
        </div>
        <div className="layout-head-bottom">
          <span>商品管理</span>
          <span>{this.state.time}</span>
        </div>
      </Header>
    );
  }
}

export default HeaderMain;
