import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as AuthSession from 'expo-auth-session';
import { ioSID, andriodID} from '../keys'

const AuthContext = createContext<any>({});

const config: GoogleConfig = {
    iosClientId: ioSID,
    androidClientId: andriodID,
    scopes: ["profile", "email"],
    Permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({children}: AuthProviderProp) => {

    const signInWithGoogle = async () => {
        
        // await Google.logInAsync(config).then(async (logInResult: any)=>{
            await AuthSession.startAsync( config);
            if(logInResult.type === "success"){
                // login...
            }
        })
    }


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

