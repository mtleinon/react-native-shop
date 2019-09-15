import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/Order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  console.log('orders--reducers: ', action);

  switch (action.type) {
    case ADD_ORDER:
      // const newOrder = new Order(
      //   action.order.id,
      //   action.order.items,
      //   action.order.amount,
      //   action.order.date
      // );
      return {
        ...state,
        orders: state.orders.concat(action.order)
      };
    case SET_ORDERS:
      return { orders: action.orders };
  }
  return state;
}