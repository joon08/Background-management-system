import React, { Component } from "react";
import { Table, Card, Button, Icon, Modal, message } from "antd";
import { connect } from "react-redux";

import AddCategory from "./add-category";
import { getTableDataAsync, addCategoryAsync } from "$redux/actions";

@connect(state => ({ tableData: state.tableData }), {
  getTableDataAsync,
  addCategoryAsync
})
class Category extends Component {
  state = {
    isShow: false
  };

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

  addCategory = () => {
    const { validateFields, resetFields } = this.form.props.form;
    validateFields((err, values) => {
      if (!err) {
        const { categoryName } = values;
        this.props
          .addCategoryAsync(categoryName)
          .then(() => {
            message.success("添加品类成功");
            resetFields();
            this.hiddenModal();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  hiddenModal = () => {
    this.setState({
      isShow: false
    });
  };

  showModal = () => {
    this.setState({
      isShow: true
    });
  };

  render() {
    const { tableData } = this.props;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showModal}>
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

        <Modal
          title="添加分类"
          visible={this.state.isShow}
          onOk={this.addCategory}
          onCancel={this.hiddenModal}
          width="350px"
        >
          <AddCategory wrappedComponentRef={form => (this.form = form)} />
        </Modal>
      </Card>
    );
  }
}

export default Category;
