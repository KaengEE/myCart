import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Home/Homepage";
import ProductPage from "../Products/ProductPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import SignupPage from "../Authentication/SignupPage";
import LoginPage from "../Authentication/LoginPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import Logout from "../Authentication/Logout";

const Routing = ({ addToCart, cart }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route
        path="/product/:id"
        element={<SingleProductPage addToCart={addToCart} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/cart" element={<CartPage cart={cart} />} />
      <Route path="/myorders" element={<MyOrderPage />} />
    </Routes>
  );
};

export default Routing;
