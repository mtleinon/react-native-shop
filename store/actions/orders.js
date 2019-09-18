import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/orders/${userId}.json`);
      if (!response.ok) {
        throw new Error("fetch: product reading from database failed");
      }
      const resData = await response.json();
      const orders = [];

      for (const key in resData) {
        orders.push(
          new Order(
            key,
            resData[key].items,
            resData[key].amount,
            new Date(resData[key].date)
          ))
      }
      dispatch({
        type: SET_ORDERS,
        orders
      });
    } catch (err) {
      throw err
    }
  }
}

export const addOrder = order => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...order,
          date: date.toISOString()
        })
      }
    );
    if (!response.ok) {
      throw new Error("fetch: Order creation to database failed");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      order: { ...order, id: resData.name, date: date }
    });
  }
}

