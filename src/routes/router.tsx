import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import ProductPage from "../pages/home/products/ProductPage";
import VariantPage from "../pages/home/products/variants/VariantPage";
import BrandPage from "../pages/home/products/brands/BrandPage";
import ProductDetail from "../pages/home/products/product-detail/ProductDetail";
import CategoryPage from "../pages/home/products/categories/CategoryPage";
import ProductEdit from "../pages/home/products/product-detail/product-edit/ProductEdit";
import AddVariant from "../pages/home/products/product-detail/add-variant/AddVariant";
import AddProduct from "../pages/home/products/add-product/AddProduct";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <HomePage />,
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
                path: "",
                element: <AdminPage />,
            },
        ],
    },
]);
