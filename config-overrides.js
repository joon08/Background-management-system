const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require("customize-cra");

module.exports = override(
  //按需加载
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  //自定义主体色
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  }),
  //es7 @babel/plugin-proposal-decorators
  addDecoratorsLegacy(),
  //路径别名
  addWebpackAlias({})
);
