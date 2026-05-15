import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import 'remixicon/fonts/remixicon.css';
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//import "remixicon/fonts/remixicon.css";

// { Provider } from "react-redux";
//import { store } from "./redux/store.js";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<Home />} />
        <Route path="/about" element={<div>about</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);