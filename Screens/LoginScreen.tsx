import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuth from '../Hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle, getIdWithGoogle } = useAuth();
  
  return (
    <View className='flex-1'>
      <ImageBackground
        resizeMode='cover'
        className='flex-1 w-full'
        source={{ uri: "https://www.tinder.com/static/tinder.png"}}>
          <TouchableOpacity className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl" style={{marginHorizontal: "25%"}} onPress={() => signInWithGoogle()}>
            <Text className="font-semibold text-center">Sign in & get swiping</Text>
          </TouchableOpacity>
          
      </ImageBackground>
    </View>
  )
}

export default LoginScreen