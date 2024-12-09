import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useGlobalContext } from "../../../Context/GlobalContext";
import ImagePopup from "../../../components/ImagePopUp";

const Product = () => {
  const { name, price, descreption, imageSource } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { userId, cart, increaseCart, removeItemFromCart, addItemToCart } =
    useGlobalContext();

  const AddProduct = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available. Ensure user is signed in.");
        return;
      }

      // Reference to the user's document based on userId
      const userRef = doc(db, "users", userId);

      // Fetching the product based on its name
      const productsRef = collection(db, "Products");
      const q = query(productsRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);
      let productData = null; // Variable to store the complete product data

      querySnapshot.forEach((doc) => {
        productData = { id: doc.id, ...doc.data() }; // Including the product ID and all other product data
      });

      if (productData) {
        console.log("Product data retrieved: ", productData);
        console.log("Quantity From Product Page", quantity);
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
   const [fullimage,setFullImage]=useState(false);
  return (
    <View className="flex px-6 pt-6 bg-white h-full">
      <View className="h-1/2">
        <TouchableOpacity onPress={()=>setFullImage(true)}>
        <Image
          source={{ uri: imageSource }}
          resizeMode="cover"
          className="w-full h-[100%]"
        />
        <ImagePopup
        visible={fullimage}
        imageUrl={imageSource}
        onClose={()=>{setFullImage(false)}}
        />
        </TouchableOpacity>
       
      </View>
      <View className="p-5">
        <Text className="text-3xl text-slate-500">{name}</Text>
        <Text className="text-1xl text-slate-500 py-2"> {descreption}</Text>
      </View>
      <View className="flex flex-row p-5 justify-between">
        <Text className="text-3xl text-slate-500">Price Start From </Text>
        <Text className="text-3xl text-green-600">SAR {price}</Text>
      </View>

      <View>
        <View className="flex justify-center items-center flex-row mt-8">
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
