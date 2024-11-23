import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useGlobalContext } from '../Context/GlobalContext';

const AddAndDelete = ({type}) => {
  const {cartCount,increaseCart}=useGlobalContext();
  return (
    
    <View
          className={`absolute top-14 left-14 bg-white flex-row p-1.5 rounded shadow-md`}
        >
          <TouchableOpacity onPress={increaseCart}>
            <Image
              className={`w-6 h-6`}
              resizeMode="cover"
              source={require("../assets/images/add.png")}
            />
          </TouchableOpacity>
        </View>
  )
}

export default AddAndDelete