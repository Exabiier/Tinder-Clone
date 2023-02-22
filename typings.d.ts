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
    iosClientId: string,
    androidClientId: string,
    scopes: string[],
    Permissions: string[],
}