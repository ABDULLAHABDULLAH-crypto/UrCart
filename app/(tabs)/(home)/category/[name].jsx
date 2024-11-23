import { View, FlatList, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Product from "../../../../components/Product";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, query, where, startAt, endAt } from "firebase/firestore";

const CategoryPage = () => {
  const { categoryName } = useLocalSearchParams();
  const data=[];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "Products");
        const q = query(
          productsRef,
          where("category", ">=", categoryName)
        );
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        
        
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryName]);
  const Item = ({ name, price, describe, image }) => (
    <View className="w-28">
      <Product price={price} description={describe} imageSource={image} />
    </View>
  );
  
  return (
    <SafeAreaView className="m-10 p-10">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          numColumns={3}
          data={data}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              describe={item.describe}
              image={item.image}
              price={item.price[0]}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryPage;
