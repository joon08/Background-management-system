import React, { Component } from "react";
import { Table, Card, Button, Icon } from "antd";
import { connect } from "react-redux";

import { getTableDataAsync } from "$redux/actions";

@connect(state => ({ tableData: state.tableData }), { getTableDataAsync })
class Category extends Component {
  componentDidMount() {
    this.props.getTableDataAsync();
  }

  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];

  render() {
    const { tableData } = this.props;
    console.log(tableData);

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary">
            <Icon type="plus" />
            分类列表
          </Button>
        }
        style={{ width: "100%" }}
      >
        <Table
          columns={this.columns}
          dataSource={tableData}
          bordered
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 4,
            pageSizeOptions: ["4", "6", "8", "10", "15"],
            showQuickJumper: true
          }}
          rowKey="_id"
        />
      </Card>
    );
  }
}

export default Category;
