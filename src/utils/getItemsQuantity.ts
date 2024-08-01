import { ICartItem } from "../types/common";

export const getItemsQuantity = (
  products: ICartItem[],
  cartItems: ICartItem[]
) => {
  const result = [];
  for (const product of products) {
    const cur = cartItems.find((item) => item.id === product.id)?.quantity;
    result.push({ ...product, quantity: cur ?? 0 });
  }
  return result;
};
