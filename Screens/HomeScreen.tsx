import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import useAuth from '../Hooks/useAuth'
import Swiper from 'react-native-deck-swiper'


const Dummy_Data =[
{
  firstName: "Sonny",
  lastName: "Sangha",
  job: "software Developer",
  photoURL: "https://images.unsplash.com/photo-1603134281085-cf0c4b61a65d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
  age: 27,
  id: 123
},
{
  firstName: "Elon",
  lastName: "Musk",
  job: "CEO",
  photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Elon_Musk_Brazil_2022.png/1200px-Elon_Musk_Brazil_2022.png",
  age: 40,
  id: 456
},
{
  firstName: "Sonny",
  lastName: "Sangha",
  job: "software Developer",
  photoURL: "https://images.unsplash.com/photo-1603134281085-cf0c4b61a65d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
  age: 27,
  id:789
}
]
  
// TODO Make types for this page once you know what the data format for the object will be. also find how to make types for useref

const HomeScreen = () => {
  const { logOut, user } = useAuth();
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const swipeRef = useRef<Swiper<DummyData>>(null);

  return (
    <SafeAreaView className="flex-1">
      {/*  Header */}
      <View className='flex-row items-center justify-between px-5'>
        <TouchableOpacity onPress={logOut} >
          <Image className='w-10 h-10 rounded-full'  source={{ uri: `${user? user.photoURL: ""}`}} />
        </TouchableOpacity>

        <TouchableOpacity>
        <Image className="h-16 w-16" source={require('../images/kisspng-tinder.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")} >
            <Ionicons name='chatbubbles-sharp' size={36} color="#FF5864"/>
        </TouchableOpacity>

      </View>
      {/* End of Header */}

      <View className="flex-1  -mt-6">
        <Swiper<DummyData>
          ref={swipeRef}
          cards={Dummy_Data}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={
            () => console.log("Swipe PASS")
          }
          onSwipedRight={
            () => console.log("Swiped Match")
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
          renderCard={(card) =>(
            <View key={card.id} className="relative bg-white-500 h-3/4 rounded-xl">

              <Image className="w-full h-full rounded-xl" source={{ uri: card.photoURL}}/>

              <View className="flex-row absolute bottom-0  bg-white w-full justify-between items-between h-20 px-6 py-2 rounded-b-xl" style={styles.cardShadow}> 
                <View>
                  <Text className="font-bold text-xl">
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text className='text-2xl font-bold'>{card.age}</Text>
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