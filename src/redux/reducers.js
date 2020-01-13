//根据prevState和action对象生成newState 函数
import { combineReducers } from "redux";
import { SAVE_USER, GET_LINE } from "./action-types";
import { getItem } from "../utils/storage";

const initUser = getItem("user") || {};
function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data;
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

export default combineReducers({
  user,
  string
});
