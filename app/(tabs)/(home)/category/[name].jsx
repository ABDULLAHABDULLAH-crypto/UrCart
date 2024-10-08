import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "../../../../components/searchInput";
import Product from "../../../../components/Product";

const CategoryPage = () => {
  const { categoryName } = useLocalSearchParams();

  const [products, setProducts] = useState([
    {
      name: "Beef Ground ",
      price: "24.99 SR",
      describe: "Beef Ground From Austrila ",
      image: require("../../../../assets/images/meats/Beef Ground Regular.png"),
    },
    {
      name: "Beef Ground ",
      price: "24.99 SR",
      describe: "Beef Ground From Austrila ",
      image: require("../../../../assets/images/meats/Beef Ground Regular.png"),
    },
    {
      name: "Beef Ground ",
      price: "24.99 SR",
      describe: "Beef Ground From Austrila ",
      image: require("../../../../assets/images/meats/Beef Ground Regular.png"),
    },
    {
      name: "Beef Ground ",
      price: "24.99 SR",
      describe: "Beef Ground From Austrila ",
      image: require("../../../../assets/images/meats/Beef Ground Regular.png"),
    },
    {
      name: "Beef Ground ",
      price: "24.99 SR",
      describe: "Beef Ground From Austrila ",
      image: require("../../../../assets/images/meats/Beef Ground Regular.png"),
    },
  ]);

  const Item = ({ name, price, describe, image }) => {
    return(
    <View className="w-28 ">
          <Product
    price={price} description={describe} imageSource={image} />
    </View>);
  
  };
  return (
    <SafeAreaView className="m-10 p-10">
      <FlatList
      numColumns={3}

        data={products}
        renderItem={({ item }) => (
          <Item
          
            describe={item.describe}
            image={item.image}
            price={item.price}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default CategoryPage;
