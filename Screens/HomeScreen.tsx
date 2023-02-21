import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ChatScreenNavigationProp } from '../typings'

const HomeScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title='Go to Chat Screen' testID='ChatScreen' onPress={()=> navigation.navigate("Chat")} />
    </SafeAreaView>
  )
}

export default HomeScreen