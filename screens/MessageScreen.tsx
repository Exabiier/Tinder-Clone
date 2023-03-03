import { View, Text, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Platform, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuth from '../Hooks/useAuth';
import getMatchedUserInfo from '../Libary/getMatchedUserInfo';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const MessageScreen = () => {
    const [ input, setInput ] = useState<string>("");
    const { user } = useAuth();
    const { params } = useRoute<MessageScreenRouteProp>();
    const { matchDetails } = params;
    const [ messages, setMessages ] = useState<MessageFBData[]>([]);

    /// Getting Message from Google Firebase ///
        useEffect(()=>{ 
            onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => { 
            const messageSnap: MessageFBData[] = snapshot.docs.map(doc => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                userId: doc.data().userId,
                displayName: doc.data().displayName,
                photoURL: doc.data().photoURL,
                message: doc.data().message,
            }))
            setMessages(messageSnap)
        })},
        [matchDetails, db])

    
    ///    Sending Message out     ///
    const MessageData: InputMessageFBData = {
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
    }

    const sendMessage = () => {
        addDoc(collection(db, "matches", matchDetails.id, 'messages'), MessageData )
        setInput("")
    };

  return (
    <>
    <SafeAreaView className="flex-1">
        
        <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        className="flex-1"
        keyboardVerticalOffset={10}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList
                className="pl-4"
                data={messages}
                inverted
                keyExtractor={item => item.id}
                renderItem={({item: message}) => {
                   return message.userId === user.uid ? (
                        <SenderMessage key={message.id} message={message}/>
                    ) : (
                        <ReceiverMessage key={message.id} message={message} />
                    )     
                }}/>
            </TouchableWithoutFeedback>
        


            <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
                <TextInput
                className='h-10 text-xl'
                placeholder='Send Message...'
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                value={input} />

                <Button onPress={sendMessage} title="Send" color="#FF5864" />
            </View>

        </KeyboardAvoidingView>
        

    </SafeAreaView>
    </>
  )
}

export default MessageScreen