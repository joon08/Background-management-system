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
import { reqAddProduct, reqUpdateProduct } from "$api";

import "./index.less";

const { Item } = Form,
  { Option } = Select;

@connect(state => ({ tableData: state.tableData }), { getTableDataAsync })
@Form.create()
class ProductForm extends Component {
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
        let promise = null;

        if (this.props.location.pathname.indexOf("/update/") === -1) {
          promise = reqAddProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML()
          });
        } else {
          promise = reqUpdateProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML(),
            productId: this.props.match.params.id
          });
        }

        promise
          .then(res => {
            message.success(
              `${
                this.props.location.pathname.indexOf("/update/") === -1
                  ? "添加"
                  : "修改"
              }商品成功`
            );
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

  handleCategoryId = categoryId => {
    if (!categoryId) return "0";

    const {
      tableData,
      location: { state }
    } = this.props;
    const category = tableData.find(item => item._id === state.categoryId);

    if (category) return category.name;

    return "0";
  };

  render() {
    const {
      form: { getFieldDecorator },
      tableData,
      location: { state, pathname }
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
            {`${pathname.indexOf("/update/") === -1 ? "添加" : "修改"}商品`}
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
              ],
              initialValue:
                pathname.indexOf("/update/") === -1 ? "" : state.name
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述：">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ],
              initialValue:
                pathname.indexOf("/update/") === -1 ? "" : state.desc
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类：">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ],
              initialValue:
                pathname.indexOf("/update/") === -1
                  ? ""
                  : this.handleCategoryId(state.categoryId)
            })(
              <Select>
                <Option value="0">暂无分类</Option>
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
              ],
              initialValue:
                pathname.indexOf("/update/") === -1 ? "" : state.price
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
              ],
              initialValue:
                pathname.indexOf("/update/") === -1
                  ? ""
                  : BraftEditor.createEditorState(state.detail)
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

export default ProductForm;
