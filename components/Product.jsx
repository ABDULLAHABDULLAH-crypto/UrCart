import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Product = ({ price, description, imageSource,handleClick }) => {
  return (
    <View className={`flex-1 w-full overflow-hidden mr-4`}>
      <View className={`h-24 w-24 relative`}>
        {/* Background */}
        <View
          className={`absolute top-0 left-0 h-24 w-24 rounded-lg bg-[#f7f7f7]`}
        />

        {/* Add Item Button */}
        <View
          className={`absolute top-14 left-14 bg-white flex-row p-1.5 rounded shadow-md`}
        >
<<<<<<< HEAD
          <TouchableOpacity onPress={{}}>
=======
          <TouchableOpacity onPress={handleClick}>
>>>>>>> 2f45026838199d08e5d682963cd68ec148b40ffa
            <Image
              className={`w-6 h-6`}
              resizeMode="cover"
              source={require("../assets/images/add.png")}
            />
          </TouchableOpacity>
        </View>

        {/* Tomato Icon */}
        <Image
          className={`absolute top-4.5 left-3.5 w-19 h-16.5`}
          resizeMode="cover"
          source={imageSource}

        />
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
            {price}
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
