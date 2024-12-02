import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../../components/searchInput";
import Product from "../../../components/Product";
import Category from "../../../components/Category";
import { router } from "expo-router";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { ProductData } from "../../../Data/ProductData";
import getProducts from "../../../fetchData/GetProducts";
const home =  ()  => {
  const { cartCount, increaseCart } = useGlobalContext();
  const [products,setProducts]=useState([]);
    
  function findLowestPrice(storePrices) {
    let lowestPrice = Infinity;
  
    // Loop through each value in the storePrices object
    for (const store in storePrices) {
      const price = storePrices[store];
      // Update the lowestPrice if the current price is lower
      if (price < lowestPrice) {
        lowestPrice = price;
      }
    }
  
    return lowestPrice;
  }
     useEffect(()=>{
      
      const fetchProducts = async () => {
        const productData = await getProducts(); // Fetch products
        const productArray = []; // Temporary array to hold products
        productData.forEach((data) => {
          productArray.push(data); 
          // console.log(data);// Add each product to the array
        });
         setProducts(productArray); // Update state with fetched products
      };
      // console.log("Products " +products)
       fetchProducts(); //
    },[])
  return (
    <>
      <StatusBar barStyle="dark-content" />
    
        <SafeAreaView className="px-4">
          {/* <SearchInput /> */}

          {/* Last Search Items */}
          <View className="px-4">
            <Text className="font-pbold my-5">Last Searched</Text>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                
                <Product
                  name={item.name}
                  price={findLowestPrice(item.price)}
                  image={item.imageSource}

                  
                />
              )}
            />
          </View>

          {/* Categories */}
          <View className="mt-2 px-4">
            <Text className="font-pbold my-5">Category</Text>
            <FlatList
              data={[
                { name: "Beverages & Water", img: require("../../../assets/images/beverages 1.png") },
                { name: "Meets", img: require("../../../assets/images/meats 1.png") },
                { name: "Dairy & Eggs", img: require("../../../assets/images/Eggs.png") },
                { name: "Fruit & Veg", img: require("../../../assets/images/1.png") },
                { name: "Bakery", img: require("../../../assets/images/bakery 1.png") },
              ]}
              numColumns={3}
              key={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Category
                  categoryName={item.name}
                  imageSource={item.img}
                  onPress={() =>
                    router.push({
                      pathname: `/category/${item.name}`,
                      params: { categoryName: item.name },
                    })
                  }
                />
              )}
            />
          </View>
        </SafeAreaView>
      
    </>
  );
};

export default home;
