import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const HomeLayout = () => {
const {categoryName}=useLocalSearchParams();
  return (
    <Stack >
        <Stack.Screen name='home' options={{headerShown:false}} />
        <Stack.Screen name='category/[name]' options={{headerShown:false}} />

    </Stack>
  )
}

export default HomeLayout