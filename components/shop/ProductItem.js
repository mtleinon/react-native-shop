import React from 'react'
import {
  View, Text, Image, Button, StyleSheet,
  TouchableNativeFeedback, TouchableOpacity, Platform
} from 'react-native'
import Colors from '../../constants/Colors';

const ProductItem = ({ product, onViewDetails, onOrder }) => {

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onViewDetails} useForeground>
          <View>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button color={Colors.primary} title="View" onPress={onViewDetails} />
              <Button color={Colors.primary} title="Order" onPress={onOrder} />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,

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