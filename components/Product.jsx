import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
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
import CustomAlert from "./CustomAlert";

const Product = ({ name, price, descreption, image,quantity,prices }) => {
  

  const { userId } = useGlobalContext(); // Access userId from context
  const { cart, cartCount, increaseCart, addItemToCart } = useGlobalContext();
  // Create a product object to be added
  const product = {
    name: name,
    descreption: descreption,
    price: price,
    prices:prices,
    image: image,
    quantity:quantity
  };
  const [alertVisible, setAlertVisible] = useState(false);
  // Add product to user's cart in Firestore
  const AddProduct = async () => {
    try {
 
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

  function ProductPrices(storePrices){
    const carrefourPrice = storePrices.carrefour ? storePrices.carrefour.price : Infinity;
    const danubePrice = storePrices.danube ? storePrices.danube.price : Infinity;
    const tamimiPrice = storePrices.tamimi ? storePrices.tamimi.price : Infinity;
     
    return [carrefourPrice ,danubePrice,tamimiPrice]
  }

  const handleClickForProduct = () => {
    router.push({
      pathname: "ProductPage",
      params: {
        name: name,
        price: price || 0,
        description: descreption,
        imageSource: image,
        prices:ProductPrices(prices),
        quantity:quantity
      },
    });
  };
  return (
    <View
      className={`flex-1 w-[150px] overflow-hidden ml-2 flex-col  border border-slate-400 rounded-md items-center shadow-white bg-white`}
    >
      {/* Product Image Section */}
      <View className={`h-28 w-full relative flex-1`}>
        {/* Background Decoration */}
        <View className={`absolute top-0 left-0 h-24 w-24 rounded-lg`} />

        {/* Product Icon */}
        <TouchableOpacity onPress={handleClickForProduct}>
          <Image
            className={`w-[80%] h-full mx-4 `}
            resizeMode="contain"
            source={{ uri: image }}
          />
        </TouchableOpacity>
      </View>

      {/* Product Description */}
      <View className={`m-2 gap-2 flex-2`}>
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
          className={`bg-primary m-5 border-2 flex-3 border-primary flex-row rounded-xl shadow-sm h-10 w-24 items-center justify-center`}
        >
          <Text className="text-white text-xs">Add to Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
