import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
<<<<<<< HEAD
import OrderListPage from "../pages/order/order-list/OrderListPage";
import CreateOrderPage from "../pages/order/create-order/CreateOrderPage";
import DetailOrderPage from "../pages/order/detail-order/DetailOrderPage";
=======
import User from "../pages/admin/User";
import CreateUser from "../pages/admin/CreateUser";
import DetailUser from "../pages/admin/DetailUser";
import UpdateUser from "../pages/admin/UpdateUser";
import Account from "../pages/admin/UserProfile";
import ChangePassword from "../pages/admin/ChangePassword";
import UserProfile from "../pages/admin/UserProfile";
>>>>>>> 7235897 (first commit)

export const router = createBrowserRouter([
  {
    path: "/login",
<<<<<<< HEAD
    element: <LoginPage />
=======
    element: <LoginPage />,
>>>>>>> 7235897 (first commit)
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
<<<<<<< HEAD
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
=======
        element: <HomePage />,
      },
      {
        path: "account/:id",
        element: <UserProfile />,
      },
      {
        path: "account/change-password/:id",
        element: <ChangePassword />,
      },
    ],
>>>>>>> 7235897 (first commit)
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
<<<<<<< HEAD
      {
        path: "",
        element: <AdminPage />
      },
    ]
  }
]);
=======
      // {
      //   path: "",
      //   element: <AdminPage />,
      // },
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

    ],
  },
]);
>>>>>>> 7235897 (first commit)
