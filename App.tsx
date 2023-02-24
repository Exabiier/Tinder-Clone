import { Text, View } from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';

// TODO refractor the react contex with react redux and tool kit
// TODO need to create type for the createContext()
// TODO Review the code for google firbase and understand why it works
// TODO See if you only can only do one https://github.com/expo/expo/issues/12808
 

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


