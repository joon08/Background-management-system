//根据prevState和action对象生成newState 函数
import { combineReducers } from "redux";
import {
  SAVE_USER,
  GET_LINE,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_TABLE_DATA
} from "./action-types";
import { getItem } from "../utils/storage";

const initUser = getItem("user") || {};
function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data;
    case REMOVE_USER:
      return {};
    default:
      return prevState;
  }
}

function string(prevState = "正在加载今日诗词....", action) {
  switch (action.type) {
    case GET_LINE:
      return action.data;
    default:
      return prevState;
  }
}

const initLang = navigator.language || navigator.languages[0] || "zh-CN";
function language(prevState = initLang, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return prevState;
  }
}

function tableData(prevState = [], action) {
  switch (action.type) {
    case GET_TABLE_DATA:
      return action.data;
    default:
      return prevState;
  }
}

export default combineReducers({
  user,
  string,
  language,
  tableData
});
