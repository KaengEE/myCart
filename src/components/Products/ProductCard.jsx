import "./ProductCard.css";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/cartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <article className="product_card">
      <div className="product_image">
        <Link to={`/product/${product?.id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
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
          {/* 재고가있을경우 장바구니 활성화 */}
          {product?.stock > 0 && (
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
