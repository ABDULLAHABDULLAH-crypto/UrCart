import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useGlobalContext } from "../../../Context/GlobalContext";
import ImagePopup from "../../../components/ImagePopUp";

const Product = () => {
  const { name, price, descreption, imageSource, prices } =
    useLocalSearchParams();
  const NewItems = prices.split(",").map((item) => item.trim());

  const [quantity, setQuantity] = useState(1);
  const { userId, cart, increaseCart, removeItemFromCart, addItemToCart } =
    useGlobalContext();

  const AddProduct = async () => {
    try {
      if (!userId) {
        Alert.alert("Please SignIn");
        return;
      }

      // Reference to the user's document based on userId
      const userRef = doc(db, "users", userId);

      // Fetching the product based on its name
      const productsRef = collection(db, "Products2.0");
      const q = query(productsRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);
      let productData = null; // Variable to store the complete product data

      querySnapshot.forEach((doc) => {
        productData = { id: doc.id, ...doc.data() }; // Including the product ID and all other product data
      });

      if (productData) {
        // console.log("Product data retrieved: ", productData);
        addItemToCart(productData, quantity); // Add the complete product data to the cart
      } else {
        console.log("No product found with name:", name);
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };
  const incQuantity = () => setQuantity((prev) => prev + 1);

  const decQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Prevent quantity from going below 1
  const [fullimage, setFullImage] = useState(false);
  return (
    <View className="p-6 bg-white h-full">
      <View className="h-1/2">
        <TouchableOpacity onPress={() => setFullImage(true)}>
          <Image
            source={{ uri: imageSource }}
            resizeMode="cover"
            className="w-full h-[100%]"
          />
          <ImagePopup
            visible={fullimage}
            imageUrl={imageSource}
            onClose={() => {
              setFullImage(false);
            }}
          />
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <Text className="text-3xl text-slate-500">{name}</Text>
        <Text className="text-1xl text-slate-500 py-2"> {descreption}</Text>
      </View>
      <View className="flex flex-row p-2 justify-between items-center">
        <Image
          source={{
            uri: "https://streetkitchen.co/wp-content/uploads/2020/06/carrefour-logo-1-1.png",
          }}
          className="w-[80px] h-[50px] "
          resizeMode="contain"
        />
        <Text>{NewItems[0]} SR</Text>
      </View>
      <View className="flex flex-row p-2 justify-between items-center">
        <Image
          source={{
            uri: "https://iconape.com/wp-content/files/zq/369732/png/369732.png",
          }}
          className="w-[80px] h-[50px] "
          resizeMode="contain"
        />
        <Text>{NewItems[1]} SR</Text>
      </View>
      <View className="flex flex-row p-2 justify-between items-center">
        <Image
          source={{
            uri: "https://cdn.wowdeals.me/uploads/images/companies/85/logo/330x150/1552857294.png",
          }}
          className="w-[80px] h-[50px] "
          resizeMode="contain"
        />
        <Text>{NewItems[2]} SR</Text>
      </View>
      <View>
        <View className="flex justify-center items-center flex-row ">
          <View className="flex flex-row border rounded-3xl justify-center w-48 p-3">
            <TouchableOpacity onPress={decQuantity}>
              <Image
                resizeMode="cover"
                source={require("../../../assets/images/MinusProduct.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>

            <Text className="text-2xl mb-2 px-5">{quantity}</Text>

            <TouchableOpacity onPress={incQuantity}>
              <Image
                resizeMode="cover"
                source={require("../../../assets/images/AddProduct.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="border rounded-3xl bg-primary m-2"
            onPress={AddProduct}
          >
            <Text className="text-1xl text-white p-6">Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Product;
