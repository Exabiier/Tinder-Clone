type RootStackParamList = {
    Home: undefined
    Chat: undefined
    Login: undifined
}

type ChatScreenNavigationProp = NavigationProp<RootStackParamList, "Chat">

// types for Provider:
type AuthProviderProp = {
    children: ReactNode;
}


// intfaces for Project
interface GoogleConfig {
    responseType?: string,
    expoClientId: string,
    iosClientId: string,
    androidClientId: string,
    scopes: string[],
    permissions: string[],
}

interface FirebaseConfig {
    apiKey1: string,
    authDomain1: sting,
    projectId1: string,
    storageBucket1: string,
    messagingSenderId1: string,
    appId1: string,
}

interface FirebaseConfigure {
    apiKey: string,
    authDomain: sting,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
}

type Memoed = {
  user: firebase.default.User | null;
  loading: boolean;
  error: string | null;
  logOut: () => void;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextType = {
    memodValue: Memoed;
  }
  
