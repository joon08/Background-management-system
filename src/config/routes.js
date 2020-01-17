import Home from "../components/home";
import Category from "../containers/category";
import Product from "../containers/product"

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
  }
];

export default routes;
