import React, { Component } from "react";
import { Card, Button, Radio, Table, message, Modal } from "antd";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { roleListAsync, addRoleAsync } from "$redux/actions";
import AddRoleForm from "./add-role-form";

const { Group } = Radio;

@connect(state => ({ roles: state.roles }), { roleListAsync, addRoleAsync })
class Role extends Component {
  state = {
    isLoading: false,
    isShowModal: false
  };

  columns = [
    {
      dataIndex: "_id",
      render: id => {
        return <Radio value={id} />;
      }
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render: time => time && dayjs(time).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.props
      .roleListAsync()
      .then(() => {
        message.success("获取角色列表数据成功");
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  switchModal = isShowModal => {
    return () => {
      if (!isShowModal) {
        this.addRoleForm.props.form.resetFields();
      }
      this.setState({
        isShowModal
      });
    };
  };

  addRole = () => {
    const { validateFields, resetFields } = this.addRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        this.props
          .addRoleAsync(values.name)
          .then(res => {
            message.success("创建角色成功");
            this.setState({
              isShowModal: false
            });
            resetFields();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  render() {
    return (
      <Card
        title={
          <div>
            <Button type="primary" onClick={this.switchModal(true)}>
              创建角色
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="primary" disabled>
              设置角色权限
            </Button>
          </div>
        }
      >
        <Group style={{ width: "100%" }}>
          <Table
            columns={this.columns}
            dataSource={this.props.roles}
            bordered
            rowKey="_id"
            loading={this.state.isLoading}
            pagination={{
              pageSizeOptions: ["4", "6", "8", "10", "15"],
              defaultPageSize: 4,
              showSizeChanger: true,
              showQuickJumper: true,
              total: this.props.roles.length
            }}
          />
        </Group>
        <Modal
          title="创建角色"
          visible={this.state.isShowModal}
          onOk={this.addRole}
          onCancel={this.switchModal(false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
