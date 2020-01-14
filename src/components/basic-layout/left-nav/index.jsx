import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import menus from "$conf/menus";

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(cmenu => {
              return this.createItem(cmenu);
            })}
          </SubMenu>
        );
      } else {
        return this.createItem(menu);
      }
    });
  };

  createItem = menu => {
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  findOpenKeys = (pathname, menus) => {
    const menu = menus.find(
      menu =>
        menu.children && menu.children.find(cMenu => cMenu.path === pathname)
    );
    if (menu) {
      return menu.path;
    }
  };

  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKeys(pathname, menus);
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKey]}
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}

export default LeftNav;
