import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../Hooks/useAuth';
import ChatRow from './ChatRow';



const ChatList = () => {
    const [matches, setMatches] = useState<any>([]);
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
    matches.length > 0 ? (
      <FlatList<any> className='h-full'
      data={matches}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ChatRow matchDetails={item} />}  />
      ) : (
        <View className="p-5">
          <Text className="text-center text-lg"> No matches at the moment </Text>
        </View>
      )
  )
}

export default ChatList