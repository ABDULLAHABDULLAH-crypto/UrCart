import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Product from '../../../../components/Product'; // Ensure this path is correct
import { useLocalSearchParams } from 'expo-router'; // Verify this hook's usage or replace with another if not applicable
import { db } from '../../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const CategoryPage = () => {
  const { categoryName } = useLocalSearchParams();
  console.log("Category Name ",categoryName);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
  
    return lowestPrice;
  }
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const productsRef = collection(db, "Products");
        const q = query(productsRef, where("category", "==", categoryName));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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
  console.log("Cart Items",products);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          numColumns={3}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Product
                price={findLowestPrice(item.price)}
                name={item.name}
                description={item.description}
                imageSource={item.imageSource}
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Apply padding to the entire safe area
  },
  item: {
    width: 120, // Define width to accommodate 3 columns
    padding: 10, // Padding around each item
  }
});

export default CategoryPage;
