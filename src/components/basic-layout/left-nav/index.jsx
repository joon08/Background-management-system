import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import menus from "$conf/menus";

const { SubMenu } = Menu;

@connect(state => ({ roleMenus: state.user.user.menus }))
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
                <span>
                  <FormattedMessage id={menu.title} />
                </span>
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
          <span>
            <FormattedMessage id={menu.title} />
          </span>
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
    let { pathname } = this.props.location;
    pathname = pathname.indexOf("/product") === -1 ? pathname : "/product";
    const openKey = this.findOpenKeys(pathname, menus);

    // 获取用户的权限
    const roleMenus = this.props.roleMenus;
    const filterMenus = menus.reduce((p, c) => {
      // 对c --> 遍历出来的菜单，进行深度克隆 --> 后面操作就不会影响原数据
      c = JSON.parse(JSON.stringify(c));
      // 如果一级菜单不属于权限列表，并也没有二级菜单
      // if (roleMenus.indexOf(c.path) === -1 && !c.children) {
      if (roleMenus.indexOf(c.path) !== -1 || c.children) {
        // 二级菜单
        if (c.children) {
          // 如果子菜单path在roleMenus中，返回值true, 就不会过滤
          // 如果子菜单path不在roleMenus中，返回值false, 就会被过滤掉
          const children = c.children.filter(item => {
            return roleMenus.indexOf(item.path) !== -1;
          });
          // 如果子菜单过滤后是空数组，是会显示菜单的，但是实际上是不需要的
          // 不需要整个菜单都不需要添加
          if (!children.length) {
            return p;
          }
          // c.children直接赋值 --> 修改了原数组 --> menus数组
          // jiaming测试时，将menus数组的 /product 删掉了
          // peihua测试时，此时menus数组中就没有 /product。
          // 解决：不能修改原数组
          c.children = children;
        }
        // 统一添加
        p.push(c);
      }

      return p;
    }, []);

    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKey]}
        mode="inline"
      >
        {this.createMenus(filterMenus)}
      </Menu>
    );
  }
}

export default LeftNav;
