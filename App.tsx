import { Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
      
  );
}


