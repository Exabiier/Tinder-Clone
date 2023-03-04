import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../Hooks/useAuth'
import getMatchUserInfo from '../Libary/getMatchedUserInfo'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

type Props = {
    matchDetails: FireBaseMatchDataRetrieve
}

const ChatRow = ({matchDetails}: Props) => {
    const navigation = useNavigation<MessageScreenNavigationProp>();
    const [ matchedUserInfo, setMatchedUserInfo ] = useState<FireBaseData | null>(null);
    const [ lastMessage, setLastMessage ] = useState<string>("")
    const { user } = useAuth();
    
useEffect(()=>{
    setMatchedUserInfo(getMatchUserInfo(matchDetails.users, user.uid))
}, [matchDetails, user])

useEffect(()=>{
    onSnapshot(query(collection(db, 'matches', matchDetails.id, "messages"),
    orderBy("timestamp", "desc")), (snapshot) => { setLastMessage(snapshot.docs[0]?.data()?.message) 
    })
}, [matchDetails, db])


console.log(matchedUserInfo);

  return (
    <TouchableOpacity className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg" 
    style={styles.cardShadow}
    onPress={() => navigation.navigate("Message", { matchDetails })}
    >
        <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{ uri: matchedUserInfo?.photoURL}}
        />

        <View>
            <Text className="text-lg font-semibold">{matchedUserInfo?.displayName}</Text>
            <Text>{lastMessage === "" ? "Say Hi!" : lastMessage}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatRow

const styles = StyleSheet.create({
    cardShadow: {
      shadowColor: "#000",
      shadowOffset:{
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation:2
    }
  })