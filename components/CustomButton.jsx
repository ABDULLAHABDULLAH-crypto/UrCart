import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  handlePress,
  title,
  containerStyles, // Make sure this is a valid Tailwind class name or handle it separately
  textStyles,
}) => {
  return (
    <TouchableOpacity
    className={`bg-primary rounded-lg min-h-[62px] justify-center items-center ${containerStyles}`} // NativeWind Tailwind class
    onPress={handlePress}
    activeOpacity={0.7}
  >
    <Text className={`text-purple-50 ${textStyles}`}>{title}</Text>
  </TouchableOpacity>
  );
};

export default CustomButton;
