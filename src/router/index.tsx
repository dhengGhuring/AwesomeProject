import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import SecondScreen from '../pages/Second';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
