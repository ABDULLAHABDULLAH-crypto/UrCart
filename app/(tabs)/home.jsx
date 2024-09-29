import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/searchInput";
import { Feather } from "@expo/vector-icons";
import { Select, SelectItem } from "@ui-kitten/components";
import Product from "../../components/Product";
import Category from "../../components/Category";

const home = () => {
  return (
    <SafeAreaView className="m-5 max-h-full ">
      <SearchInput />


      {/* //This View will for Last Search Items */}
      <View className="my-5 px-4 ">
        <Text className="font-pbold my-5 ">Last Searched</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-row  w-full ">
          
            <Product
            description="Tomato By 1 Kg"
            price="SAR 6.99"
            imageSource={require("../../assets/images/Tomato.png")}
            />
             <Product
            description="Tomato By 1 Kg"
            price="SAR 6.99"
            imageSource={require("../../assets/images/Tomato.png")}
            />
             <Product
            description="Tomato By 1 Kg"
            price="SAR 6.99"
            imageSource={require("../../assets/images/Tomato.png")}
            />
            <Product
            description="Tomato By 1 Kg"
            price="SAR 6.99"
            imageSource={require("../../assets/images/Tomato.png")}
            />
            <Product
            description="Tomato By 1 Kg"
            price="SAR 6.99"
            imageSource={require("../../assets/images/Tomato.png")}
            />
          
        </ScrollView>
      </View>

      <View className="my-10 px-4 ">
        <Text className="font-pbold my-5 ">Category</Text>

        <ScrollView className=" w-full ">
          
          <View className="flex-shrink-0">
          <Category
            categoryName="Meets"
            imageSource={require("../../assets/images/meats 1.png")}
            />
          <Category
            categoryName="Meets"
            imageSource={require("../../assets/images/meats 1.png")}
            />
            <Category
            categoryName="Meets"
            imageSource={require("../../assets/images/meats 1.png")}
            />
            <Category
            categoryName="Meets"
            imageSource={require("../../assets/images/meats 1.png")}
            />

          </View>
  
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default home;
