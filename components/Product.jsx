  import { View, Text, TouchableOpacity, Image } from "react-native";
  import React, { useEffect, useState } from "react";
  import { router } from "expo-router";
  import { db } from "../firebaseConfig";
  import { doc, setDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore"; // Added arrayUnion for cart
  import { useGlobalContext } from "../Context/GlobalContext";
  import { ProductData } from "../Data/ProductData";
  const Product = ({ price, description, image }) => {
    const { userId } = useGlobalContext(); // Access userId from context
    const { cart,cartCount, increaseCart, addItemToCart } = useGlobalContext();
    // Create a product object to be added
    const product = {
      description: description,
      price: price,
      image: image,
    };
    
    console.log("Product name "+ description+ "The image "+image)
    // Add product to user's cart in Firestore
    const AddProduct = async () => {
      try {
        if (!userId) {
          console.error("User ID is not available. Ensure user is signed in.");
          return;
        }

        // Reference to the user's document based on userId
        const userRef = doc(db, "users", userId);

        // Update the cart array for the user with the new product
        const productsRef = collection(db, "Products");
        const q = query(
          productsRef,
          where("name", "==",product.description ),
        );
        const querySnapshot = await getDocs(q);
        let productId="";
        querySnapshot.forEach ((doc) => {
           productId=doc.id;
        });
        // console.log("Product Id before added to firestore "+productId);
        addItemToCart(productId);
        console.log("cart item"+ cart);

        increaseCart(1);
      } catch (error) {
        console.error("Error adding product to cart: ", error);
      }
    };

    const handleClickForProduct = () => {
      router.push({
        pathname: "ProductPage",
        params: {
          price: price,
          description: description,
          imageSource: image,
        },
      });
    };
    return (
      <View className={`flex-1 w-full overflow-hidden mr-4`}>
        <View className={`h-24 w-24 relative`}>
          {/* Background */}
          <View
            className={`absolute top-0 left-0 h-24 w-24 rounded-lg bg-[#f7f7f7]`}
          />

          {/* Add Item Button */}
          <View
            className={`absolute top-14 left-14 bg-white flex-row p-1.5 rounded shadow-md`}
          >
            <TouchableOpacity onPress={AddProduct}>
              <Image
                className={`w-6 h-6`}
                resizeMode="cover"
                source={require("../assets/images/add.png")}
              />
            </TouchableOpacity>
          </View>
          {/* Product Icon */}
          <TouchableOpacity onPress={handleClickForProduct}>
            <Image
              className={`w-14 h-16 mx-4`}
              resizeMode="cover"
              source={{uri:image}}
            />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View className={`mt-[-1.25] gap-2`}>
          <Text className="text-[#262626] font-plight text-[11px] text-left w-25">
            {description}
          </Text>
          <Text className={`text-left w-25`}>
            <Text
              className={`font-dmSansMedium text-[12px] text-[#000] font-medium`}
            >
              SAR {price}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  export default Product;
