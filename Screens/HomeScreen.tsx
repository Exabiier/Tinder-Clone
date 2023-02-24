import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../Hooks/useAuth'


const HomeScreen = () => {
  const { logOut } = useAuth();
  


  const navigation = useNavigation<ChatScreenNavigationProp>();
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title='Go to Chat Screen' testID='ChatScreenButton' onPress={()=> navigation.navigate("Chat")} />
      <Button title='Logout' onPress={() => logOut()} />
    </SafeAreaView>
  )
}

export default HomeScreen