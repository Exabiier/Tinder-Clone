import { Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';

// TODO I need to make an overhall for the auth-hook
// TODO need to create type for the createContext()
// TODO Review the code for google firbase and understand why it works
// TODO See if you only can only do one https://github.com/expo/expo/issues/12808
// TODO We need to to make major type definitions on the home screen on swiper and data from google firebase
// TODO Need to to make an interface for the the style sheet
// TODO need to add find bug for why im not getting the name
// TODO make types for for the doc from google docs and We got to see how we can do an if statement the card run out for our profiles
// TODO Nedd to make type for the data being put into the firebase database on the homeScreen

 

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


