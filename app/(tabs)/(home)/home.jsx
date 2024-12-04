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
  const { cartCount } = useGlobalContext();
  const [products, setProducts] = useState([]);

  function findLowestPrice(storePrices) {
    return Math.min(...Object.values(storePrices || {}));
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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
      <Text className="font-pregular my-5">Last Searched</Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            name={item.name}
            price={findLowestPrice(item.price)}
            image={item.imageSource}
            description={item.description}
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
            img: require("../../../assets/images/beverages 1.png"),
          },
          {
            name: "Meets",
            img: require("../../../assets/images/meats 1.png"),
          },
          {
            name: "Dairy & Eggs",
            img: require("../../../assets/images/Eggs.png"),
          },
          {
            name: "Fruit & Veg",
            img: require("../../../assets/images/1.png"),
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
    <SafeAreaView style={{ flex: 1,paddingTop: 0,marginTop:-70, }}>
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
            <View className="absolute bottom-5 left-3 bg-white rounded-3xl w-7 h-7 align-middle">
              <Text className="text-black font-pmedium p-[3px]">
                {cartCount}
              </Text>
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
