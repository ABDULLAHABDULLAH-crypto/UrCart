import { View, Text, TouchableOpacity,Pressable } from "react-native";
import React from "react";
// className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
// disabled={isLoading}
// onPress={handlePress}
// activeOpacity={0.7}
const CustomButton = ({
  handlePress,
  title,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity  
    className={`bg-primary rounded-lg min-h-[62px]  justify-center items-center ${containerStyles}`}
    disabled={isLoading}
    onPress={handlePress}
    activeOpacity={0.7}
    >
      <Text className={`text-purple-50 ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
