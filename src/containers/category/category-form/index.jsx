import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

@Form.create()
class CategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="品类名称">
          {getFieldDecorator("categoryName", {
            rules: [
              {
                required: true,
                message: "请输入分类名"
              }
            ],
            initialValue: this.props.categoryName
          })(<Input placeholder="请输入分类名" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default CategoryForm;
