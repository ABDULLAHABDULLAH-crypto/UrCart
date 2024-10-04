// index.jsx
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View, Image, TextInput } from "react-native";
import { useState } from "react";
import {  router, useRouter } from 'expo-router';
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";


// Configure Google Sign-In


export default function Index() {
  
   
  return (
    <ImageBackground
      source={require("../assets/images/onbording.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <StatusBar />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text
          className="font-psemibold"
          style={{ color: "#686868", fontSize: 60 }}
        >
          UrCart
        </Text>
        <View className="relative">
          <Text style={{ color: "#686868", fontSize: 20 }}>
            online groceries
          </Text>
          <Image
            source={require("../assets/images/Black and white woman walking with a shopping cart.png")}
            className="absolute -left-10"
          />
        </View>
        <CustomButton
          title="Login"
          containerStyles={"w-[300px] mt-36 "}
          handlePress={()=>{ 
            router.push("/signIn");
          }}
          isLoading=""
          textStyles=""
        />
        
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={{}}
          disabled={isInProgress}
        /> */}
        {/* Input for email and password */}
        <Link
          href="/home"
          style={{
            color: "#686868",
            fontSize: 12,
            textDecorationLine: "underline",
            marginTop: -15,
          }}
        >
          Skip
        </Link>
      </View>
    </ImageBackground>
  );
}
