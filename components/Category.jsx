import { View, Text, Image,TouchableOpacity } from "react-native";
import React from "react";
import { tw } from "nativewind";
import { router } from "expo-router";

const Category = ({ categoryName, imageSource, onPress }) => {
  return (
    <View className=" w-24 items-center  mr-4 text-center rounded-lg m-3">
      {/* Category Image */}
      <TouchableOpacity onPress={()=>{
        router.push({pathname:`category/${categoryName}`,params:{categoryName:categoryName}})
      }}>
        <View className="w-20 h-20  rounded-lg overflow-hidden bg-gradient-to-r from-[#e0f7fa] to-[#e1bee7] shadow-md">
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
      </TouchableOpacity>
    </View>
  );
};

export default Category;