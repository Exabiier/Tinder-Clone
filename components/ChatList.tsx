import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../Hooks/useAuth';


const ChatList = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(()=> {
        onSnapshot(
            query(
                collection(db, "matches"), where('userMatched', 'array-contains', user.uid)), (snapshot: any) => setMatches(snapshot.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data()
                }))))
    },[user])

    console.log(matches)

  return (
    <View className="">
      <Text>ChatList..</Text>
    </View>
  )
}

export default ChatList