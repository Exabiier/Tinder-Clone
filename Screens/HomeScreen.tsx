import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import useAuth from '../Hooks/useAuth'
import Swiper from 'react-native-deck-swiper'
import { DocumentSnapshot, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import generateId from '../Libary/genertateID'



const HomeScreen = () => {
  const { logOut, user, loading} = useAuth();
  const navigation = useNavigation<ChatScreenNavigationProp | ModalScreenNavigationProp>();
  const swipeRef = useRef<Swiper<FireBaseData>>(null);
  const [ profiles, setProfiles ] = useState<FireBaseData[]>([]);

 useEffect(()=>{
    if(user.uid){
    const unsub = onSnapshot(doc(db, 'user', user.uid), snapshot => {
    console.log(snapshot)
    if(!snapshot.exists()){
     navigation.navigate("ModalScreen");
    }
    });
    return () => {unsub()};}
 },[user, loading])
 

 useEffect(()=>{
  let unsub;
  const fetchCards: () => void = async () => {
    ///  Get the IDs of the users that the current user has swiped left on///

    const passesSnapshot = await getDocs(collection(db, "user", user.uid, "passes"));
    const passes = passesSnapshot.docs.map(doc => doc.id); 

    console.log(passes)
    const passedUserIds = passes.length > 0 ? passes : ["Firebase won't allow empty arrays"]

    /// Get IDs of the users that the current user had swiped right on. ///

    const swipesSnapshot = await getDocs(collection(db, "user", user.uid, "swipes"));
    const swipes = swipesSnapshot.docs.map(doc => doc.id);

    const swipedUserIds = swipes.length > 0 ?  swipes : ["Firebase won't allow empty arrays"]

    // Use the "in" operator to include only users whose IDs are not in the "passes" array.//
    unsub = onSnapshot(query(collection(db, 'user'), where("id", "not-in", [...passedUserIds, ...swipedUserIds])), (snapshot: any) => {
      setProfiles(snapshot.docs.filter((doc: any) => doc.id !== user.uid).map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })));
    })}
  fetchCards();
  return unsub;
 },[user, db])


 const swipeLeft = async (cardIndex: number) =>{
    console.log(cardIndex)
    if(!profiles[cardIndex]){
      return;
    }
    const userSwiped = profiles[cardIndex]
    console.log(`You swiped PASS on ${userSwiped.displayName} `);
    setDoc(doc(db, 'user', user.uid, 'passes', userSwiped.id), userSwiped)
 }


 const swipeRight = async (cardIndex: number) =>{
  console.log(cardIndex)
  if(!profiles[cardIndex]){
    return;
  }
  const userSwiped = profiles[cardIndex]
  const loggedIn: any = await (await getDoc(doc(db, 'user', user.uid))).data();
  const loggedInProfile = loggedIn as FireBaseData;

  // check if the user swiped on you...
  getDoc(doc(db, 'user', userSwiped.id, "swipes", user.uid)).then(
    (DocumentSnapshot) => {

    if(DocumentSnapshot.exists()){
      // user has matched with you before they matched with you
      console.log( "you Matched")

      setDoc(doc(db, 'user', user.uid, "swipes", userSwiped.id), userSwiped)

      /// object created for the Match DataBase ///

      const matchData: FireBaseMatchData = {
        users: {
          [user.uid]: loggedInProfile,
          [userSwiped.id]: userSwiped
        },
        userMatched: [user.uid, userSwiped.id],
        timestamp: serverTimestamp()
      }

      // Create a match:
      setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), matchData );
      
      navigation.navigate('Match', {
        loggedInProfile,
        userSwiped,
        })

    } else {
        // user has swiped as first interaction between the 2 or didnt get swiped on...
        console.log("you swiped on someone");
        setDoc(doc(db, 'user', user.uid, "swipes", userSwiped.id), userSwiped)
    }
  })

  console.log(`You swiped on ${userSwiped.displayName} ${userSwiped.job} `);
  setDoc(doc(db, 'user', user.uid, 'swipes', userSwiped.id), userSwiped)
 }

  return (
    <SafeAreaView className="flex-1">
      {/*  Header */}
      <View className='flex-row items-center justify-between px-5'>
        <TouchableOpacity onPress={logOut} >
          <Image className='w-10 h-10 rounded-full'  source={{ uri: `${user? user.photoURL: ""}`}} />
        </TouchableOpacity>

{/* TODO change the on press after I'm editing it */}
        <TouchableOpacity onPress={()=> navigation.navigate("ModalScreen")}>
        <Image className="h-16 w-16" source={require('../images/kisspng-tinder.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")} >
            <Ionicons name='chatbubbles-sharp' size={36} color="#FF5864"/>
        </TouchableOpacity>

      </View>
      {/* End of Header */}

      <View className="flex-1  -mt-6">
        <Swiper<FireBaseData>
          ref={swipeRef}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={
            (cardIndex) => {console.log("Swipe PASS");
            swipeLeft(cardIndex)}
          }
          onSwipedRight={
            (cardIndex) => {
            console.log("Swiped Match")
            swipeRight(cardIndex)
          }
          }
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label:{
                  textAlign: "right",
                  color: "red",
                },
              }
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            },
          }}
          containerStyle={{ backgroundColor: "transparent"}}
          renderCard={(card) => card ? (
            <View key={card.id} className="relative bg-white-500 h-3/4 rounded-xl">

              <Image className="w-full h-full rounded-xl" source={{ uri: card.photoURL}}/>

              <View className="flex-row absolute bottom-0  bg-white w-full justify-between items-between h-20 px-6 py-2 rounded-b-xl" style={styles.cardShadow}> 
                <View>
                  <Text className="font-bold text-xl">
                    {card.displayName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text className='text-2xl font-bold'>{card.age}</Text>
              </View>
            </View>    
          ) : (
            <View
            className="relative bg-white h-3/4 rounded=xl justify-center items-center"
            style={styles.cardShadow}
            >
              <Text className="font-bold pb-5">No More Profiles</Text>
              <View className='object-cover w-40 h-40'>
                <Image
                  className="h-full w-full"
                  source={{ uri: "https://links.papareact.com/6gb"}} />  
                </View>  
            </View>
          )}
        />     
      </View>

      <View className='flex-row justify-evenly'>

        <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-red-200" onPress={() => swipeRef.current?.swipeLeft()}>
          <Entypo name="cross" size={24} color="red"/>
        </TouchableOpacity>

        <TouchableOpacity  className="items-center justify-center rounded-full w-16 h-16 bg-green-200" onPress={() => swipeRef.current?.swipeRight()}>
          <AntDesign name="heart" size={24} color="green"/>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default HomeScreen

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