import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, SET_PRODUCTS } from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        availableProducts: state.availableProducts.filter(prod => prod.id !== action.productId),
        userProducts: state.userProducts.filter(prod => prod.id !== action.productId)
      }
    case UPDATE_PRODUCT:
      return {
        availableProducts: state.availableProducts.map(
          product => product.id === action.product.id ? action.product : product),
        userProducts: state.userProducts.map(
          product => product.id === action.product.id ? action.product : product),
      }

    case CREATE_PRODUCT:
      return {
        availableProducts: state.availableProducts.concat(action.product),
        userProducts: state.userProducts.concat(action.product),
      }
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts
      }
  }
  return state;
}