import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import { FormattedMessage } from "react-intl";

import menus from "$conf/menus";

const { TreeNode } = Tree;

@Form.create()
class UpdateRoleForm extends Component {
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={<FormattedMessage id={item.title} />}
            key={item.path}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.path}
          {...item}
          title={<FormattedMessage id={item.title} />}
        />
      );
    });

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form wrapperCol={{ span: 15 }} labelCol={{ span: 5 }}>
        <Form.Item label="角色名称">
          {getFieldDecorator("name", {
            initialValue: this.props.role.name
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("tree", {
            trigger: "onCheck",
            valuePropName: "checkedKeys",
            initialValue: this.props.role.menus
          })(
            <Tree checkable defaultExpandAll>
              <TreeNode key="0" title="平台权限">
                {this.renderTreeNodes(menus)}
              </TreeNode>
            </Tree>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateRoleForm;
