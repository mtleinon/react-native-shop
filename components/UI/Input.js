import React, { useReducer, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = React.memo(props => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.isValid,
    touched: false
  });
  console.log('RENDER Input', inputState);

  const textChangeHandler = value => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && value.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(value.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +value < props.min) {
      isValid = false;
    }
    if (props.max != null && +value > props.max) {
      isValid = false;
    }
    if (props.minLength != null && value.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value, isValid });
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const { onInputChange, name } = props;
  useEffect(() => {
    console.log('1');

    if (inputState.touched) {
      console.log('2');

      onInputChange(name, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, name]);

  console.log('RENDER return Input', inputState);
  return (
    <View style={styles.formInput}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={props.disabled ? [styles.input, styles.disabledInput] : styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        editable={!props.disabled}
        {...props}
      />
      {!inputState.isValid && inputState.touched && <View
        style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {props.errorMessage}</Text>
      </View>
      }
    </View>
  )
});

const styles = StyleSheet.create({
  formInput: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 2
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1
  },
  disabledInput: {
    backgroundColor: '#eee'
  },
  errorContainer: {
    marginBottom: 3
  },
  errorText: {
    fontFamily: 'open-sans',
    color: '#ff0000',
    fontSize: 12
  }
})
export default Input