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

@connect(state => ({ language: state.language }), null)
class App extends Component {
  render() {
    const language = this.props.language;
    const isEN = language === "en";

    return (
      <ConfigProvider locale={isEN ? en_us : zh_CN}>
        <IntlProvider locale={language} messages={isEN ? en : zhCN}>
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <BasicLayout>
                <Switch>
                  {routes.map(route => (
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
