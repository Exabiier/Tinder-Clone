import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchScreen = () => {
    const navigation = useNavigation<ChatScreenNavigationProp>();
    const { params } = useRoute<MatchScreenRouteProp>();
    const { loggedInProfile, userSwiped } = params;
    
  return (
    <View className='h-full bg-red-500 pt-20' style={{ opacity: 0.89 }}>
        <View className="justify-center px-10 pt-20">
            <Image className="h-20" source={{ uri: "https://links.papareact.com/mg9"}} />
        </View>

        <Text className="text-white text-center mt-5">
            You and {userSwiped.displayName} have linked each other.
        </Text>

        <View className="flex-row justify-evenly mt-5">
            <Image 
            className="h-32 w-32 rounded-full"
            source={{ uri: loggedInProfile.photoURL }}
            />
            <Image
            className="h-32 w-32 rounded-full"
            source={{ uri: userSwiped.photoURL }} 
            />
        </View>

        <TouchableOpacity
            className="bg-white m-5 px-10 py-8 rounded-full mt-20"
            onPress={() => {
                navigation.goBack()
                navigation.navigate("Chat") 
            }}>
                <Text className="text-center" >Send A message</Text>
            </TouchableOpacity>
        
    </View>
  )
}

export default MatchScreen