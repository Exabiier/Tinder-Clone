import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import ChatScreen from '../Screens/ChatScreen'
import LoginScreen from '../Screens/LoginScreen'
import useAuth from '../Hooks/useAuth'

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigation = () => {
  const { user } = useAuth();
  
  return (
   <Stack.Navigator>
    {user ? (
    <>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Chat" component={ChatScreen} />
    </>
    ) : (
      <Stack.Screen name= "Login" component={LoginScreen} />
     )}   
   </Stack.Navigator>
  )
}

export default StackNavigation