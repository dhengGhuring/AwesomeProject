import {Button, StyleSheet, Text, View} from "react-native";
import React from "react";
import {HomeScreenProps} from "../../utils/interface";

const SecondScreen = ({navigation}: HomeScreenProps) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
            }}>
            <Text>Ini adalah layar kedua</Text>
            <Button
                title="Home Screen"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => navigation.navigate("HomeScreen")}
            />
        </View>
    );
};

export default SecondScreen;

const styles = StyleSheet.create({});
