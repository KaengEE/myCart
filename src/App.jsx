import "./App.css";
import CartPage from "./components/Cart/CartPage";
import { HomePage } from "./components/Home/Homepage";
import MyOrderPage from "./components/MyOrder/MyOrderPage";
import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./components/Products/ProductPage";
import SingleProductPage from "./components/SingleProduct/SingleProductPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* <HomePage /> */}
        {/* <ProductPage /> */}
        {/* <SingleProductPage /> */}
        {/* <CartPage /> */}
        <MyOrderPage />
      </main>
    </div>
  );
}

export default App;
