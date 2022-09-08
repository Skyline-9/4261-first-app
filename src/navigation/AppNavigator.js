import React, {useContext} from "react";
import {getApps, initializeApp} from "firebase/app";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../provider/AuthProvider";
import {API_KEY, APP_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET} from '@env'

// Main
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

import Loading from "../screens/utils/Loading";

// Better put your these secret keys in .env file
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "",
    databaseURL: "",
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};
if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();

const Auth = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="Register" component={Register}/>
            <AuthStack.Screen name="ForgetPassword" component={ForgetPassword}/>
        </AuthStack.Navigator>
    );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="Home" component={Home}/>
            <MainStack.Screen name="SecondScreen" component={SecondScreen}/>
        </MainStack.Navigator>
    );
};

export default () => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    return (
        <NavigationContainer>
            {user == null && <Loading/>}
            {user == false && <Auth/>}
            {user == true && <Main/>}
        </NavigationContainer>
    );
};
