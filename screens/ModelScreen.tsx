import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../Hooks/useAuth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

/// initial State ///
const begingingUserData: UserData = {
    image: "",
    job: "",
    age: "",
    gender: "",
}

const ModelScreen = () => {
    const { user } = useAuth();
    const [ userData, setUserData ] = useState<UserData>(begingingUserData);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    
    // Disabling the Button //
    const incompleteForm: boolean = userData.image.length === 0 || userData.job.length === 0 || userData.age.length === 0 || userData.gender.length === 0 

    console.log(user)

    const setDocUserData: SetDocData = {
        id: user.uid,
        displayName: user.displayName,
        photoURL: userData.image,
        job: userData.job,
        age: userData.age,
        gender: userData.gender,
        timestamp: serverTimestamp()
    }

    const updateUserProfile = () =>{
        setDoc(doc(db,'user', user.uid), setDocUserData).then(() => {navigation.goBack()}).catch(error => {
            alert(error.message);
        })
    }

  return (
 <View className='flex-1 items-center pt-1'>
        <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf"}} />

         <Text className="text-xl text-gray-500 p-2 font-bold">Welcome {user.displayName}</Text>

         {incompleteForm ? (<Text className="text-xs font-bold text-gray-400">Please Answer all Fields </Text>): null}

        <Text className="text-center p-4 font-bold text-red-400"> Step 1: the Profile Picture </Text>
        <TextInput
        value={userData.image}
        onChange={(event) => setUserData({...userData, image: event.nativeEvent.text}) }
        className="text-center text-xl pb-2"
         placeholder='Enter a Profile Pic URL'
        />

        <Text className="text-center p-4 font-bold text-red-400"> Step 2: What is your job </Text>
        <TextInput
        className="text-center text-xl pb-2"
         placeholder='Enter an Occupation'
         value={userData.job}
         onChange={(event)=> setUserData({...userData, job: event.nativeEvent.text})}
        />

        <Text className="text-center p-4 font-bold text-red-400"> Step 3: What is your age </Text>
        <TextInput
        className="text-center text-xl pb-2"
         placeholder='Enter an Age'
         keyboardType='numeric'
         value={userData.age}
         onChange={(event)=> setUserData({...userData, age: event.nativeEvent.text})}
         maxLength={2}
        />

        <Text className="text-center p-4 font-bold text-red-400"> Step 4: What is your gender </Text>
        <TextInput
        className="text-center text-xl pb-2"
         placeholder='Enter a Gender'
         value={userData.gender}
         onChange={(event)=> setUserData({...userData, gender: event.nativeEvent.text})}
        />

        <TouchableOpacity disabled={incompleteForm}
         className={ !incompleteForm ? "w-64 p-3 rounded-xl absolute bottom-40 bg-red-400" : "w-64 p-3 rounded-xl absolute bottom-40 bg-gray-400"}
         onPress={() => updateUserProfile()}
         >
            <Text className="text-center text-white text-xl">Update Profile</Text>
        </TouchableOpacity>

    </View>
  )
}

export default ModelScreen