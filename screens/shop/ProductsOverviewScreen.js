import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
  const availableProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    console.log('1');
    try {
      await dispatch(productActions.fetchProducts());
      console.log('2');
    } catch (err) {
      setError(err);
      console.log('3');
    }
    setIsRefreshing(false);
    console.log('4');
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() =>
      setIsLoading(false));

  }, [dispatch]);

  // Add listener to load products newly when we navigate with drawer back
  // to this page. Without listener products would be loaded only att first time
  // when the page is loaded. 
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus', loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const selectItem = (productId, productTitle) => {
    props.navigation.navigate(
      'ProductDetail', {
      productId,
      productTitle
    });
  }
  if (error) {
    return <View style={styles.centered}>
      <Text>Some error happened while loading products! </Text>
      <Button title="Try Again" color={Colors.primary}
        onPress={loadProducts} />
    </View >
  }

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View >
  }
  if (!isLoading && availableProducts.length === 0) {
    return <View style={styles.centered}>
      <Text>No products found. Maybe start adding some!</Text>
    </View >
  }
  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadProducts}
      data={availableProducts}
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
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
export default ProductsOverviewScreen