import React, { Component } from "react";
import { Card, Icon, Descriptions } from "antd";
import { connect } from "react-redux";

import { getTableDataAsync } from "$redux/actions";

const { Item } = Descriptions;

@connect(state => ({ tableData: state.tableData }), { getTableDataAsync })
class ProductDetail extends Component {
  state = {
    detail: ""
  };

  componentDidMount() {
    if (!this.props.tableData.length) {
      this.props.getTableDataAsync();
    }
  }
  goBack = () => {
    this.props.history.push("/product");
  };
  handleCategory = categoryId => {
    const {
      tableData,
      location: { state }
    } = this.props;

    const category = tableData.find(item => item._id === state.categoryId);

    if (category) return category.name;

    return "暂无分类";
  };
  render() {
    const { state } = this.props.location;
    return (
      <Card
        title={
          <div>
            <Icon
              type="arrow-left"
              className="arrow-left"
              onClick={this.goBack}
            />
            商品详情
          </div>
        }
      >
        <Descriptions bordered>
          <Item label="商品名称">{state.name}</Item>
          <Item label="商品描述">{state.desc}</Item>
          <Item label="商品价格">￥{state.price}</Item>
          <Item label="商品分类">{this.handleCategory(state.categoryId)}</Item>
          <Item label="商品状态" span={2}>
            {state.status === 1 ? "下架" : "上架"}
          </Item>
          <Item label="商品详情" span={3}>
            <div dangerouslySetInnerHTML={{ __html: state.detail }}></div>
          </Item>
        </Descriptions>
      </Card>
    );
  }
}

export default ProductDetail;
