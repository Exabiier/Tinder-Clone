import { NavigationProp } from "@react-navigation/native"

type RootStack = {
    Home: undefined
    Chat: undefined
}

type ChatScreenNavigationProp = NavigationProp<RootStack, "Chat">
