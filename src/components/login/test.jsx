import React from "react";
import axios from "axios";
import { message } from "antd";

export default function Test(props) {
  const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 15000,
    headers: {}
  });

  let id = "";
  let token = "";

  const handleClick1 = () => {
    axiosInstance({
      method: "POST",
      url: "/login",
      data: {
        username: "admin",
        password: "admin"
      }
    })
      .then(response => {
        console.log(response);
        token = response.data.data.token;
        if (response.data.status === 0) {
          message.success("登录成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClick2 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/add",
      data: {
        categoryName: "手机"
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.status === 0) {
          message.success("添加成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClick3 = () => {};

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}
