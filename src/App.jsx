import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";

function App() {
  //유저정보
  const [user, setUser] = useState(null);
  //장바구니
  const [cart, setCart] = useState([]);

  //장바구니추가
  const addToCart = (product, quantity) => {
    //id가 동일한 배열이 있으면 update
    const updatedCart = [...cart];
    //findIndex는 모든 배열아이템과 비교해서 참일경우 인덱스번호가 return 거짓일경우 -1
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    //같은 배열이 없으면 새로추가(push)
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      //같은 배열이 있으면 그 배열에 수량 추가
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
  };

  //로컬에 저장된 토큰 가져오기
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      //토큰 유효 시간과 현재시간을 비교해서 만료된 토큰은 삭제
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
