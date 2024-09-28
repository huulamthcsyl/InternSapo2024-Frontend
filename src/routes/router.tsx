import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import OrderListPage from "../pages/order/order-list/OrderListPage";
import CreateOrderPage from "../pages/order/create-order/CreateOrderPage";
import DetailOrderPage from "../pages/order/detail-order/DetailOrderPage";
import User from "../pages/admin/User";
import CreateUser from "../pages/admin/CreateUser";
import DetailUser from "../pages/admin/DetailUser";
import UpdateUser from "../pages/admin/UpdateUser";
import ChangePassword from "../pages/admin/ChangePassword";
import UserProfile from "../pages/admin/UserProfile";
import CustomerPage from "../pages/customer/CustomerPage";
import NewCustomerPage from "../pages/customer/NewCustomerPage";
import CustomerDetailPage from "../pages/customer/CustomerDetailPage";
import OverviewPage from "../pages/overview/OverviewPage";
import ProductPage from "../pages/product/ProductPage";
import VariantPage from "../pages/product/variants/VariantPage";
import BrandPage from "../pages/product/brands/BrandPage";
import ProductDetail from "../pages/product/product-detail/ProductDetail";
import CategoryPage from "../pages/product/categories/CategoryPage";
import ProductEdit from "../pages/product/product-detail/product-edit/ProductEdit";
import AddVariant from "../pages/product/product-detail/add-variant/AddVariant";
import AddProduct from "../pages/product/add-product/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "customers",
        element: <CustomerPage />
      },
      {
        path: "customers/create",
        element: <NewCustomerPage />
      },
      {
        path: "customers/:customerId",  // Dynamic route với customerID
        element: <CustomerDetailPage />  // Component sẽ render chi tiết khách hàng
      },
      {
        path: "/overview",
        element: <OverviewPage />
      },
      {
        path: "order",
        element: <OrderListPage />
      },
      {
        path: "order/create",
        element: <CreateOrderPage />
      },
      {
        path: "order/:id",
        element: <DetailOrderPage />
      },
      {
        path: "account/:id",
        element: <UserProfile />,
      },
      {
        path: "account/change-password/:id",
        element: <ChangePassword />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/categories",
        element: <CategoryPage />,
      },
      {
        path: "/products/brands",
        element: <BrandPage />,
      },
      {
        path: "/products/variants",
        element: <VariantPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/:id/edit",
        element: <ProductEdit />,
      },
      {
        path: "/products/create",
        element: <AddProduct />,
      },
      {
        path: "/products/:id/variants/create",
        element: <AddVariant />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "user",
        element: <User />,
      },
      {
        path: "user/create",
        element: <CreateUser />,
      },
      {
        path: "user/:id",
        element: (
          <DetailUser/>
        ),
      },
      {
        path: "user/update/:id",
        element: <UpdateUser />,
      },
    ]
  }
    
]);

