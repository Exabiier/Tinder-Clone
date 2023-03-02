import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ChatList from '../components/ChatList'
import Header from '../components/Header'






const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled/>
      <ChatList />
    </SafeAreaView>
  )
}

export default ChatScreen