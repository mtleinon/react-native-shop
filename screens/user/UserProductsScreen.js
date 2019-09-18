import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, View, Text, Button, FlatList, Alert, StyleSheet, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userProducts = useSelector(state => state.products.userProducts);

  const selectItem = (productId, productTitle) => {
    props.navigation.navigate(
      'EditProduct', {
      productId,
      productTitle
    });
  }

  const dispatch = useDispatch();

  const asyncDeleteHandler = async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(productActions.deleteProduct(productId));
    } catch (err) {
      setError('Product delete failed:' + err);
    }
    setIsLoading(false);
  }

  if (error) {
    Alert.alert('An error ocurred!', error, [{ text: 'Ok' }]);
    setError(null);
  }

  const deleteHandler = (productId) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => asyncDeleteHandler(productId)
        }
      ]);
  }

  if (isLoading) {
    return (<View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View >);
  }

  if (!isLoading && userProducts.length === 0) {
    return <View style={styles.centered}>
      <Text>No products found. Maybe start adding some!</Text>
    </View >
  }

  return (
    <View>
      <FlatList data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={itemData => <ProductItem
          product={itemData.item}
          onSelect={() => selectItem(itemData.item.id, itemData.item.title)}
        >
          <Button color={Colors.primary} title="Edit"
            onPress={() => selectItem(itemData.item.id, itemData.item.title)} />
          <Button color={Colors.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
        </ProductItem>
        }
      />
    </View>
  )
}

UserProductsScreen.navigationOptions = navData => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => { navData.navigation.toggleDrawer(); }}
        />
      </HeaderButtons>
    ),
    title: 'Your Products',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => { navData.navigation.navigate('EditProduct') }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
export default UserProductsScreen