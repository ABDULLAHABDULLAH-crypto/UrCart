import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/searchInput";
import Product from "../../components/Product";
import Category from "../../components/Category";
import { useNavigation } from '@react-navigation/native';


const home = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (categoryName, data) => {
    navigation.navigate('Category', { categoryName, data });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="mt-[-60px]">
        <SafeAreaView className="px-4 ">

          <SearchInput />

          {/* Last Searched Items */}
          <View className=" px-4 ">
            <Text className="font-pbold my-5 ">Last Searched</Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex-row w-full "
            >
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

          {/* Categories */}
          <View className="mt-2 px-4 ">
            <Text className="font-pbold my-5 ">Category</Text>

            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => handleCategoryPress('Beverages & Water')}
                className="w-28 mb-4"
              >
                <Category
                  categoryName="Beverages & Water"
                  imageSource={require("../../assets/images/beverages 1.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Meat', meatData)} // Pass meatData here
                className="w-28 mb-4"
              >
                <Category
                  categoryName="Meat"
                  imageSource={require("../../assets/images/meats 1.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Dairy & Eggs')}
                className="w-28 mb-4"
              >
                <Category
                  categoryName="Dairy & Eggs"
                  imageSource={require("../../assets/images/Eggs.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Fruits & Vegs')}
                className="w-28 mb-4"
              >
                <Category
                  categoryName="Fruits & Vegs"
                  imageSource={require("../../assets/images/1.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Bakery')}
                className="w-28 mb-4"
              >
                <Category
                  categoryName="Bakery"
                  imageSource={require("../../assets/images/bakery 1.png")}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default home;
