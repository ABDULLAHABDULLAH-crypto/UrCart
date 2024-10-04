import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FromField from "../../components/FromField";
import CustomButton from "../../components/CustomButton";

const signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: " ",
    password: " ",
  });
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
            value={user.name}
            keyboardType={"text"}
            handleChangeText={(e) => setUser({ ...user, name: e })}
            otherStyles="mt-7"
          />
          <FromField
            Title={"Email"}
            value={user.email}
            keyboardType={"email-address"}
            handleChangeText={(e) => setUser({ ...user, email: e })}
            otherStyles="mt-7"
          />
          <FromField
            Title={"Passowrd"}
            value={user.password}
            keyboardType={"pass"}
            handleChangeText={(e) => setUser({ ...user, password: e })}
            otherStyles="mt-7"
          />
          <FromField
            Title={"Confirm Passowrd"}
            value={user.password}
            keyboardType={"pass"}
            handleChangeText={(e) => setUser({ ...user, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="SignUp"
            containerStyles={"w-[300px] mt-36 "}
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
