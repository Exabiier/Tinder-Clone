import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import ChatScreen from '../Screens/ChatScreen'
import { RootStackParamList } from '../typings'

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigation = () => {
  return (
   <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Chat" component={ChatScreen} />
   </Stack.Navigator>
  )
}

export default StackNavigation