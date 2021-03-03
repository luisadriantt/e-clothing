import { cartItemsVar, cartItemsCountVar } from "./cache";
import { addItemToCart, getCartItemsCount } from "./cart.utils";

export const addItem = (item) => {
  const newItems = addItemToCart(cartItemsVar(), item);
  cartItemsVar(newItems);
  const counter = getCartItemsCount(cartItemsVar());
  cartItemsCountVar(counter);
};
