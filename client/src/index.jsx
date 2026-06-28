
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Changed imports here
import { Provider } from "react-redux";

import "remixicon/fonts/remixicon.css";

import store from "../src/redux/store.js";
import App from "./App";

// Page Imports
import Home from "./pages/home/Home";
import Login from "./pages/Login.jsx";
import Products from "./pages/Shop/Products";
import Signup from "./pages/Signup.jsx";
import UserDashboard from "./pages/user/UserDashboard";
import Categories from "./pages/categoryPage/Categories";
import CategoryProducts from "./pages/categoryPage/CategoryProducts";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Search from "./pages/search/Search";
import SingleProduct from "./pages/Shop/productDetails/SingleProduct";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import UserDMain from "./pages/dashboard/user/dashboard/UserDMain.jsx";
import UserOrder from "./pages/dashboard/user/UserOrder.jsx"
import OrderDetails from "./pages/dashboard/user/OrderDetails.jsx";
import UserPayments from "./pages/dashboard/user/UserPayments.jsx";
import UserReviews from "./pages/dashboard/user/UserReviews.jsx";
import UserProfileUpdate from "./pages/dashboard/user/UserProfileUpdate.jsx";
import AdminDMain from "./pages/dashboard/admin/dashboard/AdminDMain.jsx";
import AddProduct from "./pages/dashboard/admin/addProduct/AddProduct.jsx";
import ManageProduct from "./pages/dashboard/admin/manageProduct/ManageProduct.jsx"


// 1. DEFINE YOUR MODERN OBJECT ROUTER ARRAY
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main public layout wrapper (has your main navbar/footer)
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "shop", element: <Products /> },
      { path: "products/:id", element: <SingleProduct /> },
      { path: "search", element: <Search /> },
      { path: "category", element: <Categories /> },
      { path: "categories/:category", element: <CategoryProducts /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "success", element: <PaymentSuccess /> },
      {
        path:"/orders/:orderId",element:<OrderDetails/>
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ), // This acts as your Dashboard Layout parent wrapper
    children: [
      { path: "", element: <UserDMain/>}, // Renders at: /dashboard/user
      { path: "orders", element: <UserOrder/> }, // Renders at: /dashboard/admin
      { path: "payments", element: <UserPayments/> },
      { path: "profile", element: <UserProfileUpdate/> },
      { path: "reviews", element: <UserReviews/> },

      // merchant routes (only accessible by admin ) Todo:include roles field

      {
        path: "merchant",
        element: (
          <PrivateRoute role="merchant">
            <div>Merchant Main</div>
          </PrivateRoute>
        ),
      },
      {
        path: "merchant/add-new-product",
        element: (
          <PrivateRoute role="merchant">
            <div>Add new product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "merchant/manage-product",
        element: (
          <PrivateRoute role="merchant">
            {" "}
            <div>manage product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "merchant/update-product/:id",
        element: (
          <PrivateRoute role="merchant">
            {" "}
            <div>update product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "merchant/users",
        element: (
          <PrivateRoute role="merchant">
            <div>users for admin</div>
          </PrivateRoute>
        ),
      },
      {
        path: "merchant/manage-orders",
        element: (
          <PrivateRoute role="merchant">
            <div>manage orders</div>
          </PrivateRoute>
        ),
      },

      // admin routes (only accessible by admin ) Todo:include roles field

      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <AdminDMain/>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/add-product",
        element: (
          <PrivateRoute role="admin">
            <AddProduct/>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-product",
        element: (
          <PrivateRoute role="admin">
            <ManageProduct/>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/update-product/:id",
        element: (
          <PrivateRoute role="admin">
            <div>update product</div>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <PrivateRoute role="admin">
            <div>users for admin</div>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-orders",
        element: (
          <PrivateRoute role="admin">
            <div>manage orders</div>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = document.getElementById("root");

// 2. RENDER THE ROUTER VIA ROUTERPROVIDER
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    {/* RouterProvider delivers your object configuration to the app */}
    <RouterProvider router={router} />
  </Provider>,
);
