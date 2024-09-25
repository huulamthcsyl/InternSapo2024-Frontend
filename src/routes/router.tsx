import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import OrderListPage from "../pages/order/order-list/OrderListPage";
import CreateOrderPage from "../pages/order/create-order/CreateOrderPage";

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
        path: "order",
        element: <OrderListPage />
      },
      {
        path: "order/create",
        element: <CreateOrderPage />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminPage />
      },
    ]
  }
]);