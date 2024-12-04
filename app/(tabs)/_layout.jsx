
// This Page contain all the tabs in the App ,and also handle the routing between the taps. 

import { View, Text, Image, TouchableOpacity } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { icons } from "../../constants";
import SearchInput from "../../components/searchInput";
import { useGlobalContext } from "../../Context/GlobalContext";
import { ShoppingCart as ShoppingCartIcon } from '@expo/vector-icons';
const TabIcon = ({ icon, name, color, focused ,imageStyle }) => {
  return (
    <View className="flex-1 justify-center items-center w-20 h-full ">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className={imageStyle + " w-10 h-10 mt-10"}
    />
    <Text
      className={`${focused ? "font-psemibold" : "font-pregular"}`}
      style={{ color: color }} // Avoid width/height constraints here
    >
      {name }
    </Text>
  </View>
  );
};

const Tabslayout = () => {
  const { cartCount } = useGlobalContext();
  return (
    <>
    
      <View className="h-24 bg-primary"></View>

      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#20374F", // Light background color for floating effect
            borderTopWidth: 0, // Remove default top border
            borderRadius: 20, // Rounded corners
            height: 84,
           
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "home",
            headerShown: false,

            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.home}
                name={"Home"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,

            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.ShoppingCart}
                name="Cart"
                imageStyle={"w-28"}
              />
            ),
          }}
        />

      </Tabs>
    </>
  );
};

export default Tabslayout;
