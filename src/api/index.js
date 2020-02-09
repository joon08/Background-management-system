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

export const reqGetProductList = (pageNum, pageSize) => {
  return axiosInstance({
    method: "GET",
    url: "/product/list",
    params: {
      pageNum,
      pageSize
    }
  });
};

export const reqAddProduct = ({ categoryId, name, price, desc, detail }) => {
  return axiosInstance({
    method: "POST",
    url: "/product/add",
    data: { categoryId, name, price, desc, detail }
  });
};

export const reqUpdateProduct = ({
  categoryId,
  name,
  price,
  desc,
  detail,
  productId
}) => {
  return axiosInstance({
    method: "POST",
    url: "/product/update",
    data: { categoryId, name, price, desc, detail, productId }
  });
};

export const reqSearchProductList = ({
  searchType,
  searchValue,
  pageNum,
  pageSize
}) => {
  return axiosInstance({
    method: "GET",
    url: "/product/search",
    params: {
      [searchType]: searchValue,
      pageNum,
      pageSize
    }
  });
};

export const reqUpdateProductStatus = (productId, status) => {
  return axiosInstance({
    method: "POST",
    url: "/product/update/status",
    data: {
      productId,
      status
    }
  });
};

export const reqRoleList = () => {
  return axiosInstance({
    method: "GET",
    url: "/role/get"
  });
};

export const reqAddRole = name => {
  return axiosInstance({
    method: "POST",
    url: "/role/add",
    data: {
      name
    }
  });
};

// 请求获取单个商品数据
export const reqGetProduct = productId => {
  return axiosInstance({
    method: 'GET',
    url: '/product/get',
    params: {
      productId
    }
  });
};

// 请求设置角色权限数据
export const reqUpdateRole = ({ roleId, authName, menus }) => {
  return axiosInstance({
    url: '/role/update',
    method: 'POST',
    data: {
      roleId,
      authName,
      menus
    }
  });
};

// 请求获取用户数据
export const reqGetUser = () => {
  return axiosInstance({
    url: '/user/get',
    method: 'GET'
  });
};

// 请求创建用户数据
export const reqAddUser = ({ username, password, phone, email, roleId }) => {
  return axiosInstance({
    url: '/user/add',
    method: 'POST',
    data: { username, password, phone, email, roleId }
  });
};
