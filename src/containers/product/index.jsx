import React, { Component } from "react";
import { Table, Card, Button, Icon, Input, Select, message } from "antd";
import { Link } from "react-router-dom";

import {
  reqGetProductList,
  reqSearchProductList,
  reqUpdateProductStatus
} from "$api";

export default class Product extends Component {
  state = {
    total: 0,
    list: [],
    searchType: "productName",
    searchValue: "",
    isLoading: false
  };
  currSearchValue = "";
  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "价格",
      dataIndex: "price"
    },
    {
      title: "商品状态",
      // dataIndex: "status",
      render: ({ status, _id }) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={this.updateProductStatus(_id, status)}
            >
              {status === 1 ? "上架" : "下架"}
            </Button>
            <span>{status === 1 ? "已下架" : "已上架"}</span>
          </div>
        );
      }
    },
    {
      title: "操作",
      // dataIndex: "xxx",
      render: categories => {
        return (
          <div>
            <Button type="link" onClick={this.productDetail(categories)}>
              详情
            </Button>
            <Button type="link" onClick={this.updateProduct(categories)}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];

  updateProductStatus = (productId, status) => {
    const newStatus = 3 - status;
    return () => {
      reqUpdateProductStatus(productId, newStatus)
        .then(res => {
          this.setState({
            list: this.state.list.map(item => {
              if (item._id === productId) return { ...item, status: newStatus };
              return item;
            })
          });
          message.success("更新商品状态成功~");
        })
        .catch(err => {
          message.error(err);
        });
    };
  };

  productDetail = categories => {
    return () => {
      this.props.history.push("/product/" + categories._id, categories);
    };
  };

  updateProduct = categories => {
    return () => {
      this.props.history.push("/product/update/" + categories._id, categories);
    };
  };

  handleSelect = e => {
    this.setState({
      searchType: e
    });
  };
  handleInput = e => {
    this.setState({
      searchValue: e.target.value
    });
  };
  search = () => {
    this.setState({
      isLoading: true
    });
    const { searchValue } = this.state;
    this.currSearchValue = searchValue;
    this.setState({});
    this.getProductList(1, 4);
  };

  getProductList = (pageNum, pageSize) => {
    const { searchType } = this.state;
    const currSearchValue = this.currSearchValue;
    let promise = null;
    if (currSearchValue) {
      promise = reqSearchProductList({
        searchType,
        searchValue: currSearchValue,
        pageNum,
        pageSize
      });
    } else {
      promise = reqGetProductList(pageNum, pageSize);
    }
    promise
      .then(response => {
        this.setState({
          total: response.total,
          list: response.list,
          searchValue: currSearchValue,
          isLoading: false
        });
        message.success(`${currSearchValue ? "搜索" : "获取"}商品列表数据成功`);
      })
      .catch(err => {
        message.error(err);
      });
  };

  componentDidMount() {
    this.getProductList(1, 4);
  }

  render() {
    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" onChange={this.handleSelect}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: 200, margin: "0 10px" }}
              onChange={this.handleInput}
              value={this.state.searchValue}
            />
            <Button type="primary" onClick={this.search}>
              搜索
            </Button>
          </div>
        }
        extra={
          <Link to="/product/add">
            <Button type="primary">
              <Icon type="plus" /> 添加商品
            </Button>
          </Link>
        }
      >
        <Table
          columns={this.columns}
          dataSource={this.state.list}
          loading={this.state.isLoading}
          pagination={{
            pageSizeOptions: ["4", "6", "8", "10", "15"],
            defaultPageSize: 4,
            showSizeChanger: true,
            showQuickJumper: true,
            total: this.state.total,
            onChange: this.getProductList, // 页码发生变化触发的函数
            onShowSizeChange: this.getProductList // pageSize 变化的回调
          }}
          rowKey="_id"
          bordered
        />
      </Card>
    );
  }
}
