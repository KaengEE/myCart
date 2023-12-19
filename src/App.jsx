import "./App.css";
import { HomePage } from "./components/Home/Homepage";
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
        <SingleProductPage />
      </main>
    </div>
  );
}

export default App;
