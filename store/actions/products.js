export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, productId }
}
export const addProduct = product => {
  return { type: ADD_PRODUCT, product }
}
export const updateProduct = product => {
  return { type: UPDATE_PRODUCT, product }
}