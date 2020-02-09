//创建action对象的工厂函数

import {
  reqGetTableData,
  reqAddCategory,
  reqLogin,
  reqUpdateCategory,
  reqDeleteCategory,
  reqRoleList,
  reqAddRole,
  reqUpdateRole
} from "$api";
import { setItem } from "../utils/storage";
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
  ADD_ROLE,
  UPDATE_ROLE
} from "./action-types";
import axios from "axios";

export const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  data: language
});
export const removeUser = () => ({ type: REMOVE_USER });

const saveUser = user => ({ type: SAVE_USER, data: user });
export function saveUserAsync(username, password) {
  return dispatch => {
    return reqLogin(username, password).then(response => {
      setItem("user", response);
      dispatch(saveUser(response));
      return response;
    });
  };
}

const getLine = string => ({ type: GET_LINE, data: string });
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

const getTableData = list => ({ type: GET_TABLE_DATA, data: list });
export function getTableDataAsync() {
  return dispatch => {
    return reqGetTableData()
      .then(response => {
        dispatch(getTableData(response));
      })
      .catch(err => {
        console.dir(err);
      });
  };
}

const addCategory = category => ({ type: ADD_CATEGORY, data: category });
export function addCategoryAsync(categoryName) {
  return dispatch => {
    return reqAddCategory(categoryName)
      .then(response => {
        dispatch(addCategory(response));
      })
      .catch(err => {
        console.dir(err);
      });
  };
}

const updateCategory = category => ({ type: UPDATE_CATEGORY, data: category });
export function updateCategoryAsync(categoryId, categoryName) {
  return dispatch => {
    return reqUpdateCategory(categoryId, categoryName)
      .then(response => {
        dispatch(updateCategory(response));
      })
      .catch(err => {
        console.dir(err);
      });
  };
}

const deleteCategory = id => ({ type: DELETE_CATEGORY, data: id });
export function deleteCategoryAsync(categoryId) {
  return dispatch => {
    return reqDeleteCategory(categoryId)
      .then(response => {
        dispatch(deleteCategory(response));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

const roleList = roles => ({ type: ROLE_LIST, data: roles });
export function roleListAsync() {
  return dispatch => {
    return reqRoleList()
      .then(response => {
        dispatch(roleList(response));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

const addRole = role => ({ type: ADD_ROLE, data: role });
export function addRoleAsync(name) {
  return dispatch => {
    return reqAddRole(name)
      .then(response => {
        dispatch(addRole(response));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// 同步action
const updateRole = role => ({ type: UPDATE_ROLE, data: role });
// 异步action
export const updateRoleAsync = name => {
  return dispatch => {
    // 执行异步操作
    return reqUpdateRole(name).then(res => {
      // 请求成功，更新redux状态
      dispatch(updateRole(res));

      // 将请求更新后的role返回出去
      return res;
    });
  };
};

