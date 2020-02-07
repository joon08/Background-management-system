import Home from "../components/home";
import Category from "../containers/category";
import Product from "../containers/product";
import ProductForm from "../containers/product/product-form";
import ProductDetail from "../containers/product/product-detail";
import Role from "../containers/role";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/category",
    exact: true,
    component: Category
  },
  {
    path: "/product",
    exact: true,
    component: Product
  },
  {
    path: "/product/add",
    exact: true,
    component: ProductForm
  },
  {
    path: "/product/update/:id",
    exact: true,
    component: ProductForm
  },
  {
    path: "/product/:id",
    exact: true,
    component: ProductDetail
  },
  {
    path: "/role",
    exact: true,
    component: Role
  }
];

export default routes;
