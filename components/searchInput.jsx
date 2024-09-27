import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const SearchInput = ({ text,placeholder,handleChangeText }) => {
  return (
    <View className="border-2 border-gray-400 w-full h-12 px-2 bg-slate-100 rounded-2xl
     focus:border-primary-100 items-center flex-row space-x-4">
        
        <TouchableOpacity>
            <Feather
            name="search"
            className="w-10 h-10"
            size="20px"
            />
        </TouchableOpacity>
        <TextInput
        className="text-base mt-0.5 text-black-100 flex-1"
        value={text}
        placeholder={placeholder}
        placeholderTextColor="gray"
        onChangeText={handleChangeText}
        
        />
            <TouchableOpacity>
            <Feather
            name="filter"
            className="w-10 h-10"
            size="20px"
            />
        </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
