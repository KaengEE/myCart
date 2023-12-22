import { useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Loader from "../Common/Loader";
import CartContext from "../../contexts/cartContext";
import UserContext from "../../contexts/userContext";
import config from "../../config.json";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0); //초기값 0
  const { id } = useParams(); //주소변수 pathVariable 받기
  //특정 id의 정보만 가져옴
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  //cartContext
  const { addToCart } = useContext(CartContext);
  //구매개수
  const [quantity, setQuantity] = useState(1);
  //유저
  const user = useContext(UserContext);

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            {/* 큰 썸네일 */}
            <img
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          {/* 상세설명 */}
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              ￦ {product.price.toLocaleString("ko-KR")} 원
            </p>
            {user && (
              <>
                <h2 className="quantity_title">구매개수:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>
                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  장바구니 추가
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
