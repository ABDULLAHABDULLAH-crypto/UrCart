import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FromField from "../../components/FromField";
import CustomButton from "../../components/CustomButton";

import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const signin = () => {
  // Here we will fetch the data from firebase
  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(userCredential.user);
      router.push("/home");
    } catch (error) {
      console.error("Error signing in : ", error.message);
      Alert.alert("Email or Password is wrong");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ScrollView>
        <View className="mb-10 ">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image
              source={require("../../assets/images/Back.png")}
              resizeMode="cover"
              className="h-10 w-10 mt-5"
            />
          </TouchableOpacity>
          <View className="w-full items-center">
            <Text className="text-cyan-50 text-[70px]  mt-10 font-extralight">
              LOGIN
            </Text>
          </View>
        </View>
        <View className="bg-white h-screen rounded-3xl w-full items-center">
          {/* The login details will be here */}

          <FromField
            Title={"Email"}
            value={form.email}
            keyboardType={"email-address"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />
          <FromField
            Title={"Passowrd"}
            value={form.password}
            keyboardType={"pass"}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Login"
            containerStyles={"w-[300px] mt-36 "}
            handlePress={handleSignIn}
            isLoading=""
            textStyles=""
          />
          <View
            href="/home"
            style={{
              color: "black",
              fontSize: 12,
              marginTop: 15,
            }}
          >
            <Text>
              Don't have an account?{" "}
              <Link className="text-secondary-100" href="/signUp">
                SIGN UP
              </Link>
            </Text>
          </View>
          <Link
            href="/home"
            style={{
              color: "#686868",
              fontSize: 12,
              textDecorationLine: "underline",
              marginTop: 15,
            }}
          >
            Skip
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signin;
