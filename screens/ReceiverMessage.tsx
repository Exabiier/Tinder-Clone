import { View, Text, Image } from 'react-native'
import React from 'react'

type Props = {
    message: MessageFBData 
}

const ReceiverMessage = ({message}: Props) => {
  return (
    <View className="bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14"
    style={{ alignSelf: "flex-start" }}>
        <Image
        className="h-12 w-12 rounded-full absolute top-0 -left-14"
        source={{ uri: message.photoURL}} />
        <Text className="text-white">{message.message}</Text>
    </View>
  )
}

export default ReceiverMessage