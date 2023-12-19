import "./App.css";
import { HomePage } from "./components/Home/Homepage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
