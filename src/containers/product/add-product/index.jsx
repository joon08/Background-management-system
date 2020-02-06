import React, { Component } from "react";
import {
  Card,
  Form,
  Select,
  Input,
  Button,
  Icon,
  InputNumber,
  message
} from "antd";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { connect } from "react-redux";

import { getTableDataAsync } from "$redux/actions";
import { reqAddProduct } from "$api";

import "./index.less";

const { Item } = Form,
  { Option } = Select;

@connect(state => ({ tableData: state.tableData }), { getTableDataAsync })
@Form.create()
class AddProduct extends Component {
  // state = {
  //   editorState: BraftEditor.createEditorState(null)
  // };

  componentDidMount() {
    if (!this.props.tableData.length) {
      this.props.getTableDataAsync();
    }
  }

  submit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const { name, desc, categoryId, price, detail } = values;
        reqAddProduct({
          name,
          desc,
          categoryId,
          price,
          detail: detail.toHTML()
        })
          .then(res => {
            console.log(res);
            message.success("添加商品成功");
            // 跳转到商品页面，查看
            this.goBack();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  goBack = () => {
    this.props.history.push("/product");
  };

  render() {
    const {
      form: { getFieldDecorator },
      tableData
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    return (
      <Card
        title={
          <div>
            <Icon
              type="arrow-left"
              className="arrow-left"
              onClick={this.goBack}
            />
            添加商品
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称：">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称"
                }
              ]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述：">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ]
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类：">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ]
            })(
              <Select>
                {tableData.map(item => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Item>
          <Item label="商品价格：">
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "请输入商品价格"
                }
              ]
            })(
              <InputNumber
                className="product-price"
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\￥\s?|(,*)/g, "")}
              />
            )}
          </Item>
          <Item label="商品详情：" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("detail", {
              rules: [
                {
                  required: true,
                  message: "请输入商品详情"
                }
              ]
            })(
              <BraftEditor
                className="braft-editor"
                placeholder="请输入商品详情"
              />
            )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default AddProduct;
