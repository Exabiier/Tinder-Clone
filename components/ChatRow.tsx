import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../Hooks/useAuth'
import getMatchUserInfo from '../Libary/getMatchedUserInfo'

type Props = {
    matchDetails: any
}

const ChatRow = ({matchDetails}: Props) => {
    const navigation = useNavigation<any>();
    const [ matchedUserInfo, setMatchedUserInfo ] = useState<any>(null)
    const { user } = useAuth();
    
useEffect(()=>{
    setMatchedUserInfo(getMatchUserInfo(matchDetails.users, user.uid))
}, [matchDetails, user])



  return (
    <TouchableOpacity>
        <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{ uri: matchedUserInfo?.photoURL}}
        />
    </TouchableOpacity>
  )
}

export default ChatRow