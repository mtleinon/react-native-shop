export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = orderData => {
  return { type: ADD_ORDER, orderData }
}
