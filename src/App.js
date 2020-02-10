import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";

import Login from "$cont/login";
import BasicLayout from "$comp/basic-layout";
import { en, zhCN } from "./locales";
import zh_CN from "antd/es/locale/zh_CN";
import en_us from "antd/es/locale/en_US";
import routes from "./config/routes";

@connect(state => ({ language: state.language, user: state.user.user }), null)
class App extends Component {
  render() {
    const { language, user } = this.props;
    const isEN = language === "en";

    /*
      登录过 user就有
      没有登录过 user为undefined
    */
    let filterRoutes = [];

    if (user) {
      const roleMenus = user.menus;
      // 对route进行权限管理
      filterRoutes = routes.filter(route => {
        return roleMenus.find(menu => {
          return (
            route.path === menu ||
            (menu === "/product" && route.path.startsWith(menu))
          );
        });
      });
    }
    return (
      <ConfigProvider locale={isEN ? en_us : zh_CN}>
        <IntlProvider locale={language} messages={isEN ? en : zhCN}>
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <BasicLayout>
                <Switch>
                  {filterRoutes.map(route => (
                    <Route {...route} key={route.path} />
                  ))}
                </Switch>
              </BasicLayout>
            </Switch>
          </Router>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

export default App;
