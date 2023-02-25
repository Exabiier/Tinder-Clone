import { Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';

// TODO I need to make an overhall for the auth-hook
// TODO need to create type for the createContext()
// TODO Review the code for google firbase and understand why it works
// TODO See if you only can only do one https://github.com/expo/expo/issues/12808
// TODO We need to to make major type definitions on the home screen on swiper and data from google firebase

 

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
      
    </NavigationContainer>
      
  );
}


