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
    }
    else{
      setShowOptions(false);
    }
  };

  const contains = (item, query) => {
    if (item.name.includes(query)) {
      setShowOptions(true)
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
  function imageFromSupermarket(storePrices) {
    // console.log("Inside function ", storePrices.carrefour.productImageLink);
    return storePrices.carrefour.productImageLink;
  }

  function findLowestPrice(storePrices) {
    // console.log("Inside function ",storePrices.carrefour.price);
    return Math.min(
      storePrices.carrefour.price,
      storePrices.danube.price,
      storePrices.tamimi.price
    );
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
            setQuerySearched(e);
          }}
          placeholder="Search..."
          textAlign="left"
          autoComplete="additional-name"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          color="gray"
          onSubmitEditing={(e) => {
            handleSearch(e);
          }}
        />
      </View>
      {showOptions ? (
        <View
          className="bg-white absolute top-[80%] w-full h-30 z-4 p-5 border-1 rounded-md"
          style={{ zIndex: 100 }}
        >
          (
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
                    className="w-10 h-10"
                    resizeMethod="cover"
                  />
                  <Text className="text-center text-sm ">{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          )
        </View>
      ) : null}
    </View>
  );
};

export default SearchInput;
