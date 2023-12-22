import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import { useEffect, useState } from "react";

//상품 리스트
const ProductsList = () => {
  //쿼리스트링
  const [search, setSearch] = useSearchParams();
  const searchQuery = search.get("search");

  const category = search.get("category");
  const page = search.get("page");

  //정렬
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        page,
      },
    },
    [searchQuery, category, page]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  //페이지가 변경되면
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    //search 파라미터에서 page값만 업데이트
    setSearch({ ...currentParams, page: page });
  };

  //정렬
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products]; //제품정보 내용만 복사

      //가격순
      if (sortBy === "price desc") {
        //sort((a,b) => b - a) 는 내림차순
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        //sort((a,b) => a - b) 는 오름차순
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      }
      //평점순
      else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      }
      //정렬이 없을때
      else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {/* 페이지네이션 */}
      {data && (
        <Pagination
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductsList;
