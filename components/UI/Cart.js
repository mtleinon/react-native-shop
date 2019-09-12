import React from 'react'
import { View, StyleSheet } from 'react-native'

const Cart = props => {
  return (
    <View style={{ ...styles.cart, ...props.style }}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  cart: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  }
})

export default Cart