type RootStackParamList = {
    Home: undefined,
    Chat: undefined,
    Login: undifined,
    ModalScreen: undifined,
}

type ChatScreenNavigationProp = NavigationProp<RootStackParamList, "Chat">

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">

type ModalScreenNavigationProp = NavigationProp<RootStackParamList, "ModalScreen">

// types for Provider:
type AuthProviderProp = {
    children: ReactNode;
}

/// Dummy Data for Home Screen ///
type DummyData = {
    firstName: string,
    lastName: string,
    job: string,
    photoURL: string,
    age: number,
    id: number,
}

/// type for Firebase Database ///
type FireBaseData = {
    age: string,
    displayName: string,
    gender: string,
    id: string,
    job: string,
    photoURL: string,
    timestamp: {seconds: number, nonoseconds: number}
}

/// user data from the ModalScreen.tsx ///

 type UserData = {
    image: string,
    job: string,
    age: string,
    gender: string,
}

type SetDocData = {
    id: string,
    displayName: string,
    photoURL: string,
    job: string,
    age: string,
    gender: string,
    timestamp: FieldValue,
}

///////////////////////
// intfaces for Project
///////////////////////

/// Google interFaces ///

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

/// Home Screen interfaces ///
  

  