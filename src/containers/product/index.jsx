import React, { Component } from "react";
import { Table, Card, Button, Icon, Input, Select, message } from "antd";
import { Link } from "react-router-dom";

import { reqGetProductList } from "$api";

export default class Product extends Component {
  state = {
    total: 0,
    list: []
  };

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
      dataIndex: "status",
      render: () => {
        return (
          <div>
            <Button type="primary">下架</Button>
            <span>已上架</span>
          </div>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "xxx",
      render: () => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
          </div>
        );
      }
    }
  ];

  getProductList = (pageNum, pageSize) => {
    reqGetProductList(pageNum, pageSize)
      .then(response => {
        this.setState({
          total: response.total,
          list: response.list
        });
        message.success("获取商品列表数据成功");
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
            <Select defaultValue="1">
              <Select.Option value="1">根据商品名称</Select.Option>
              <Select.Option value="2">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: 200, margin: "0 10px" }}
            />
            <Button type="primary">搜索</Button>
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
