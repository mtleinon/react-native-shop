import React from 'react'
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem order={itemData.item} />}
    />
  )
}

OrdersScreen.navigationOptions = navData => {
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
    headerTitle: 'Your Orders',
  }
}
const styles = StyleSheet.create({})
export default OrdersScreen