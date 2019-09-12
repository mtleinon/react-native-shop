import React from 'react'
import { View, Text, Button, FlatList, Alert, StyleSheet, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  // const availableProducts = useSelector(state => state.products.availableProducts);

  const selectItem = (productId, productTitle) => {
    props.navigation.navigate(
      'EditProduct', {
      productId,
      productTitle
    });
  }

  const dispatch = useDispatch();

  const deleteHandler = (productId) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => dispatch(productActions.deleteProduct(productId))
        }
      ]);
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

const styles = StyleSheet.create({})
export default UserProductsScreen