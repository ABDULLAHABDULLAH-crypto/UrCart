import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useGlobalContext } from "../../Context/GlobalContext";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Cart = () => {
  const { cart, removeItemFromCart, addItemToCart, setCart,decreaseCart } =
    useGlobalContext();
  const [cartItems, setCartItems] = useState([]);
  const [animatedValue] = useState(new Animated.Value(1));

  // console.log("The cart Items form Cart Page ",cart);
  const calculateTotal = (market) => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.price[market] || 0),
      0
    );
  };

  const handleItemPress = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDeleteItem = (item) => {
    setCart((prevCart) => {
      // Find the item in the cart
      const index = prevCart.findIndex((el) => el.id === item.id);

      // Check if the item is found and handle accordingly
      if (index !== -1) {
        const newCart = [...prevCart];
        const currentItem = newCart[index];

        if (currentItem.quantity > 1) {
          // If quantity is more than one, decrement it
          newCart[index] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
          decreaseCart(1); // Decrement the cart count by 1
        } else {
          // If quantity is 1, remove the item from the cart
          newCart.splice(index, 1);
          decreaseCart(1); // Decrement the cart count by 1
        }

        return newCart;
      }
      return prevCart;
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleItemPress}>
        <Animated.View
          style={[
            styles.itemDetails,
            { transform: [{ scale: animatedValue }] },
          ]}
        >
          <Image
            source={{
              uri: item.imageSource || "https://via.placeholder.com/100",
            }}
            style={styles.itemImage}
          />
          <View className="flex-col px-2">
            <Text style={styles.itemName}>{item.name}</Text>
            <Text className="text-gray-400">{item.descreption}</Text>
          </View>
          {item.isMeasuarble ? (
            <View>
              <Text>By 1 KG</Text>
            </View>
          ) : (
            ""
          )}
        </Animated.View>
      </TouchableOpacity>
      {/* The buttons that will handle adding and deleting. */}
      <View className="flex">
        <View className="flex flex-row border rounded-2xl justify-center w-24 p-2">
          <TouchableOpacity
            onPress={() => {
              removeItemFromCart(item);
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../assets/images/MinusProduct.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item)}
          >
            <Icon name="close" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              addItemToCart(item);
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../assets/images/AddProduct.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-500 p-2 text-xs">
          {" "}
          Quanitiy : {item.quantity}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UrCart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          <Text style={styles.emptyCartText}>Let's go shopping!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.itemList}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
          </View>

          <View style={styles.marketComparison}>
            <View style={styles.marketContainer}>
              <Text style={styles.marketPrice}>
                {calculateTotal("Carrefour")} SR
              </Text>
              <Image
                source={{
                  uri: "https://cdn.wowdeals.me/uploads/images/companies/85/logo/330x150/1552857294.png",
                }}
                style={styles.marketLogo}
              />
            </View>
            <View style={styles.marketContainer}>
              <Text style={styles.marketPrice}>
                {calculateTotal("Tamimi")} SR
              </Text>
              <Image
                source={{
                  uri: "https://streetkitchen.co/wp-content/uploads/2020/06/carrefour-logo-1-1.png",
                }}
                style={styles.marketLogo}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    marginBottom: 8,
  },
  itemList: {
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  itemName: {
    fontSize: 16,
    marginLeft: 12,
  },
  deleteButton: {},
  totalContainer: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  totalText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  marketComparison: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  marketContainer: {
    alignItems: "center",
  },
  marketPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8, // Add some space between the price and the logo
  },
  marketLogo: {
    width: 80, // Adjust width for both logos
    height: 50, // Adjust height for both logos
    resizeMode: "contain", // Ensure logos retain their aspect ratio
  },
});

export default Cart;
