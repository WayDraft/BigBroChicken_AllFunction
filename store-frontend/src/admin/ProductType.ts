// 판매 상품 타입 정의

export type ProductStatus = "selling" | "soldout"

export type Product = {
  id: number;
  name: string;
  price: number;
  status: ProductStatus;
}