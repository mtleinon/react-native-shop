import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expirationTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({ type: AUTHENTICATE, token, userId });
  };
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {

    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
}
export const logout = () => {
  AsyncStorage.removeItem('userData');
  clearLogoutTimer();
  return { type: LOGOUT }
};

export const signup = (email, password) => {
  return async dispatch => {

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSli5xt3Rb7ggS3rZKCTv0vA1I58fQGq0',
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      });

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'Email already used';
      }
      throw new Error(message);
    }

    const data = await response.json();
    dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000);
    saveUserDataToStorage(data.localId, data.idToken, expirationDate);
  }
}

export const signIn = (email, password) => {
  return async dispatch => {

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSli5xt3Rb7ggS3rZKCTv0vA1I58fQGq0',
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      });

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Email could not be found';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Erroneous password';
      } else if (errorId === 'USER_DISABLED') {
        message = 'User account disabled by the administrator';
      }
      throw new Error(message);
    }

    const data = await response.json();
    dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000);
    saveUserDataToStorage(data.localId, data.idToken, expirationDate);
  }
}

const saveUserDataToStorage = (userId, token, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expirationDate: expirationDate ? expirationDate.toISOString() : null
    })
  )
};