import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const SearchInput = ({ text,placeholder,handleChangeText }) => {
  return (
    <View className="border-2 border-gray-400 w-full h-16 px-2 bg-[#EDEDED] rounded-2xl
     focus:border-primary-100 items-center flex-row space-x-4 my-10">
        
        <TouchableOpacity>
            <Feather
            name="search"
            className="w-10 h-10 bg-white"
            size="24px"
            color="gray"
            
            
            />
        </TouchableOpacity>
        <TextInput
        className="text-base mt-0.5 text-black-100 flex-1"
        value={text}
        placeholderTextColor="gray"
        onChangeText={handleChangeText}
        placeholder="Search..."
        textAlign="left"
        autoComplete="additional-name"
        autoCorrect="true"
        color="gray"
        />
            <TouchableOpacity>
            <Feather
            name="filter"
            color="gray"
            className="w-10 h-10"
            size="24px"
            />
        </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
