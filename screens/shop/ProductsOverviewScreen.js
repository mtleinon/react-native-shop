import React from 'react'
import { FlatList, Button, StyleSheet, Platform } from 'react-native'
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const availableProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItem = (productId, productTitle) => {
    props.navigation.navigate(
      'ProductDetail', {
      productId,
      productTitle
    });
  }

  return (
    <FlatList data={availableProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductItem
        product={itemData.item}
        onSelect={() => selectItem(itemData.item.id, itemData.item.title)}
      >
        <Button color={Colors.primary} title="View"
          onPress={() => selectItem(itemData.item.id, itemData.item.title)} />
        <Button color={Colors.primary} title="Add To Cart"
          onPress={() => dispatch(cartActions.addToCart(itemData.item))} />
      </ProductItem>
      }
    />
  )
}
ProductsOverviewScreen.navigationOptions = navData => {
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
    headerTitle: 'All Products',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => { navData.navigation.navigate('Cart') }}
        />
      </HeaderButtons>
    )
  };
}
const styles = StyleSheet.create({})
export default ProductsOverviewScreen