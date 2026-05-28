import { Outlet } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./pages/Shop/productDetails/CartContext";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { WishProvider } from "./pages/Shop/productDetails/WishContext.jsx";

function App() {
  return (
    <>
    <CartProvider>
      <WishProvider>
      <Navbar />
      <Outlet />
      <Footer/>
      </WishProvider>
      </CartProvider>
    </>
  );
}

export default App;