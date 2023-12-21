import apiClient from "../utils/api-client";

//서버의 cart 장바구니에 제품과 수량을 추가
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

//유저의 장바구니 정보 가져오기
export async function getCartAPI() {
  return await apiClient.get("/cart");
}
