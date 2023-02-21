import { NavigationProp } from "@react-navigation/native"

type RootStackParamList = {
    Home: undefined
    Chat: undefined
}

type ChatScreenNavigationProp = NavigationProp<RootStackParamList, "Chat">
