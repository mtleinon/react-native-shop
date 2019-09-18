import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  const loadOrders = useCallback(
    async () => {
      setIsLoading(true);
      await dispatch(ordersActions.fetchOrders());
      setIsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View >
  }

  if (!isLoading && orders.length === 0) {
    return <View style={styles.centered}>
      <Text>No orders found. Maybe start creating some!</Text>
    </View >
  }

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
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
export default OrdersScreen