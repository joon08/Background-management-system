import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

// 引入echarts中国城市数据
import cityData from "echarts/map/json/china";
// 引入自己抓取中国城市数据疫情情况(写死了，将来可以在服务器实时更新数据，再去服务器请求数据)
import data from "./county.json";

export default class Map extends Component {
  getOption = () => {
    return {
      title: {
        text: "疫情地图"
      },
      tooltip: {
        trigger: "item",
        formatter: item => {
          return `省份：${item.name}<br />确诊：${item.value}`;
        }
      },
      visualMap: {
        type: "piecewise",
        pieces: [
          { min: 10000, color: "#5c0011" }, // 不指定 max，表示 max 为无限大（Infinity）。
          { min: 1000, max: 10000, color: "#a8071a" },
          { min: 500, max: 999, color: "#f5222d" },
          { min: 100, max: 499, color: "#ff7875" },
          { min: 10, max: 99, color: "#ffccc7" },
          { min: 1, max: 9, color: "#fff1f0" }
        ]
      },
      series: [
        {
          name: "疫情数据",
          type: "map",
          mapType: "china", // 自定义扩展图表类型
          // roam: "scale",
          // scaleLimit: {
          //   min: 0.5,
          //   max: 5
          // },
          label: {
            show: true
          },
          data: data.map(item => {
            return {
              name: item.provinceShortName,
              value: item.confirmedCount
            };
          })
        }
      ]
    };
  };

  render() {
    echarts.registerMap("china", cityData);

    return (
      <ReactEcharts
        option={this.getOption()}
        style={{ width: "100%", height: 500 }}
        onEvents={{
          click: e => {
            console.log(e.data);
          }
        }}
      />
    );
  }
}
