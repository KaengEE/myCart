import "./CartPage.css";
import remove from "../../assets/remove.png";
import user from "../../assets/user.webp";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import CartContext from "../../contexts/cartContext";
import { checkoutAPI } from "../../Services/orderService";
import { toast } from "react-toastify";

const CartPage = () => {
  //합계
  const [subTotal, setSubTotal] = useState(0);
  //유저정보
  const user = useContext(UserContext);
  //cartContext
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  //체크아웃함수
  const checkout = () => {
    const oldCart = [...cart];
    setCart([]); //카트 비우기(모두삭제)
    checkoutAPI()
      .then(() => {
        toast.success("주문 성공!");
      })
      .catch(() => {
        toast.error("checkout 중 에러발생.");
        setCart(oldCart); //실패시 복구
      });
  };

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>

      <Table headings={["상품", "가격", "구매수량", "총 금액", "상품삭제"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price.toLocaleString("ko-KR")} 원</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>{(quantity * product.price).toLocaleString("ko-KR")} 원</td>
              {/* 삭제 */}
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 결제테이블 */}
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>총 금액</td>
            <td>{subTotal.toLocaleString("ko-KR")} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>3,000 원</td>
          </tr>
          <tr className="cart_bill_final">
            <td>결재금액</td>
            <td>{(subTotal + 3000).toLocaleString("ko-KR")} 원</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        결제하기
      </button>
    </section>
  );
};

export default CartPage;
