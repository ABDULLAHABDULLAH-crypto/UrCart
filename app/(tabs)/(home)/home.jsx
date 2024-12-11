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
  const { cartCount, cart } = useGlobalContext();
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);


  function getRandomeProduct(arr, num) {
    const RandomArray = arr.slice(0);

    let i = arr.length;
    let temp, index;

    while (i--) {
      index = Math.floor(Math.random() * (i + 1));
      temp = RandomArray[i];
      RandomArray[i] = RandomArray[index];
      RandomArray[index] = temp;
    }

    return RandomArray.slice(0, num);
  }

  function findLowestPrice(storePrices) {
    // console.log("Inside function ", storePrices);

    // Initialize prices, using Infinity as the default when a store is null
    const carrefourPrice = storePrices.carrefour ? storePrices.carrefour.price : Infinity;
    const danubePrice = storePrices.danube ? storePrices.danube.price : Infinity;
    const tamimiPrice = storePrices.tamimi ? storePrices.tamimi.price : Infinity;
  
    // Return the minimum price, excluding any that are Infinity
    return Math.min(carrefourPrice, danubePrice, tamimiPrice);
  }
  function imageFromSupermarket(storePrices) {

      if(storePrices.carrefour != null){
        return storePrices.carrefour.productImageLink; 
      }
      if(storePrices.danube != null){
        return storePrices.danube.productImageLink; 
      }
      if(storePrices.tamimi != null){
        return storePrices.tamimi.productImageLink; 
      }

    return "https://via.placeholder.com/100" ;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products2.0"));
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
      <Text className="font-pregular my-5">Selected Products</Text>
      <FlatList
        data={getRandomeProduct(products, 15)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            name={item.name}
            price={findLowestPrice(item.stores)}
            image={imageFromSupermarket(item.stores)}
            prices={item.stores}
            description={item.description}
            quantity={item.quantity ?? 0}
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
            name: "HairCare",
            img: require("../../../assets/images/Bottles of shampoo and conditioner lie with towel and comb on wooden table .png"),
          },
          {
            name: "CannedFood",
            img: require("../../../assets/images/Top view food packaged in cans  .png"),
          },
          {
            name: "Dairy",
            img: require("../../../assets/images/Milk products .png"),
          },
          {
            name: "Coffee",
            img: require("../../../assets/images/Coffee beans .jpg"),
          },  
          {
            name: "FrozenFood",
            img: require("../../../assets/images/Flat lay arrangement of frozen food.png"),
          },
          
        ]}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Category
            categoryName={item.name}
            imageSource={item.img}
            className="w-3/4"
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
      <View className="flex-row items-center px-4 bg-primary border-1 rounded-bl-3xl rounded-br-3xl ">
        <SearchInput />
        <TouchableOpacity
          onPress={() => setShowCart(!showCart)}
          className="px-6"
        >
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
        {showCart ? (
          <View
            className="absolute top-[70%] right-[5%] h-72 w-full bg-white border-1 rounded-xl "
            style={{ zIndex: 2000 }}
          >
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="flex flex-row border-b-2 border-gray-400 items-center justify-between p-3">
                  <Image
                    source={{ uri: imageFromSupermarket(item.stores) }}
                    className={`w-10 h-10 mx-2  `}
                    resizeMode="contain"
                  />
                  <Text className="text-xs">{item.name}</Text>
                  <Text className="text-gray-400 text-xs">
                    Quanitiy: {item.quantity}
                  </Text>
                </View>
              )}
            />
         
              <View className=" flex items-center p-2">
                <TouchableOpacity onPress={() => {router.push("/cart");}} className="bg-primary h-10 w-40 flex items-center text-center bottom-0 rounded-lg"><Text className="text-white p-2">View Cart</Text></TouchableOpacity>
                
              </View>
            
          </View>
        ) : (
          ""
        )}
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
