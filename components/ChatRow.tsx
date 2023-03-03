import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../Hooks/useAuth'
import getMatchUserInfo from '../Libary/getMatchedUserInfo'

type Props = {
    matchDetails: any
}

const ChatRow = ({matchDetails}: Props) => {
    const navigation = useNavigation<MessageScreenNavigationProp>();
    const [ matchedUserInfo, setMatchedUserInfo ] = useState<any>(null)
    const { user } = useAuth();
    
useEffect(()=>{
    setMatchedUserInfo(getMatchUserInfo(matchDetails.users, user.uid))
}, [matchDetails, user])


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
            <Text>Say Hi!</Text>
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