import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./Services/cartService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/userContext";
import CartContext from "./contexts/cartContext";

setAuthToken(localStorage.getItem("token"));

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

    //백엔드서버에도 저장
    addToCartAPI(product._id, quantity)
      .then((res) => {
        //토스트 메시지 출력
        toast.success("상품 추가 성공!");
      })
      .catch((err) => {
        toast.error("상품 추가에 실패했습니다.");
      });
  };

  //장바구니정보가져오기
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("카트 가져오기에 실패했습니다.");
      });
  };

  //시작할때, user가 바뀌면 장바구니정보 가져오기
  useEffect(() => {
    getCart();
  }, [user]);

  //장바구니 삭제
  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    //백엔드서버에서 삭제
    removeFromCartAPI(id).catch((err) => {
      toast.error("장바구니 상품 삭제 에러");
    });
  };

  //장바구니상품 증가 감소 함수
  const updateCart = (type, id) => {
    const updatedCart = [...cart]; //내용만 카피

    //참일경우 인덱스 번호가 return
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    //증가
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      //백엔드
      increaseProductAPI(id).catch((err) => {
        toast.error("상품 증가 에러");
      });
    }
    //감소
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      //백엔드
      decreaseProductAPI(id).catch((err) => {
        toast.error("상품 감소 에러");
      });
    }
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
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar user={user} cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
