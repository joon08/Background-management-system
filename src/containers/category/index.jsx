import React, { Component } from "react";
import { Table, Card, Button, Icon, Modal, message } from "antd";
import { connect } from "react-redux";

import CategoryForm from "./category-form";
import {
  getTableDataAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
} from "$redux/actions";

@connect(state => ({ tableData: state.tableData }), {
  getTableDataAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
})
class Category extends Component {
  state = {
    isShow: false,
    category: {}
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
      render: category => {
        return (
          <div>
            <Button type="link" onClick={this.showModal(category)}>
              修改分类
            </Button>
            <Button type="link" onClick={this.deleteCategory(category)}>
              删除分类
            </Button>
          </div>
        );
      }
    }
  ];

  setCategory = () => {
    const { validateFields, resetFields } = this.form.props.form;
    validateFields((err, values) => {
      const { name, _id } = this.state.category;

      if (!err) {
        const { categoryName } = values;
        let promise;

        if (name) {
          promise = this.props.updateCategoryAsync(_id, categoryName);
        } else {
          promise = this.props.addCategoryAsync(categoryName);
        }

        promise
          .then(() => {
            message.success(`${name ? "修改" : "添加"}品类成功`);
            resetFields();
            this.hiddenModal();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  deleteCategory = category => {
    return () => {
      Modal.confirm({
        title: `您确定删除 ${category.name} 分类吗?`,
        onOk: () =>  {
          this.props
            .deleteCategoryAsync(category._id)
            .then(() => {
              message.success("删除成功");
              // this.hiddenModal();
            })
            .catch(err => {
              message.error(err);
            });
        },
        onCancel() {}
      });
    };
  };

  hiddenModal = () => {
    this.setState({
      isShow: false
    });
  };

  showModal = (category = {}) => {
    return () => {
      this.setState({
        isShow: true,
        category
      });
    };
  };

  render() {
    const { tableData } = this.props;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showModal()}>
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
          title={this.state.category.name ? "修改分类" : "添加分类"}
          visible={this.state.isShow}
          onOk={this.setCategory}
          onCancel={this.hiddenModal}
          width="350px"
        >
          <CategoryForm
            categoryName={this.state.category.name}
            wrappedComponentRef={form => (this.form = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
