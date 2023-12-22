import "./ProductCard.css";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/cartContext";
import UserContext from "../../contexts/userContext";
import config from "../../config.json";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  return (
    <article className="product_card">
      <div className="product_image">
        <Link to={`/product/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt={product?.title}
          />
        </Link>
      </div>

      <div className="product_details">
        <h3 className="product_price">
          {product?.price?.toLocaleString("ko-KR")} 원
        </h3>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" />
              {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>
          {/* 재고가있고 유저 로그인시 장바구니 활성화 */}
          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
