import React, { Component } from "react";
import { Button, Icon, Layout, Modal } from "antd";
import screenfull from "screenfull";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import dayjs from "dayjs";

import { removeItem } from "$utils/storage";
import { removeUser, changeLanguage } from "$redux/actions";
import "./index.less";
import menus from "$conf/menus";

const { Header } = Layout;
const { confirm } = Modal;

@injectIntl
@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
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
      const time = dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss");
      this.setState({
        time
      });
    }, 1000);
  }

  componentWillUnmount() {
    screenfull.off("change", this.handleScreenFull);
    clearInterval(this.timer);
  }
  //全屏
  handleScreenFull = () => {
    this.setState({
      isScreenFull: !this.state.isScreenFull
    });
  };
  screenFull = () => {
    screenfull.toggle();
  };
  //登出
  logout = () => {
    confirm({
      title: this.props.intl.formatMessage({ id: "logout" }),
      onOk: () => {
        //清除登录信息，跳转到login界面
        removeItem("user"); //删除localStorage中的信息
        this.props.removeUser(); //删除redux中的信息
        this.props.history.replace("/login");
      },
      onCancel() {}
    });
  };
  //国际化
  language = () => {
    const lang = this.props.language === "en" ? "zh-CN" : "en";
    this.props.changeLanguage(lang);
  };
  //根据路径显示标题
  findTitle(menus, pathname) {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.children) {
        for (let j = 0; j < menu.children.length; j++) {
          const cMenu = menu.children[j];
          if (cMenu.path === pathname) {
            return cMenu.title;
          }
        }
      } else {
        if (menu.path === pathname) {
          return menu.title;
        }
      }
    }
  }

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
          <Button
            size="small"
            className="layout-head-lang"
            onClick={this.language}
          >
            {this.props.language === "en" ? "中文" : "English"}
          </Button>
          <span style={{ userSelect: "none" }}>
            hello, {this.props.username}
          </span>
          <Button size="small" type="link" onClick={this.logout}>
            退 出
          </Button>
        </div>
        <div className="layout-head-bottom">
          <span>
            <FormattedMessage
              id={this.findTitle(menus, this.props.location.pathname)}
            />
          </span>
          <span>{this.state.time}</span>
        </div>
      </Header>
    );
  }
}

export default HeaderMain;
