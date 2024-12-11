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
import { router } from "expo-router";

const Cart = () => {
  const { cart, removeItemFromCart, addItemToCart, setCart, decreaseCart } =
    useGlobalContext();
  const [cartItems, setCartItems] = useState([]);
  const [animatedValue] = useState(new Animated.Value(1));

  function findLowestPrice(storePrices) {
    // console.log("Inside function ", storePrices);

    // Initialize prices, using Infinity as the default when a store is null
    const carrefourPrice = storePrices.carrefour
      ? storePrices.carrefour.price
      : Infinity;
    const danubePrice = storePrices.danube
      ? storePrices.danube.price
      : Infinity;
    const tamimiPrice = storePrices.tamimi
      ? storePrices.tamimi.price
      : Infinity;

    // Return the minimum price, excluding any that are Infinity
    return Math.min(carrefourPrice, danubePrice, tamimiPrice);
  }
  function imageFromSupermarket(storePrices) {
    if (storePrices.carrefour != null) {
      return storePrices.carrefour.productImageLink;
    }
    if (storePrices.danube != null) {
      return storePrices.danube.productImageLink;
    }
    if (storePrices.tamimi != null) {
      return storePrices.tamimi.productImageLink;
    }

    return "https://via.placeholder.com/100";
  }
  const calculateTotal = (market) => {
    const total = cart.reduce((sum, item) => {
      if (item.stores[market]) {
        return sum + item.stores[market].price * item.quantity;
      }
      return sum;
    }, 0);
    return parseFloat(total.toFixed(4));
  };
  function ProductPrices(storePrices) {
    const carrefourPrice = storePrices.carrefour
      ? storePrices.carrefour.price
      : Infinity;
    const danubePrice = storePrices.danube
      ? storePrices.danube.price
      : Infinity;
    const tamimiPrice = storePrices.tamimi
      ? storePrices.tamimi.price
      : Infinity;

    return [carrefourPrice, danubePrice, tamimiPrice];
  }
  const handleItemPress = (item) => {
    router.push({
      pathname: "ProductPage",
      params: {
        name: item.name,
        description: item.descreption,
        imageSource: imageFromSupermarket(item.stores),
        prices: ProductPrices(item.stores),
      },
    });
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

      if (index !== -1) {
        const newCart = [...prevCart];
        const currentItem = newCart[index];

        if (currentItem.quantity > 1) {
          newCart[index] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
          decreaseCart(1);
        } else {
          newCart.splice(index, 1);
          decreaseCart(1);
        }

        return newCart;
      }
      return prevCart;
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Animated.View
          style={[
            styles.itemDetails,
            { transform: [{ scale: animatedValue }] },
          ]}
        >
          <Image
            source={{
              uri:
                imageFromSupermarket(item.stores) ||
                "https://via.placeholder.com/100",
            }}
            style={styles.itemImage}
          />
          <View className="flex-col px-2">
            <Text className="text-black-100 text-xs w-40">{item.name}</Text>
            {/* <Text className="text-gray-400 text-xs"></Text> */}
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

          <View className="m-1.5">
            <Text className="">{item.quantity}</Text>
          </View>

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
                {calculateTotal("tamimi")} SR
              </Text>
              <Image
                source={require("../../assets/images/tamimi.png")}
                style={styles.marketLogo}
              />
            </View>
            <View style={styles.marketContainer}>
              <Text style={styles.marketPrice}>
                {calculateTotal("carrefour")} SR
              </Text>
              <Image
                source={require("../../assets/images/carrefour.png")}
                style={styles.marketLogo}
              />
            </View>
            <View style={styles.marketContainer}>
              <Text style={styles.marketPrice}>
                {calculateTotal("danube")} SR
              </Text>
              <Image
                source={require("../../assets/images/danube.png")}
                style={styles.marketLogo}
                className="w-[80px] h-[50px] "
                resizeMode="contain"
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
