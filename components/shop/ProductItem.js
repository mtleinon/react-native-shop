import React from 'react'
import {
  View, Text, Image, Button, StyleSheet,
  TouchableNativeFeedback, TouchableOpacity, Platform
} from 'react-native'
import Colors from '../../constants/Colors';
import Cart from '../../components/UI/Cart';

const ProductItem = ({ product, onSelect, children }) => {
  console.log('product', product);

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (

    <Cart style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground>
          <View>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {children}
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Cart>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 18,
  },
  price: {
    color: Colors.lightGray,
    fontSize: 14,
  },
  details: {
    height: '20%',
    alignItems: 'center',
    padding: 10,
  },
  actions: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
})
export default ProductItem