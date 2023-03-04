import { View, Text } from 'react-native'
import React from 'react'

type Props ={
    message: MessageFBData
}

const SenderMessage = ({message}: Props) => {
  return (
    <View
    className="bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"
    style={{alignSelf: "flex-start", marginLeft: "auto"}}>
      <Text
      className="text-white">{message.message}</Text>
    </View>
  )
}

export default SenderMessage