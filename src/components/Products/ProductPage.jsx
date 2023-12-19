import "./ProductPage.css";
import ProductsList from "./ProductsList";
import ProductsSidebar from "./ProductsSidebar";

const ProductPage = () => {
  return (
    <section className="products_page">
      {/* 왼쪽 카테고리 */}
      <ProductsSidebar />
      {/* 상품목록 */}
      <ProductsList />
    </section>
  );
};

export default ProductPage;
