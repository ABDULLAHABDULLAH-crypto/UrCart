import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { router } from "expo-router";
import AddAndDelete from "./AddAndDelete";

const Product = ({ price, description, imageSource, handleClick }) => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const handleClickForProduct = () => {
    router.push({
      pathname: "ProductPage",
      params: {price: price,
        description: description,
        imageSource: imageSource,},
    });
  };

  return (
    <View className={`flex-1 w-full overflow-hidden mr-4`}>
      <View className={`h-24 w-24 relative`}>
        {/* Background */}
        <View
          className={`absolute top-0 left-0 h-24 w-24 rounded-lg bg-[#f7f7f7]`}
        />

        {/* Add Item Button */}
        
        <AddAndDelete/>
        {/* Tomato Icon */}
        <TouchableOpacity onPress={handleClickForProduct}>
          <Image
            className={`absolute top-4.5 left-3.5 w-19 h-16.5`}
            resizeMode="cover"
            source={imageSource}
          />
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View className={`mt-[-1.25] gap-2`}>
        <Text className="text-[#262626] font-plight text-[11px] text-left w-25">
          {description}
        </Text>
        <Text className={`text-left w-25`}>
          <Text
            className={`font-dmSansMedium text-[12px] text-[#000] font-medium`}
          >
            SAR{price}
          </Text>
          <Text className={`text-[#838383] font-pextralight text-[11px]`}>
            {" "}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Product;
