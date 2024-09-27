import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/searchInput";
import { Feather } from "@expo/vector-icons";
import { Select, SelectItem } from "@ui-kitten/components";

const home = () => {
  return (
    <SafeAreaView className="m-5 max-h-full ">
    
      <SearchInput/>
      
      <View>
        <Text>Here Will the Items</Text>
      </View>

      <View>
        <Text> Here Will be the catigroies </Text>
      </View>
    </SafeAreaView>
  );
};

export default home;
