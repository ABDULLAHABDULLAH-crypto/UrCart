import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FromField from "../../components/FromField";
import CustomButton from "../../components/CustomButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const signup = () => {
  // Here we will fetch the data from firebase
  const [form, setForm] = useState({
    name: "",
    email: " ",
    password: " ",
    confirmPassword: " ",
  });

  // Add a new document in collection "cities"

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      
      userCredential.user.displayName = form.name;

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
              SIGNUP
            </Text>
          </View>
        </View>
        <View className="bg-white h-screen rounded-3xl w-full items-center">
          {/* The login details will be here */}

          <FromField
            Title={"Name"}
            value={form.name}
            keyboardType={"text"}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
          />
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
          <FromField
            Title={"Confirm Passowrd"}
            value={form.password}
            keyboardType={"pass"}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="SignUp"
            containerStyles={"w-[300px] mt-36 "}
            handlePress={handleSignUp}
            isLoading=""
            textStyles=""
          />

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

export default signup;
