
// This Page contain all the tabs in the App ,and also handle the routing between the taps. 

import { View, Text, Image, TouchableOpacity } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { icons } from "../../constants";
import SearchInput from "../../components/searchInput";
import { useGlobalContext } from "../../Context/GlobalContext";

const TabIcon = ({ icon, name, color, focused }) => {
  return (
    <View className="flex-1 justify-center items-center w-20 h-full m-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-10 h-8 mt-4"
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
      <View className=" bg-slate-100 px-6">
        <View className="flex flex-row justify-between items-center mt-10 px-6 py-6">
          <TouchableOpacity onPress={{}}>
            <Image
              source={require("../../assets/images/Group 4.png")}
              resizeMode="cover"
              className="h-3 w-6"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={{}}>
            <Image
              source={require("../../assets/images/ShoppingCart.png")}
              resizeMode="cover"
              className="h-7 w-8"
            />
            {cartCount>0?<View className="absolute bottom-5 left-3 bg-primary rounded-3xl w-7 h-7 align-middle">
              <Text className="text-cyan-50 font-pmedium p-[3px]">  {cartCount} </Text>
            </View>:""}
          </TouchableOpacity>

        </View>
        <SearchInput/>

      </View>

      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#20374F",
            borderTopWidth: 1,
            borderTopColor: "#232533",
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
                icon={icons.bookmark}
                name="Cart"
              />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.profile}
                name="Profile"
              />
            ),
          }}
        /> */}
      </Tabs>
    </>
  );
};

export default Tabslayout;
