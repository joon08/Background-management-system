import Home from "../components/home";
import Category from "../containers/category";
import Product from "../containers/product";
import ProductForm from "../containers/product/product-form";
import ProductDetail from "../containers/product/product-detail";

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
  }
];

export default routes;
