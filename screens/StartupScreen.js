import React, { useEffect } from 'react';
import {
  View, ActivityIndicator,
  StyleSheet, AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors'

import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }

      const { token, userId, expirationDate } = JSON.parse(userData);

      if (new Date(expirationDate) <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      const timeout = new Date(expirationDate).getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, timeout));
      props.navigation.navigate('Shop');
    };
    tryLogin();

  }, [dispatch]);

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen