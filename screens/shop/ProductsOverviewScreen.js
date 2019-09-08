import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = props => {
  const availableProducts = useSelector(state => state.products.availableProducts);

  return (
    <FlatList data={availableProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductItem
        product={itemData.item}
        onViewDetails={() => {
          props.navigation.navigate(
            'ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
        }}
        onOrder={() => { }}
      />
      }
    />
  )
}
ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}
const styles = StyleSheet.create({})
export default ProductsOverviewScreen