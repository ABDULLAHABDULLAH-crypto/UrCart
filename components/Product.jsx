import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Added arrayUnion for cart
import { useGlobalContext } from "../Context/GlobalContext";
import { ProductData } from "../Data/ProductData";
const Product = ({ name, price, descreption, image,quantity }) => {
  const { userId } = useGlobalContext(); // Access userId from context
  const { cart, cartCount, increaseCart, addItemToCart } = useGlobalContext();
  // Create a product object to be added
  const product = {
    name: name,
    descreption: descreption,
    price: price,
    image: image,
    quantity:quantity
  };

  // Add product to user's cart in Firestore
  const AddProduct = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available. Ensure user is signed in.");
        return;
      }

      // Reference to the user's document based on userId
      const userRef = doc(db, "users", userId);

      // Fetching the product based on its name
      const productsRef = collection(db, "Products2.0");
      const q = query(productsRef, where("name", "==", product.name));
      const querySnapshot = await getDocs(q);
      let productData = null; // Variable to store the complete product data

      querySnapshot.forEach((doc) => {
        productData = { id: doc.id, ...doc.data() }; // Including the product ID and all other product data
      });

      if (productData) {
        // console.log("Product data retrieved: ", productData);
        addItemToCart(productData); // Add the complete product data to the cart
      } else {
        console.log("No product found with name:", product.name);
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };

  
  const handleClickForProduct = () => {
    router.push({
      pathname: "ProductPage",
      params: {
        name: name,
        price: price,
        description: descreption,
        imageSource: image,
        quantity:quantity
      },
    });
  };
  return (
    <View
      className={`flex-1 w-full overflow-hidden ml-2  border border-slate-400 rounded-md items-center shadow-white`}
    >
      {/* Product Image Section */}
      <View className={`h-28 w-full relative`}>
        {/* Background Decoration */}
        <View className={`absolute top-0 left-0 h-24 w-24 rounded-lg`} />

        {/* Product Icon */}
        <TouchableOpacity onPress={handleClickForProduct}>
          <Image
            className={`w-[80%] h-20 mx-4`}
            resizeMode="cover"
            source={{ uri: image }}
          />
        </TouchableOpacity>
      </View>

      {/* Product Description */}
      <View className={`m-2 gap-2`}>
        <Text className="text-[#262626] font-light text-[11px] text-left w-25">
          {name}
        </Text>
        <Text className={`text-left w-25`}>
          <Text className={`font-medium text-[12px] text-[#000]`}>
            Start Prices {price} SAR
          </Text>
        </Text>
      </View>

      {/* Add to Cart Button */}
      
      <TouchableOpacity onPress={AddProduct}>
        <View
          className={`bg-primary m-4 border-2 border-primary flex-row rounded-xl shadow-sm h-10 w-24 items-center justify-center`}
        >
          <Text className="text-white text-xs">Add to Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
