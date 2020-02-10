import React, { Component } from "react";
import { Icon, Button, Drawer, Divider } from "antd";
import { SketchPicker } from "react-color";

import { setItem, getItem } from "$utils/storage";
import "./index.less";

const initColor = getItem("color") || "#1DA57A";

export default class ThemePicker extends Component {
  state = {
    visible: false,
    currentColor: initColor,
    prevColor: initColor
  };

  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    const { prevColor } = this.state;
    this.setState({
      visible: false,
      currentColor: prevColor
    });
  };

  componentDidMount() {
    this.themeStyle = document.createElement("style");
    this.setColorStyle();
    document.querySelector("head").appendChild(this.themeStyle);
  }

  setColorStyle = () => {
    const { currentColor } = this.state;

    this.themeStyle.innerHTML = `
      .ant-menu .ant-menu-item.ant-menu-item-selected, .theme-picker-btn{
        background-color: ${currentColor};
      }
      .header-main .header-main-top {
        border-bottom: 1px solid ${currentColor};
      }
      .ant-btn.ant-btn-link {
        color: ${currentColor};
      }
      .ant-btn.ant-btn-primary {
        background-color: ${currentColor};
        border-color: ${currentColor};
      }
    `;
  };

  //选择颜色时触发
  handleChangeComplete = ({ hex }) => {
    this.setState({
      currentColor: hex
    });
  };

  //点击确认时改变主题色
  changeTheme = () => {
    const { currentColor } = this.state;
    this.setColorStyle();
    setItem("color", currentColor);
    this.setState({
      visible: false,
      prevColor: currentColor
    });
  };
  render() {
    const { visible, currentColor } = this.state;
    return (
      <div>
        <div className="theme-picker-btn" onClick={this.onOpen}>
          <Icon type="setting" />
        </div>

        <Drawer
          title="主题颜色选择"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          <SketchPicker
            color={currentColor} // 颜色选择器当前选中的颜色
            onChangeComplete={this.handleChangeComplete} // 当你选择其他颜色时触发的事件
          />
          <Divider />
          <Button onClick={this.onClose}>取消</Button> &nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.changeTheme}>
            确认
          </Button>
        </Drawer>
      </div>
    );
  }
}
