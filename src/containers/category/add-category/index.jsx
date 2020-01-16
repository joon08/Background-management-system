import React, { Component } from "react";
import { Form, Input } from "antd";

@Form.create()
class AddCategory extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="添加分类">
          {getFieldDecorator("categoryName", {
            rules: [
              {
                required: true,
                message: "请输入分类名"
              }
            ]
          })(<Input placeholder="请输入分类名" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default AddCategory;
