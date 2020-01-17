/**
 * 封装请求功能函数
 */

import axiosInstance from "./request";

export const reqLogin = (username, password) => {
  return axiosInstance({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  });
};

export const reqGetTableData = () => {
  return axiosInstance({
    method: "GET",
    url: "/category/get"
  });
};

export const reqAddCategory = categoryName => {
  return axiosInstance({
    method: "POST",
    url: "/category/add",
    data: {
      categoryName
    }
  });
};

export const reqUpdateCategory = (categoryId, categoryName) => {
  return axiosInstance({
    method: "POST",
    url: "/category/update",
    data: {
      categoryId,
      categoryName
    }
  });
};

export const reqDeleteCategory = categoryId => {
  return axiosInstance({
    method: "POST",
    url: "/category/delete",
    data: {
      categoryId
    }
  });
};
