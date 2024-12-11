import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Product from "../../../../components/Product"; // Ensure this path is correct
import { router, useLocalSearchParams } from "expo-router"; // Verify this hook's usage or replace with another if not applicable
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import SearchInput from "../../../../components/searchInput";
import { useGlobalContext } from "../../../../Context/GlobalContext";
import { Image } from "react-native";

const CategoryPage = () => {
  const { categoryName } = useLocalSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount,cart } = useGlobalContext();
  const [showCart, setShowCart] = useState(false);

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
    async function fetchProducts() {
      setLoading(true);
      try {
        const productsRef = collection(db, "Products2.0");
        const q = query(productsRef, where("category", "==", categoryName));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log("Fetched Products:", fetchedProducts); // Log to see the fetched data
        setProducts(fetchedProducts); // Assuming you have a state setter like this
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }


    fetchProducts();
  }, [categoryName]);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <View>
            {/* Search bar and cart */}
          <View className="flex-row items-center px-4 bg-primary border-1 rounded-bl-3xl rounded-br-3xl ">
        <SearchInput />
        <TouchableOpacity
          onPress={() => setShowCart(!showCart)}
          className="px-6"
        >
          <Image
            source={require("../../../../assets/images/ShoppingCart.png")}
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
                  <Text>{item.name}</Text>
                  <Text className="text-gray-400 text-xs">
                    Quanitiy: {item.quantity}
                  </Text>
                </View>
              )}
            />
         
              <View className=" flex items-center p-2">
                <TouchableOpacity onPress={() => {router.push("/cart");}} className="bg-primary h-10 flex items-center text-center bottom-0 rounded-lg"><Text className="text-white p-2">View Cart</Text></TouchableOpacity>
                
              </View>
            
          </View>
        ) : (
          ""
        )}
      </View>
          </View>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()} // Ensure unique keys
            contentContainerStyle={styles.listContent} // Add padding/margin for the list
            columnWrapperStyle={styles.columnWrapper} // Manage spacing between columns
            renderItem={({ item }) => (
              <View style={{ padding: 10, marginLeft: 20 }}>
                <Product
                  price={findLowestPrice(item.stores)}
                  name={item.name}
                  prices={item.stores}
                  description={item.description}
                  image={imageFromSupermarket(item.stores)}
                />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1, // Add padding to the SafeAreaView
    backgroundColor: "#f8f9fa", // Optional background color
  },
  listContent: {
    paddingBottom: 10, // Add padding at the bottom of the FlatList
  },
  columnWrapper: {
    marginBottom: 10, // Add vertical spacing between rows
  },
});

export default CategoryPage;
