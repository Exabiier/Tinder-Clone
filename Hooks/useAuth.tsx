import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect } from 'react'
// import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { ioSID, andriodID, expoID } from '../keys'

const AuthContext = createContext<any>({});

const config: GoogleConfig = {
    expoClientId: expoID,
    iosClientId: ioSID,
    androidClientId: andriodID,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

/// Test Code ///
const useGoogleAuthRequest = (config: GoogleConfig) => {
    const [request, response, promptAsync] = Google.useAuthRequest(config);
  
    useEffect(() => {
      if (response?.type === "success") {
        const { authentication } = response;
        console.log(authentication);
      }
    }, [response]);
  
    return { request, response, promptAsync };
  };

export const AuthProvider = ({children}: AuthProviderProp) => {

    const { promptAsync, response } = useGoogleAuthRequest(config);
    
      const signInWithGoogle = () => {
        promptAsync().then((result) => {
          if (result.type === "success") {
            const { authentication } = result;
            console.log(authentication);
          }
        });
      };
    
      






//     const signInWithGoogle = () => {

//         const [request, response, promptAsync] = Google.useAuthRequest(config);
//         promptAsync().then((result) => {
//         if (result.type === "success") {
//         const { authentication } = result;
//         console.log(authentication);
//         }

//   });

        
        // await Google.logInAsync(config).then(async (logInResult: any)=>{
        //     await AuthSession.startAsync( config);
        //     if(logInResult.type === "success"){
        //         // login...
        //     }
        // })

        // const [requset, response, proomptAsync] = Google.useAuthRequest(config);

    // }

  return (
    <AuthContext.Provider value={{
        signInWithGoogle,
        user: null
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}

