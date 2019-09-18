import React, { useState, useCallback, useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, Alert, Text, View, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products';
import Product from '../../models/Product';
import Input from '../../components/UI/Input';
import { ScrollView } from 'react-native-gesture-handler';

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

const EditProductsScreen = ({ navigation }) => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const productId = navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId));

  const [formState, dispatchFormState] = useReducer(
    formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: editedProduct ? editedProduct.price.toString() : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
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

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form',
        [{ text: 'Ok' }]);
      return;
    }
    const { title, imageUrl, description, price } = formState.inputValues;
    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(productsActions.updateProduct(
          new Product(editedProduct.id, editedProduct.userId,
            title, imageUrl, description, parseInt(price, 10))));
      } else {
        await dispatch(productsActions.createProduct(
          new Product('', '',
            title, imageUrl, description, parseInt(price, 10))));
      }
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      setError('Product update/add failed: ' + err)
    }
  }, [dispatch, formState]);

  useEffect(() => {
    navigation.setParams({ submitHandler })
  }, [submitHandler]);

  if (error) {
    Alert.alert('An error ocurred!', error, [{ text: 'Ok' }]);
    setError(null);
    setIsLoading(false);
  }
  if (isLoading) {
    return (<View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View >);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        < View style={styles.form} >
          <Input
            name='title'
            label='Title'
            required
            returnKeyType='next'
            initialValue={formState.inputValues.title}
            isValid={formState.inputValidities.title}
            onInputChange={onInputChange}
            errorMessage='Please give title' />
          <Input
            name='imageUrl'
            label='Image Url'
            required
            returnKeyType='next'
            initialValue={formState.inputValues.imageUrl}
            isValid={formState.inputValidities.imageUrl}
            onInputChange={onInputChange}
            errorMessage='Please give imageUrl' />
          <Input
            name='price'
            label='Price'
            required
            returnKeyType='next'
            min={0.01}
            keyboardType='decimal-pad'
            initialValue={formState.inputValues.price}
            isValid={formState.inputValidities.price}
            onInputChange={onInputChange}
            disabled={!!editedProduct}
            errorMessage='Please give price' />
          <Input
            name='description'
            label='Description'
            multiline
            numberOfLines={5}
            required
            returnKeyType='next'
            initialValue={formState.inputValues.description}
            isValid={formState.inputValidities.description}
            onInputChange={onInputChange}
            errorMessage='Please give description' />
        </View >
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

EditProductsScreen.navigationOptions = navData => {
  const submitHandler = navData.navigation.getParam('submitHandler');
  return {
    title: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={() => { submitHandler() }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 5
  },
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default EditProductsScreen