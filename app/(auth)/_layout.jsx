import { View,  } from 'react-native'
import React from 'react'
import {  Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    < >
     <Stack>
        <Stack.Screen name='signIn' options={{headerShown:false}}/>
        <Stack.Screen name='signUp' options={{headerShown:false}}/>
     </Stack>
    </>
  )
}

export default AuthLayout