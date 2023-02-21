import type { JestConfigWithTsJest } from 'ts-jest'

const untranspiledModulePatterns = [
    "(jest-)?react-native",
    "@react-native-community",
    "expo(nent)?",
    "@expo(nent)?/.*",
    "react-navigation",
    "@react-navigation/.*",
    "@unimodules/.*",
    "unimodules",
    "sentry-expo",
    "native-base",
    "react-native-svg",
    "@react-native*" 
  ];
  

  const jestConfig: JestConfigWithTsJest = {
    preset: "jest-expo",
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transform: {
        '^.+/((@)?react-native)/.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(js|ts|jsx|tsx)$': '@swc/jest',
      },
      moduleNameMapper: {
        '^react-native$': 'react-native-web',
    }
  };
  
  export default jestConfig;