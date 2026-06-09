import React from "react";
import ReactDOM from "react-dom/client";

<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88

import "remixicon/fonts/remixicon.css";

import App from "./App";

import Home from "./pages/home/Home";
import Login from "./pages/Login";
<<<<<<< HEAD
import Products from "./pages/Shop/Products";
=======
import Products from "./pages/Products";
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
import Signup from "./pages/Signup";

import UserDashboard from "./pages/user/UserDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
<<<<<<< HEAD
import Categories from "./pages/categoryPage/Categories";
import CategoryProducts from "./pages/categoryPage/CategoryProducts";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Search from "./pages/search/Search";
import SingleProduct from "./pages/Shop/productDetails/SingleProduct";

 import { Provider } from "react-redux";
import store from "../src/redux/store.js";
=======

// import { Provider } from "react-redux";
// import { store } from "./redux/store.js";
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
<<<<<<< HEAD
  // <Provider store={store}>
 <Provider store ={store}>
  <BrowserRouter>
    <Routes>
      {/* MAIN LAYOUT */}

      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/contact" element={<ContactPage />} />

        {/* product card */}

        <Route path="/shop" element={<Products />} />

         {/* <Route
          path="/products"
          element={<Products />}
        /> */}
        <Route path="/products/:id" element={<SingleProduct />} />


       <Route path="/search" element={<Search />} />


        <Route path="/category" element={<Categories />} />
        {/*product is better instead of categories */}
        <Route path="/categories/:category" element={<CategoryProducts />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* <Route
  path="/categories/:category"
  element={<CategoryProduct />}
/> */}

      {/* AUTH */}

      {/* USER */}

      <Route path="/user/dashboard" element={<UserDashboard />} />

      {/* ADMIN */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>,
 </Provider>
);
=======

  // <Provider store={store}>

  <BrowserRouter>

    <Routes>

      {/* MAIN LAYOUT */}

      <Route path="/" element={<App />}>

        <Route index element={<Home />} />

        <Route
          path="about"
          element={<div>About</div>}
        />
        
        {/* product card */}
      
      <Route
        path="shop"
        element={<Products />}
      />

      </Route>

      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* USER */}

      <Route
        path="/user/dashboard"
        element={<UserDashboard />}
      />

      {/* ADMIN */}

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      

    </Routes>

  </BrowserRouter>

  // </Provider>
);



>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
