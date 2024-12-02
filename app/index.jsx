import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View, Image } from "react-native";
import { useState } from "react";
import { router } from 'expo-router'; // Removed useRouter as it's not needed
import { Link } from "expo-router"; // Keep Link if needed for Skip
import CustomButton from "../components/CustomButton";
export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/onbording.png")}
      style={{ flex: 1 }} // Using inline styles here
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
          style={{ color: "#686868", fontSize: 60, fontWeight: '600' }} // Example without tailwind
        >
          UrCart
        </Text>
        <View style={{ position: 'relative' }}>
          <Text style={{ color: "#686868", fontSize: 20 }}>online groceries</Text>
          <Image
            source={require("../assets/images/Black and white woman walking with a shopping cart.png")}
            style={{ position: 'absolute', left: -40 }}
          />
        </View>
        <CustomButton
          title="Login"
          containerStyles="w-[300px] mt-20"
           // Inline styles for button
          handlePress={() => {
            router.push("/signIn");
          }}
        />
        
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
