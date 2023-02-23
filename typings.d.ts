type RootStackParamList = {
    Home: undefined
    Chat: undefined
    Login: undifined
}

type ChatScreenNavigationProp = NavigationProp<RootStackParamList, "Chat">

// types for Provider:
type AuthProviderProp = {
    children: ReacNode;
}


// intfaces for Project
interface GoogleConfig {
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