import {  SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import home from "./(tabs)/(home)/home";
import Category from "../components/Category";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const[fontLoaded,error]=useFonts({
       "Poppins-Black":require("../assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
      "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
      "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    })
    useEffect(()=>{
      if (error) throw error;
  
      if(fontLoaded) SplashScreen.hideAsync();
  
  
    },[fontLoaded,error])
    
    if(!fontLoaded && !error) return null;
  

  //This useEffect will be update the fonts whenever there is a change in the font 
    // We will use Global Context to fetch user data
  return (
    <Stack className="bg-white">
    <Stack.Screen  name="index" options={{headerShown:false}}/>
    <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
<<<<<<< HEAD
    <Stack.Screen name="(screens)" options={{headerShown:false}}/>
=======
    <Stack.Screen name="(auth)" options={{headerShown:false}}/>

>>>>>>> 2f45026838199d08e5d682963cd68ec148b40ffa
    </Stack>
  );
}