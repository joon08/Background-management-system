//根据prevState和action对象生成newState 函数
import { combineReducers } from "redux";
import {
  SAVE_USER,
  GET_LINE,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_TABLE_DATA,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ROLE_LIST,
  ADD_ROLE
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
    case ADD_CATEGORY:
      return [...prevState, action.data];
    case UPDATE_CATEGORY:
      return prevState.map(category => {
        if (category._id === action.data._id) {
          return action.data;
        }
        return category;
      });
    case DELETE_CATEGORY:
      return prevState.filter(category => category._id !== action.data);
    default:
      return prevState;
  }
}

const initRoles = [];
function roles(prevState = initRoles, action) {
  switch (action.type) {
    case ROLE_LIST:
      return action.data;
    case ADD_ROLE:
      return [...prevState, action.data];
    default:
      return prevState;
  }
}

export default combineReducers({
  user,
  string,
  language,
  tableData,
  roles
});
