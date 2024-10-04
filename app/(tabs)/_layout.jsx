import { View, Text, Image, TouchableOpacity } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { icons } from "../../constants";
import SearchInput from "../../components/searchInput";

const TabIcon = ({ icon, name, color, focused }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"}`} style={{color:color}}>
        {name}
      </Text>
    </View>
  );
};

const Tabslayout = () => {
  return (
    <>

      <View className=" bg-white">
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
        </TouchableOpacity>
      </View>
      </View>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle:{
            backgroundColor:"#20374F",
            borderTopWidth:1,
            borderTopColor:"#232533",
            height:84,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.home}
                name="Home"
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
