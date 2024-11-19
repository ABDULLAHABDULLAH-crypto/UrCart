import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fuse from "fuse.js";

// Assuming you have these components defined elsewhere
import Product from "../../components/Product";
import Category from "../../components/Category";

const Home = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fuse, setFuse] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomato",
      category: "Produce",
      price: "SAR 6.99",
      image: require("../../assets/images/Tomato.png"),
    },
    {
      id: 2,
      name: "Coca-Cola",
      category: "Beverages",
      price: "SAR 4.50",
      image: require("../../assets/images/beverages 1.png"),
    },
    {
      id: 3,
      name: "Beef",
      category: "Meats",
      price: "SAR 45.00",
      image: require("../../assets/images/meats 1.png"),
    },
    {
      id: 4,
      name: "Milk",
      category: "Dairy & Eggs",
      price: "SAR 12.00",
      image: require("../../assets/images/Eggs.png"),
    },
    {
      id: 5,
      name: "Watermelon",
      category: "Fruits",
      price: "SAR 20.00",
      image: require("../../assets/images/1.png"),
    },
    {
      id: 6,
      name: "Bakery Item",
      category: "Bakery",
      price: "SAR 8.00",
      image: require("../../assets/images/bakery 1.png"),
    },
    // ... add more dummy products with your available images
  ]);

  useEffect(() => {
    const options = { keys: ["name", "category"], includeScore: true };
    const fuseInstance = new Fuse(products, options);
    setFuse(fuseInstance);
  }, [products]);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length > 2 && fuse) {
      const results = fuse.search(text);
      const suggestions = results.map((result) => result.item);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (item) => {
    setSearchQuery(item.name);
    setSuggestions([]);
    // TODO: Implement navigation or search action with the selected item
  };

  const handleAddProduct = (product) => {
    // TODO: Implement logic to add product to cart
    console.log("Adding product to cart:", product.name);
    setCartItems(cartItems + 1);
    Alert.alert("Success", `${product.name} has been added`);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <SafeAreaView className="px-4 ">
          {/* Search Bar */}
          <TextInput
            style={styles.searchbar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearchChange}
          />

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <FlatList
              style={styles.suggestionsList}
              data={suggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionPress(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Last Searched Section */}
          <View className=" px-4 ">
            <Text className="font-pbold my-5 ">Last Searched</Text>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={products.slice(0, 5)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Product
                  key={item.id}
                  description={item.description || item.name}
                  price={item.price}
                  imageSource={item.image}
                  handleClick={() => handleAddProduct(item)}
                />
              )}
            />
          </View>

          {/* Category Section */}
          <View className="mt-2 px-4 ">
            <Text className="font-pbold my-5 ">Category</Text>

            <FlatList
              horizontal={true}
              data={[
                {
                  name: "Beverages & Water",
                  imageSource: require("../../assets/images/beverages 1.png"),
                },
                {
                  name: "Meats",
                  imageSource: require("../../assets/images/meats 1.png"),
                },
                {
                  name: "Dairy & Eggs",
                  imageSource: require("../../assets/images/Eggs.png"),
                },
                {
                  name: "Fruit & Veg",
                  imageSource: require("../../assets/images/1.png"),
                },
                {
                  name: "Bakery",
                  imageSource: require("../../assets/images/bakery 1.png"),
                },
                // ... add more categories here
              ]}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Category
                  categoryName={item.name}
                  imageSource={item.imageSource}
                />
              )}
            />
          </View>

          {/* Product List */}
          <FlatList
            data={searchQuery ? suggestions : products}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Product
                  description={item.description || item.name}
                  price={item.price}
                  imageSource={item.image}
                  handleClick={() => handleAddProduct(item)}
                />
              </View>
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  searchbar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  suggestionsList: {
    position: "absolute",
    top: 60, // Adjust position as needed
    left: 10,
    right: 10,
    backgroundColor: "white",
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  productItem: {
    flex: 1,
    margin: 5,
  },
});

export default Home;