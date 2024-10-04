import { View, Text, Image,TouchableOpacity } from "react-native";
import React from 'react';
import { tw } from 'nativewind';

const Category = ({ categoryName, imageSource,handleClick }) => {
  return (
    <View className=" w-24 items-center  mr-4 text-center rounded-lg m-3">
      {/* Category Image */}
      <TouchableOpacity onPress={handleClick}
       className="w-20 h-20  rounded-lg overflow-hidden bg-gradient-to-r from-[#e0f7fa] to-[#e1bee7] shadow-md">
        <Image
          className="w-full h-full"
          resizeMode="cover"
          source={imageSource}
        />

      </TouchableOpacity>

      {/* Description */}
      <View className="mt-2 items-center">
        <Text className="text-[#262626] font-semibold text-[12px] text-center px-1">
          {categoryName}
        </Text>
      </View>
    </View>
  );
};

export default Category;