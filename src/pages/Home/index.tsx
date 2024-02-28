import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeScreenProps} from '../../utils/interface';

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
      <Text>Ini adalah home screen</Text>
      <Button
        title="Layar Kedua"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        onPress={() => navigation.navigate('SecondScreen')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
