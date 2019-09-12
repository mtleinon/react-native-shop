import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';
import CartITem from './CartItem';
import Cart from '../../components/UI/Cart';

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const itemsArray = Object.entries(order.items).map(item => ({ id: item[0], ...item[1] }));
  console.log('itemsArray', itemsArray);

  return (
    <Cart style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.readableDate}</Text>
      </View>
      <View style={styles.button}>
        <Button title={showDetails ? "Hide details" : "Show details"}
          color={Colors.primary}
          onPress={() => setShowDetails(current => !current)}
        />
      </View>
      {showDetails && <View>
        {itemsArray.map(item => <CartITem key={item.id} item={item} />)}
      </View>}
    </Cart>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%'
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    color: Colors.lightGray,
    fontSize: 16,
    marginRight: 10
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16
  },
  button: {
    marginBottom: 10
  }
})
export default OrderItem