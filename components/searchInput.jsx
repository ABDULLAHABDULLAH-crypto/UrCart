import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
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

const SearchInput = ({ text, placeholder, handleChangeText }) => {
  const pathname = usePathname();
  const [querySearched, setQuerySearched] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Define an asynchronous function inside the useEffect
    const fetchProduct = async () => {
      // Only run the query if there's a search term
      const productsRef = collection(db, "Products");

      const q = query(productsRef, where("name", "==", querySearched));
      const querySnapshot = await getDocs(q);
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

  return (
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
          else handleClickForProduct(product);
        }}
      >
        <Feather name="search" className="w-10 h-8" size={24} color="gray" />
      </TouchableOpacity>
      <TextInput
        className="text-base mt-0.5 text-black-100 flex-1 h-20"
        value={text}
        placeholderTextColor="gray"
        onChangeText={(e) => setQuerySearched(e)}
        placeholder="Search..."
        textAlign="left"
        autoComplete="additional-name"
        autoCorrect={true}
        color="gray"
        onSubmitEditing={()=>{handleClickForProduct(product)}}
      />
    
    </View>
  );
};

export default SearchInput;
