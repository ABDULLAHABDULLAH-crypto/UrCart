import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Query = () => {
  const {query }=useLocalSearchParams();
 

  return (
    <SafeAreaView className='h-full'>
      <Text>{query}</Text>
    </SafeAreaView>
  )
}

export default Query