import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import Product from "../../../../components/Product"; // Ensure this path is correct
import { useLocalSearchParams } from "expo-router"; // Verify this hook's usage or replace with another if not applicable
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const CategoryPage = () => {
  const { categoryName } = useLocalSearchParams();
  console.log("Category Name ", categoryName);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  function findLowestPrice(storePrices) {
    // console.log("Inside function ",storePrices.carrefour.price);
    return Math.min(storePrices.carrefour.price,storePrices.danube.price,storePrices.tamimi.price);
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
    console.log("Cart Items", products);

    fetchProducts();
  }, [categoryName]);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()} // Ensure unique keys
          contentContainerStyle={styles.listContent} // Add padding/margin for the list
          columnWrapperStyle={styles.columnWrapper} // Manage spacing between columns
          renderItem={({ item }) => (
            <View style={{padding:10 , marginLeft:-5}}>
              <Product
                price={findLowestPrice(item.stores)}
                name={item.name}
                description={item.description}
                image={imageFromSupermarket(item.stores)}
              />
            </View>
          )}
        />
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
