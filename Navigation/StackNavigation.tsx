import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuth from '../Hooks/useAuth'
import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigation = () => {
  const { user } = useAuth();
  
  return (
   <Stack.Navigator
   screenOptions={{headerShown: false}}
   >
    {user ? (
    <>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Chat" component={ChatScreen} />
    </>
    ) : (
      <Stack.Screen name= "Login" component={LoginScreen} options={{headerShown: false}} />
     )}   
   </Stack.Navigator>
  )
}

export default StackNavigation