import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../Hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle, promptAsync } = useAuth();

  return (
    <View>
      <Text>LoginScreen</Text>
    <Button title="login" onPress={signInWithGoogle} />
    <Button title="test" onPress={()=> promptAsync} />
    </View>
  )
}

export default LoginScreen