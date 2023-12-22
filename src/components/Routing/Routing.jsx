import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "../Products/ProductPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import SignupPage from "../Authentication/SignupPage";
import LoginPage from "../Authentication/LoginPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";
import { HomePage } from "../Home/Homepage";

const Routing = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />

      {/* 로그인되어 있는 유저는 로그인/회원가입 요청시 홈으로 이동 */}
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
