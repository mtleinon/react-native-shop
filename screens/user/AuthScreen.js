import React, { useEffect, useState, useReducer, useCallback } from 'react'
import { Alert, ActivityIndicator, Button, View, ScrollView, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux';
import Cart from '../../components/UI/Cart';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const inputValues = { ...state.inputValues, [action.input]: action.value };
    const inputValidities = { ...state.inputValidities, [action.input]: action.isValid };
    const formIsValid = Object.values(inputValidities).every(v => v);
    return { inputValues, inputValidities, formIsValid };
  }
  return state;
}

const AuthScreen = props => {
  const [isSignupMode, setSignUpMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(
    formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  }
  );

  const onInputChange = useCallback((input, value, isValid) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value,
      isValid,
      input
    });
  }, [dispatchFormState]);

  const authHandler = async () => {
    let action;
    if (isSignupMode) {
      action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = authActions.signIn(formState.inputValues.email, formState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error ocurred!', error, [{ text: 'Ok' }]);
      setError(null);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={70}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Cart style={styles.authContainer}>
          <ScrollView>
            <Input
              name="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessages="Please enter a valid email address."
              onInputChange={onInputChange}
              isValid={formState.inputValues.email}
              initialValue={formState.inputValues.email}
              errorMessage="Please give valid email"
            />
            <Input
              name="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessages="Please enter a valid password."
              onInputChange={onInputChange}
              isValid={formState.inputValues.password}
              initialValue={formState.inputValues.password}
              errorMessage="Please give valid password"
            />
            <View style={styles.button}>
              {isLoading
                ? <ActivityIndicator size="small" color={Colors.primary} />
                : <Button title={isSignupMode ? "Sign up" : "Sign In"} color={Colors.primary} onPress={authHandler} />
              }
            </View>
            <View style={styles.button}>
              <Button title={isSignupMode ? "Switch to sign in" : "Switch to sign up"} color={Colors.accent} onPress={() => { setSignUpMode(curr => !curr) }} />
            </View>
          </ScrollView>
        </Cart>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  }
}
);

export default AuthScreen