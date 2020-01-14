//创建action对象的工厂函数

import { reqLogin } from "../api";
import { setItem } from "../utils/storage";
import { SAVE_USER, GET_LINE, REMOVE_USER } from "./action-types";
import axios from "axios";

const saveUser = user => ({ type: SAVE_USER, data: user });

const getLine = string => ({ type: GET_LINE, data: string });

export const removeUser = () => ({ type: REMOVE_USER });

export function saveUserAsync(username, password) {
  return dispatch => {
    return reqLogin(username, password).then(response => {
      setItem("user", response);
      dispatch(saveUser(response));
      return response;
    });
  };
}

export function getLineAsync() {
  return dispatch => {
    axios({
      method: "GET",
      url: "https://v1.jinrishici.com/all.json"
    })
      .then(response => {
        const string = response.data.content;
        dispatch(getLine(string));
      })
      .catch(err => {
        console.dir(err);
      });
  };
}
