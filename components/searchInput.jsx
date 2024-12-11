import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import {
  doc,
  setDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import filter from "lodash.filter";

const SearchInput = ({ text, placeholder, handleChangeText }) => {
  const pathname = usePathname();
  const [querySearched, setQuerySearched] = useState("");
  const [product, setProduct] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Define an asynchronous function inside the useEffect
    const fetchProduct = async () => {
      // Only run the query if there's a search term
      const productsRef = collection(db, "Products2.0");

      const querySnapshot = await getDocs(collection(db, "Products2.0"));
      const products = []; // Use an array to handle potentially multiple products

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() }); // Include the product ID and all other product data
      });

      setProduct(products); // Set the state to the fetched products
    };

    fetchProduct(); // Execute the function defined above
  }, [querySearched]);
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

    return lowestPrice; // Return the lowest price found
  }

  const handleSearch = (querySearched) => {
    if (querySearched.length > 1) {
      setQuerySearched(querySearched);
      const formatedQuery = querySearched;
      const filterData = filter(product, (item) => {
        return contains(item, formatedQuery);
      });
      setProduct(filterData);
    } else {
      setShowOptions(false);
    }
  };
  function ProductPrices(storePrices){
    const carrefourPrice = storePrices.carrefour ? storePrices.carrefour.price : Infinity;
    const danubePrice = storePrices.danube ? storePrices.danube.price : Infinity;
    const tamimiPrice = storePrices.tamimi ? storePrices.tamimi.price : Infinity;
     
    return [carrefourPrice ,danubePrice,tamimiPrice]
  }

  const contains = (item, query) => {
    if (item.name.includes(query)) {
      setShowOptions(true);
      return true;
    }
    // setShowOptions(false);
    return false;
  };
  const handleClickForProduct = (product) => {
    router.push({
      pathname: "ProductPage",
      params: {
        name: product[0].name,
        price: findLowestPrice(product[0].price),
        descreption: product[0].descreption,
        imageSource: product[0].imageSource,
      },
    });
  };
  function findLowestPrice(storePrices) {
    // console.log("Inside function ", storePrices);

    // Initialize prices, using Infinity as the default when a store is null
    const carrefourPrice = storePrices.carrefour
      ? storePrices.carrefour.price
      : Infinity;
    const danubePrice = storePrices.danube
      ? storePrices.danube.price
      : Infinity;
    const tamimiPrice = storePrices.tamimi
      ? storePrices.tamimi.price
      : Infinity;

    // Return the minimum price, excluding any that are Infinity
    return Math.min(carrefourPrice, danubePrice, tamimiPrice);
  }
  function imageFromSupermarket(storePrices) {
    if (storePrices.carrefour != null) {
      return storePrices.carrefour.productImageLink;
    }
    if (storePrices.danube != null) {
      return storePrices.danube.productImageLink;
    }
    if (storePrices.tamimi != null) {
      return storePrices.tamimi.productImageLink;
    }

    return "https://via.placeholder.com/100";
  }
  return (
    <View>
      <View
        className="border-2 border-gray-400 w-[350px] h-14  px-3  bg-[#EDEDED] rounded-2xl
     focus:border-primary-100 items-center flex-row space-x-4 my-8"
      >
        <TouchableOpacity
          onPress={() => {
            if (!querySearched) {
              return Alert.alert(
                "Missing query",
                "Please input something to search result across database"
              );
            }
            if (pathname.startsWith("/search"))
              router.setParams({ querySearched });
            else handleSearch(querySearched);
          }}
        >
          <Feather name="search" className="w-10 h-8" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          className="text-base mt-0.5 text-black-100 flex-1 h-20"
          value={text}
          placeholderTextColor="gray"
          onChangeText={(e) => {
            handleSearch(e);
            setQuerySearched(e);
          }}
          placeholder={placeholder || "Search..."}
          textAlign="left"
          clearButtonMode="always"
          autoCapitalize="words"
          autoCorrect={false}
          color="gray"
          onSubmitEditing={(event) => {
            handleSearch(event.nativeEvent.text);
          }}
        />
      </View>
      {showOptions && (
        <View
          className="bg-white absolute top-[80%] w-full h-30 z-4 p-5 border-1 rounded-md"
          style={{ zIndex: 100 }}
        >
          <FlatList
            data={product}
            
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  {
                    router.push({
                      pathname: "ProductPage",
                      params: {
                        name: item.name,
                        price: findLowestPrice(item.stores),
                        prices: ProductPrices(item.stores),
                        description: item.descreption,
                        imageSource: imageFromSupermarket(item.stores),
                      },
                    });
                  }
                }}
              >
                <View className="flex-row items-center align-middle  p-2">
                  <Image
                    source={{ uri: imageFromSupermarket(item.stores) }}
                    className="w-12 h-12"
                    resizeMethod="cover"
                  />

                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SearchInput;
