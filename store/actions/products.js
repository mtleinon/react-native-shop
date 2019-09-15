export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = productId => {
  console.log('deleteProduct', productId);

  return async dispatch => {

    const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/products/${productId}.json`, {
      method: 'DELETE',
    });
    console.log('delete response', response);
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
  console.log('updateProduct', product);

  return async dispatch => {

    const response = await fetch(`https://react-native-shop-874c4.firebaseio.com/products/${product.id}.json`, {
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
    console.log('update response', response);
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
  return async dispatch => {

    const response = await fetch('https://react-native-shop-874c4.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    });
    console.log('create response', response);
    if (!response.ok) {
      throw new Error("fetch: Product creation to database failed");
    }
    const resData = await response.json();
    console.log('resData', resData);
    dispatch({
      type: CREATE_PRODUCT,
      product: { ...product, id: resData.name }
    });
  }
}

export const fetchProducts = () => {
  return async dispatch => {
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
        products
      });
    } catch (err) {
      console.log('fetchProducts: err =', err);
      throw err
    }
  }
}

