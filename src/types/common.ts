export type TServerResponce = {
  total: number;
  skip: number;
  limit: number;
};

export interface ICartItem {
  id: number;
  title: string;
  quantity: number;
  discountPercentage: number;
  discountedTotal: number;
  price: number;
  thumbnail: string;
  total?: number;
  stock?: number;
}

export interface TCart {
  id: number;
  products: ICartItem[];
  discountedTotal: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}
