import axios from "axios";

import store from "$redux/store";
import errCode from "../config/error-code";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {}
});

axiosInstance.interceptors.request.use(config => {
  let token = store.getState().user.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  //如果接口需要 application/x-www-form-urlencoded 方式发送请求，则设置此项
  if (config.method === "post") {
    config.data = Object.keys(config.data)
      .reduce((prev, curr) => {
        prev += `&${curr}=${config.data[curr]}`;
        return prev;
      }, "")
      .slice(1);
    //设置以form方式发送请求数据
    config.headers["content-type"] = "application/x-www-form-urlencoded";
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  err => {
    let errMsg = "";
    if (err.response) {
      errMsg = errCode[err.response.status];
    } else {
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络连接错误";
      } else if (err.message.indexOf("timeout") !== -1) {
        errMsg = "网络连接超时";
      }
    }

    return Promise.reject(errMsg || "未知错误，请联系管理员");
  }
);

export default axiosInstance;
