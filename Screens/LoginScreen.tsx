import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../Hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle, getIdWithGoogle } = useAuth();
    const bothSignIns = () => {
      getIdWithGoogle();
      signInWithGoogle();
    }

  return (
    <View>
      <Text>LoginScreen</Text>
    <Button title="login" onPress={signInWithGoogle} />
    
    </View>
  )
}

export default LoginScreen