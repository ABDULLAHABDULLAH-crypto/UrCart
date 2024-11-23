import { View, Text, Image } from "react-native";
import React from "react";
import SearchInput from "../../../components/searchInput";
import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../../Context/GlobalContext";
const Product = ({ sizes }) => {
  const { price, description, imageSource } = useLocalSearchParams();
  const {cartCount,increaseCart}=useGlobalContext();

  console.log( price, description, imageSource);
  // console.log(ProductPage);
  // console.log(ProductPage.);
  const Quantiny=1;
  return (
    <View className="flex px-6 ">
      <View className=""><Image source={imageSource}
      resizeMode="contain"
  
      className="w-96 h-96 "
      /></View>
      <View className="flex flex-row p-5 justify-between">
        <Text className="text-3xl text-slate-500">SAR</Text>
        <Text className="text-3xl text-slate-500" >{price}</Text>
      </View>
      <View className="p-5 text-4xl">
        <Text className="text-2xl text-slate-500">{description}</Text>
      </View>
      <View>
        <Text>{sizes}</Text>
      </View>

      <View>
        {/* here the quantity of the items will be shown
    
    and the option to contuniue shopping  */}

        <View className="flex justify-center  items-center">
          <View className="flex flex-row border rounded-3xl justify-center w-60 p-3 ">
   
          <TouchableOpacity className="">
          <Image
            resizeMode="cover"
            source={require("../../../assets/images/MinusProduct.png")}
            className="w-16 h-16"
          />
          </TouchableOpacity>
          <Text className="text-2xl mt-4 px-5">{Quantiny}</Text>
          
          <TouchableOpacity className="" onPress={increaseCart}>
          <Image
            resizeMode="cover"
            source={require("../../../assets/images/AddProduct.png")}
            className="w-16 h-16"
            
          />
          </TouchableOpacity>
          </View>
       
        </View>
      </View>
    </View>
  );
};

export default Product;
