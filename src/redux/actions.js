//创建action对象的工厂函数

import {
  reqGetTableData,
  reqAddCategory,
  reqLogin,
  reqUpdateCategory,
  reqDeleteCategory
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
  DELETE_CATEGORY
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
