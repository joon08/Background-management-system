//根据prevState和action对象生成newState 函数
import { combineReducers } from "redux";

function aaaReducer(prevState = 11, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}

function bbbReducer(prevState = 22, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}

export default combineReducers({
  aaaReducer,
  bbbReducer
});
