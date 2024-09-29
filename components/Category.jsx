import { View, Text, Image } from "react-native";
import React from 'react';
import { tw } from 'nativewind';

const Category = ({ categoryName, imageSource }) => {
  return (
    <View className="flex-1 w-28 items-center overflow-hidden mr-4 text-center rounded-lg ">
      {/* Category Image */}
      <View className="w-28 h-28 rounded-lg overflow-hidden bg-gradient-to-r from-[#e0f7fa] to-[#e1bee7] shadow-md">
        <Image
          className="w-full h-full"
          resizeMode="cover"
          source={imageSource}
        />
      </View>

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