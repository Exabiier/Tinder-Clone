import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../Hooks/useAuth';
import ChatRow from './ChatRow';



const ChatList = () => {
    const [matches, setMatches] = useState<FireBaseMatchDataRetrieve[]>([]);
    const { user } = useAuth();

    useEffect(()=> {
        onSnapshot(
            query(
                collection(db, "matches"), where('userMatched', 'array-contains', user.uid)), (snapshot) => {const snapShotData: FireBaseMatchDataRetrieve[]  = snapshot.docs.map((doc ) => ({
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    userMatched: doc.data().userMatched,
                    users: doc.data().users
                }))
                setMatches(snapShotData)
              })
    },[user])

    console.log(matches)

  return (
    matches.length > 0 ? (
      <FlatList<FireBaseMatchDataRetrieve> className='h-full'
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