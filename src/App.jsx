import "./App.css";
import { HomePage } from "./components/Home/Homepage";
import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./components/Products/ProductPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* <HomePage /> */}
        <ProductPage />
      </main>
    </div>
  );
}

export default App;
