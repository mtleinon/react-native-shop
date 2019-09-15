import React, { useState } from 'react'
import { ActivityIndicator, View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Cart from '../../components/UI/Cart';
const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const items = useSelector(state => state.cart.items);
  const itemsArray = Object.entries(items).map(item => ({ id: item[0], ...item[1] }));
  const dispatch = useDispatch();

  const addOrder = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder({ items, amount: cartTotalAmount }));
    setIsLoading(false);
  }
  return (
    <View style={styles.screen}>
      <Cart style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? <ActivityIndicator size="large" color={Colors.primary} />
          : <Button title="Order now" disabled={itemsArray.length === 0}
            onPress={addOrder} />
        }
      </Cart>
      <View>
        <FlatList
          data={itemsArray}
          keyExtractor={item => item.id}
          renderItem={itemData => <CartItem item={itemData.item}
            onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.id))} />}
        />
      </View>
    </View>
  )
}

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
})
export default CartScreen