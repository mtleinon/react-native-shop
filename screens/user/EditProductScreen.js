import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products';
import Product from '../../models/Product';

const EditProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productId = navigation.getParam('productId');
  console.log('productId', productId);

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId));
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState(editedProduct ? editedProduct.price.toString() : '');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const submitHandler = useCallback(() => {
    console.log('SUBMIT');
    if (editedProduct) {
      dispatch(productsActions.updateProduct(
        new Product(editedProduct.id, editedProduct.ownerId,
          title, imageUrl, description, parseInt(price, 10))));
    }
    else {
      dispatch(productsActions.addProduct(
        new Product((new Date()).toString(), 'u1',
          title, imageUrl, description, parseInt(price, 10))));
    }
    navigation.goBack();
  }, [dispatch, title, imageUrl, description, price]);

  useEffect(() => {
    navigation.setParams({ submitHandler })
  }, [submitHandler]);

  return (
    < View style={styles.form} >
      <View style={styles.formInput}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.label}>Image Url</Text>
        <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={{
          ...styles.input,
          backgroundColor: editedProduct !== undefined ? Colors.lightGray : 'white'
        }}
          value={price} onChangeText={setPrice}
          editable={editedProduct === undefined} />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      </View>
    </View >
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
    margin: 10
  },
  formInput: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 4
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1
  }
})
export default EditProductsScreen