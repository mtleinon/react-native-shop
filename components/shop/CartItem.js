import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CartItem = ({item, onRemove}) => {
  console.log('CartItem-item', item);
 
  // return <View><Text>{item.title}-{item.price}</Text></View>;
  return (
    <View style={styles.cartItem}>
      <View style={styles.countAndTitle}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Text style={styles.mainText} numberOfLines={2}>{item.title}</Text>
      </View>
      <View style={styles.sumAndDelete}>
        <Text style={styles.mainText}>${item.sum.toFixed(2)}</Text>
        {onRemove &&
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color='red'
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  countAndTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 25
  },
  sumAndDelete: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans-bold',
    color: Colors.lightGray,
    fontSize: 16,
    marginRight: 10
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 15
  }
});

export default CartItem;