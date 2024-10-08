import {
  View,
  Text,
  ScrollView,
  
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../../components/searchInput";
import Product from "../../../components/Product";
import Category from "../../../components/Category";
import { Link, router, useNavigation } from "expo-router";

const home = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <ScrollView className="mt-[-60px] bg-white">
    <SafeAreaView className="px-4 ">
      
      <SearchInput />
        {/* //This View will for Last Search Items */}
        <View className=" px-4 ">
          <Text className="font-pbold my-5 ">Last Searched</Text>
  
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="flex-row  w-full "
          >
            <Product
              description="Tomato By 1 Kg"
              price="SAR 6.99"
              imageSource={require("../../../assets/images/Tomato.png")}
            />
            <Product
              description="Tomato By 1 Kg"
              price="SAR 6.99"
              imageSource={require("../../../assets/images/Tomato.png")}
            />
            <Product
              description="Tomato By 1 Kg"
              price="SAR 6.99"
              imageSource={require("../../../assets/images/Tomato.png")}
            />
            <Product
              description="Tomato By 1 Kg"
              price="SAR 6.99"
              imageSource={require("../../../assets/images/Tomato.png")}
            />
            <Product
              description="Tomato By 1 Kg"
              price="SAR 6.99"
              imageSource={require("../../../assets/images/Tomato.png")}
            />
          </ScrollView>
        </View>
  
        <View className="mt-2 px-4 ">
          <Text className="font-pbold my-5 ">Category</Text>
  
          <ScrollView className=" w-full h-full ">
            <View className="flex-row row-start-auto items-center text-center flex-wrap h-44 gap-3">
              <Category
                categoryName="Beverages & Water"
                imageSource={require("../../../assets/images/beverages 1.png")}
                onPress={()=>
                  router.push({
                    pathname:"/category/Beverages & Water",
                    params:{categoryName:"Beverages & Water"}
                  })
                }
              />
              
              
              <Category
                categoryName="Meets"
                imageSource={require("../../../assets/images/meats 1.png")}
              />
              <Category
                categoryName="Dairy & Eggs"
                imageSource={require("../../../assets/images/Eggs.png")}
              />
              <Category
                categoryName="Fruit & Veg"
                imageSource={require("../../../assets/images/1.png")}
              />
              <Category
                categoryName="Bakery"
                imageSource={require("../../../assets/images/bakery 1.png")}
              />
              
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
    </>
  
  );
};

export default home;