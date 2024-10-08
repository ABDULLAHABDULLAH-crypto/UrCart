import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import CustomButton from "./CustomButton";

const FromField = ({ Title, placeholder,keyboardType,otherStyles,handleChangeText }) => {
    
    const [showPass, setShowPass] = useState(false);

  return (
    <View className="space-y-2 mt-7 px-4">
      <Text className="text-left font-pregular">{Title}</Text>

      <View className="bg-slate-100 border-2 px-4 border-white w-full h-16 rounded-2xl focus:border-primary flex-row items-center">
      <TextInput
      className={`flex-1 text-black font-psemibold px-2`}
      placeholder={placeholder} keyboardType={keyboardType} onChangeText={handleChangeText} onChange={handleChangeText} secureTextEntry={(Title ==="Passowrd"||Title==="Confirm Passowrd")&&!showPass }/>
      {(Title ==="Passowrd"||Title==="Confirm Passowrd") && (<TouchableOpacity onPress={()=> setShowPass(!showPass)} >
      <Image
            source={!showPass ?icons.eye:icons.eyeHide}
            resizeMode="cover"
            className="h-4 w-4 "
            />
        </TouchableOpacity>)}
      </View>
        
     
    </View>
  );
};
export default FromField;
