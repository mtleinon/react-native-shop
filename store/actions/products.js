export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = productId => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("fetch: product deletion from database failed");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId
    });
  }
}

export const updateProduct = product => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/products/${product.id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          imageUrl: product.imageUrl
        })
      });
    if (!response.ok) {
      throw new Error("fetch: Product update in database failed");
    }
    dispatch({
      type: UPDATE_PRODUCT,
      product
    });
  }
}

export const createProduct = product => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, ownerId: userId })
      });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("fetch: Product creation to database failed:" +
        errorData.error.message);
    }
    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      product: { ...product, id: resData.name, ownerId: userId }
    });
  }
}

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('https://react-native-shop-874c4.firebaseio.com/products.json');
      if (!response.ok) {
        throw new Error("fetch: product reading from database failed");
      }
      const data = await response.json();
      const products = data ?
        Object.entries(data).map(product => ({ ...product[1], id: product[0] })) :
        [];

      dispatch({
        type: SET_PRODUCTS,
        products,
        userProducts: products.filter(product => product.ownerId === userId)
      });
    } catch (err) {
      throw err
    }
  }
}

