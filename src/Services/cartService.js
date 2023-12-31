import apiClient from "../utils/api-client";

//서버의 cart 장바구니에 제품과 수량을 추가
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

//유저의 장바구니 정보 가져오기
export async function getCartAPI() {
  return await apiClient.get("/cart");
}

//서버에서 유저의 장바구니 삭제
export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}

//장바구니 상품 수량 증가, 감소
export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}
export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
