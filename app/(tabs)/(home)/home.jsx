import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../../components/searchInput";
import Product from "../../../components/Product";
import Category from "../../../components/Category";
import { router } from "expo-router";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const { cartCount,cart } = useGlobalContext();
  const [products, setProducts] = useState([]);

  function getRandomeProduct(arr,num){
    const RandomArray=arr.slice(0);

    let i=arr.length;
    let temp,index;

    while(i--){

      index = Math.floor(Math.random() * (i+1));
      temp=RandomArray[i];
      RandomArray[i]=RandomArray[index];
      RandomArray[index]=temp;
    }
    
    return RandomArray.slice(0,num);
  }

  function findLowestPrice(storePrices) {
    // console.log("Inside function ",storePrices.carrefour.price);
    return Math.min(storePrices.carrefour.price,storePrices.danube.price,storePrices.tamimi.price);
  }
  function imageFromSupermarket(storePrices) {
    // console.log("Inside function ",storePrices.carrefour.price);
    return storePrices.carrefour.productImageLink;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products2.0"));
        const productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id, });
          
        });

        setProducts(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  // console.log(products)
  const renderHeader = () => (
    <>
      {/* Banner */}
      <View className="w-full  p-4 border-collapse rounded-3xl">
        <View className="flex-row bg-primary h-52 border-collapse rounded-3xl items-center p-4">
          <Text className="font-pregular text-xl text-slate-100 w-1/2 pr-4 text-justify">
            All Supermarkets Prices In One App
          </Text>
          <Image
            source={require("../../../assets/images/banner.png")}
            resizeMode="contain"
            className="w-1/2 h-full"
          />
        </View>
      </View>
    </>
  );
  
  const renderLastSearched = () => (
    <View className="px-4">
      <Text className="font-pregular my-5">Selected Products</Text>
      <FlatList
        data={getRandomeProduct(products,15)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            name={item.name}
            price={findLowestPrice(item.stores)}
            image={imageFromSupermarket(item.stores)}
            description={item.description}
            quantity={item.quantity??0}
          />
        )}
      />
    </View>
  );

  const renderCategories = () => (
    <View className="mt-2 px-4">
      <Text className="font-pregular my-5">Category</Text>
      <FlatList
        data={[
          {
            name: "Beverages & Water",
            img: require("../../../assets/images/A glass of juice with different juices on a wooden table..png"),
          },
          {
            name: "Meets",
            img: require("../../../assets/images/meats 1.png"),
          },
          {
            name: "Dairy",
            img: require("../../../assets/images/Eggs.png"),
          },
          {
            name: "Fruit & Veg",
            img: require("../../../assets/images/Vegetables with pepper inside a bowl (2).png"),
          },
          {
            name: "Bakery",
            img: require("../../../assets/images/bakery 1.png"),
          },
        ]}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Category
            categoryName={item.name}
            imageSource={item.img}
            className="w-1/2"
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
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: -70 }}>
      {/* <StatusBar /> */}
      {/* Search Bar */}
      <View className="flex-row items-center px-4 bg-primary border-1 rounded-bl-3xl rounded-br-3xl">
        <SearchInput />
        <TouchableOpacity onPress={{}} className="px-6">
          <Image
            source={require("../../../assets/images/ShoppingCart.png")}
            resizeMode="cover"
            className="h-10 w-8"
          />
          {cartCount > 0 && (
            <View className="absolute bottom-5 left-3 bg-white rounded-3xl w-7 h-7 items-center justify-center">
              <Text className="text-black font-pmedium">{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={renderHeader}
        data={[{ key: "lastSearched" }, { key: "categories" }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          if (item.key === "lastSearched") {
            return renderLastSearched();
          }
          if (item.key === "categories") {
            return renderCategories();
          }
          return null;
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
