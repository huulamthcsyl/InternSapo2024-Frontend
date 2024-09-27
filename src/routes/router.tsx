import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import OrderListPage from "../pages/order/order-list/OrderListPage";
import CreateOrderPage from "../pages/order/create-order/CreateOrderPage";
import DetailOrderPage from "../pages/order/detail-order/DetailOrderPage";
import CustomerPage from "../pages/customer/CustomerPage.tsx";
import NewCustomerPage from "../pages/customer/NewCustomerPage.tsx";
import CustomerDetailPage from "../pages/customer/CustomerDetailPage.tsx";
import OverviewPage from "../pages/overview/OverviewPage.tsx";

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
        element: <OverviewPage/>
      },{
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