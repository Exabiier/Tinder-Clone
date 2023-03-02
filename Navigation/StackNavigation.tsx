import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuth from '../Hooks/useAuth'
import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'
import ModelScreen from '../screens/ModelScreen'
import MatchScreen from '../screens/MatchScreen'


const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigation = () => {
  const { user } = useAuth();
  
  return (
   <Stack.Navigator
   screenOptions={{headerShown: false}}
   >
    {user ? (
    <>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: "modal"}}>
        <Stack.Screen name="ModalScreen" component={ModelScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: "transparentModal"}}>
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Group>

    </>
    ) : (
      <Stack.Screen name= "Login" component={LoginScreen} options={{headerShown: false}} />
     )}   
   </Stack.Navigator>
  )
}

export default StackNavigation