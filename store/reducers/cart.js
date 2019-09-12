import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";
import CartItem from "../../models/CartItem";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  console.log('action', state, action);

  switch (action.type) {
    case ADD_TO_CART:
      const { id, title, price } = action.product;
      let quantity = 1;
      let sum = price;

      // If product is already in cart, update its quantity and sum
      if (state.items[id]) {
        quantity += state.items[id].quantity;
        sum += state.items[id].sum;
      }
      console.log('ADD_TO_CART:', new CartItem(quantity, price, title, sum));

      return {
        ...state,
        items: {
          ...state.items,
          [id]: new CartItem(quantity, price, title, sum)
        },
        totalAmount: state.totalAmount + price
      };

    case REMOVE_FROM_CART:
      const idToBeRemoved = action.productId;
      if (state.items[idToBeRemoved]) {
        const updatedItems = { ...state.items };
        const updatedTotalAmount = state.totalAmount - updatedItems[idToBeRemoved].price;

        if (updatedItems[idToBeRemoved].quantity === 1) {
          delete updatedItems[idToBeRemoved];
        } else {
          updatedItems[idToBeRemoved].quantity--;
          updatedItems[idToBeRemoved].sum -= updatedItems[idToBeRemoved].price;
        }
        return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      const idToBeDeleted = action.productId;
      if (state.items[idToBeDeleted]) {
        const updatedItems = { ...state.items };
        const updatedTotalAmount = state.totalAmount - updatedItems[idToBeDeleted].sum;
        delete updatedItems[idToBeDeleted];
        return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
      };
  }
  return state;
}