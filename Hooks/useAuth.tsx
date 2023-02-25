import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
// import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { ioSID, andriodID, expoID } from '../keys'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from "@firebase/auth"
import { auth } from '../firebase';


const AuthContext = createContext<any>({});

/// Two config due to an error in the expo-auth-seesion libary ///

const config: GoogleConfig = {
    expoClientId: expoID,
    iosClientId: ioSID,
    androidClientId: andriodID,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

const configID: GoogleConfig = {
  responseType: "id_token",
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
      }
    }, [response]);
  
    return { request, response, promptAsync };
  };

  /// This is for getting an Id form you google account
  const useGoogleAuthRequestID = (config: GoogleConfig) => {
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    useEffect(() => {
      if (response?.type === "success") {
        const { authentication } = response;
      }
    }, [response]);
  
    return { request, response, promptAsync };
  };

export const AuthProvider = ({children}: AuthProviderProp) => {
    const [ user, setUser ] = useState<any>(null)
    const [ Id_token, setId_token] = useState<string>("");
    const [loadingInitial, setLoadingInitial ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<string>("")

    useEffect(()=>{
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null)
        }
        setLoadingInitial(false)
      });
      
      return unsub();
    }, [user])

    

    // this is the useGoogleAuthRequest hook for access token:
    const { promptAsync: promptAsyncAccessToken, response: accessTokenResponse } = useGoogleAuthRequest(config);
    const { promptAsync: promptAsyncIdToken } = useGoogleAuthRequestID(configID);

      const getIdWithGoogle = async () => {
          if (Id_token) {
            return;
          }
          return await promptAsyncIdToken().then(async (result) => {
            if (result.type === "success") {
              const id_token: string = result.params.id_token;
              setId_token(id_token);
              console.log(id_token)     
            } 
        }).catch((error)=> setError(error)).finally(() => setLoading(false))
      }

      const signInWithGoogle = async () => {
        await getIdWithGoogle();
        return await promptAsyncAccessToken().then(async (result) => {
          if (result.type === "success") {
            const  accessToken  = result.params.access_token;
            const credentials = GoogleAuthProvider.credential( Id_token, accessToken);
            const user = await signInWithCredential(auth, credentials);
            setUser(user)
          } 
        }).catch((error)=> setError(error)).finally(() => setLoading(false));
      };

      const logOut = () => {
        setLoading(true);
        signOut(auth)
          .then(() => setUser(null))
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
      };
      console.log(user)

      const memodValue: Memoed = useMemo(() => ({
        logOut,
        error,
        loading,
        signInWithGoogle,
        user
    }), [user, loading, error]);

  return (
    <AuthContext.Provider value={
       memodValue
    }>
        {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)   
}

