

import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
export default function Index() {
  return (
    <>
      <ImageBackground
        source={require("../assets/images/onbording.png")} // Make sure this path is correct
        className="flex-1"
        resizeMode="cover" // Ensures the image covers the entire area while maintaining aspect ratio
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
              online groceriet
            </Text>

              <Image
                source={require("../assets/images/Black and white woman walking with a shopping cart.png")}
                className="absolute -left-10"
              />
          </View>

          <CustomButton
            title="Login"
            containerStyles={"w-[300px] mt-36"}
            handlePress={() => {}}
            isLoading=""
            textStyles=""
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
    </>
  );
}
