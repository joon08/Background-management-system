import React, { Component } from "react";
import { Card, Button, Radio, Table, message, Modal } from "antd";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { roleListAsync, addRoleAsync, updateRoleAsync } from "$redux/actions";
import AddRoleForm from "./add-role-form";
import UpdateRoleForm from "./update-role-form";

const { Group } = Radio;

@connect(
  state => ({ roles: state.roles, authName: state.user.user.username }),
  {
    roleListAsync,
    addRoleAsync,
    updateRoleAsync
  }
)
class Role extends Component {
  state = {
    isLoading: false,
    isShowModal: false,
    isShowUpdateModal: false,
    role: {}
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

  switchModal = (key, value) => {
    return () => {
      if (!value) {
        const flag = this.addRoleForm ? this.addRoleForm : this.updateRoleForm;
        flag.props.form.resetFields();
      }
      this.setState({
        [key]: value
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

  updateRole = () => {
    const { validateFields, resetFields } = this.updateRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        const menus = values.tree;
        const authName = this.props.authName;
        const roleId = this.state.role._id;
        this.props
          .updateRoleAsync({ menus: JSON.stringify(menus), roleId, authName })
          .then(res => {
            message.success("更新角色权限成功~");
            this.setState({
              isShowUpdateModal: false,
              // 更新Role组件自己的状态role，从而才能通过props的方式 更新 UpdateRoleForm接受的props
              role: res
            });
            resetFields();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  radioChange = e => {
    const id = e.target.value;
    // 查找到角色数据
    const role = this.props.roles.find(role => role._id === id);
    this.setState({
      role
    });
  };

  render() {
    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchModal("isShowModal", true)}
            >
              创建角色
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              type="primary"
              disabled={!this.state.role._id}
              onClick={this.switchModal("isShowUpdateModal", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <Group style={{ width: "100%" }} onChange={this.radioChange}>
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
          onCancel={this.switchModal("isShowModal", false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={this.state.isShowUpdateModal}
          onOk={this.updateRole}
          onCancel={this.switchModal("isShowUpdateModal", false)}
        >
          <UpdateRoleForm
            wrappedComponentRef={form => (this.updateRoleForm = form)}
            role={this.state.role}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
