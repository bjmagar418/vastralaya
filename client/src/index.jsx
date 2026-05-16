import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "remixicon/fonts/remixicon.css";

import App from "./App";

import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserDashboard from "./pages/user/UserDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";

// import { Provider } from "react-redux";
// import { store } from "./redux/store.js";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

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