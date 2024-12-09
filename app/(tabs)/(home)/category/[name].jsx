import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Product from "../../../../components/Product"; // Ensure this path is correct
import { useLocalSearchParams } from "expo-router"; // Verify this hook's usage or replace with another if not applicable
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import SearchInput from "../../../../components/searchInput";
import { useGlobalContext } from "../../../../Context/GlobalContext";
import { Image } from "react-native";

const CategoryPage = () => {
  const { categoryName } = useLocalSearchParams();
  console.log("Category Name ", categoryName);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount,cart } = useGlobalContext();

  function findLowestPrice(storePrices) {
    // console.log("Inside function ",storePrices.carrefour.price);
    return Math.min(
      storePrices.carrefour.price,
      storePrices.danube.price,
      storePrices.tamimi.price
    );
  }
  function imageFromSupermarket(storePrices) {
    // console.log("Inside function ",storePrices.carrefour.price);
    return storePrices.carrefour.productImageLink;
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
          <View className="flex-row items-center px-4 bg-primary border-1 rounded-bl-3xl rounded-br-3xl">
        <SearchInput text={categoryName}/>
        <TouchableOpacity onPress={{}} className="px-6">
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
