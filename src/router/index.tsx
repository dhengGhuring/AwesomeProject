import {StyleSheet} from "react-native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../pages/Home";
import SecondScreen from "../pages/Second";
import SplashScreen from "../pages/Splash";

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SecondScreen"
                component={SecondScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default Router;

const styles = StyleSheet.create({});
