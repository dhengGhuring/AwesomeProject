import {useCallback, useEffect, useState} from "react";

// Import Hook Expo
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// Import React Native
import {
    Button,
    Easing,
    StyleSheet,
    Text,
    TextInput,
    View,
    useColorScheme,
} from "react-native";

// Import React Native Safe Area
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

// Import React Native Reanimated
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

// Import Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

function HomeScreen({colorScheme}: {colorScheme: string | null | undefined}) {
    // State & Variables
    const insets = useSafeAreaInsets();
    const themeTextStyle =
        colorScheme === "light" ? styles.ligthThemeText : styles.darkThemeText;
    const [loadingData, setLoadingData] = useState(false);
    // const randomWidth = useSharedValue(10);

    // const config = {
    //     duration: 500,
    //     easing: Easing.bezier(0.5, 0.01, 0, 1),
    // };

    // const style = useAnimatedStyle(() => {
    //     return {
    //         width: withTiming(randomWidth.value, config),
    //     };
    // });

    // Storing Data String Value
    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem("my-key", value);
        } catch (error) {
            console.error(error);
        }
    };

    // Storing Data Object Value
    const storeDataObject = async (value: object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("my-key", jsonValue);
        } catch (error) {
            console.error(error);
        }
    };

    // Reading Data String Value
    const getData = async () => {
        try {
            setLoadingData(true);
            const value = await AsyncStorage.getItem("my-key");
            // use timeout
            if (value !== null) {
                setTimeout(() => {
                    setLoadingData(false);
                }, 2000);
                console.log(value);
            }
        } catch (error) {
            console.error(error);
            setLoadingData(false);
        }
    };

    // Get All Keys
    const getAllKeys = async () => {
        let keys: string[] = [];
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            keys = [...allKeys];
            console.log(keys, "<<< keys");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllKeys();
    }, []);

    // Clear All Data
    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{paddingTop: insets.top, gap: 10}}>
            <Text style={[styles.text, themeTextStyle]}>
                Ini pake custom font
            </Text>
            <TextInput
                placeholder="Masukkan Text"
                style={styleTextInput.container}
                onChange={e => {
                    storeData(e.nativeEvent.text);
                }}
            />
            {colorScheme === "dark" ? (
                <View style={styles.boxInfoMode}>
                    <Text
                        style={{
                            fontFamily: "pop-regular",
                            fontSize: 20,
                            color: colorScheme === "dark" ? "black" : "white",
                        }}>
                        Sekarang di mode dark
                    </Text>
                </View>
            ) : (
                <View style={styles.boxInfoMode}>
                    <Text
                        style={{
                            fontFamily: "pop-regular",
                            fontSize: 20,
                            color: colorScheme === "dark" ? "black" : "white",
                        }}>
                        Sekarang di mode light
                    </Text>
                </View>
            )}
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                }}>
                <Button
                    color={colorScheme === "dark" ? "green" : "green"}
                    title={loadingData ? "Loading..." : "Lihat Data"}
                    onPress={() => {
                        getData();
                    }}
                />
                <Button
                    color={colorScheme === "dark" ? "pink" : "red"}
                    title={loadingData ? "Loading..." : "Hapus Data"}
                    onPress={() => {
                        clearAll();
                    }}
                />
            </View>
            {/* <Animated.View style={[styleAnimatedBox.box, style]} /> */}
            {/* <Button
                title="Klik Aku"
                onPress={() => {
                    randomWidth.value = Math.random() * 350;
                }}
            /> */}

            <StatusBar style="auto" />
        </View>
    );
}

function AnimatedBox() {
    const randomWidth = useSharedValue(10);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
        return {
            width: withTiming(randomWidth.value, config),
        };
    });

    return (
        <View style={styleAnimatedBox.container}>
            <Animated.View style={[styleAnimatedBox.box, style]} />
            <Button
                title="Klik Aku"
                onPress={() => {
                    randomWidth.value = Math.random() * 350;
                }}
            />
        </View>
    );
}

export default function App() {
    // Cek mode
    const colorScheme = useColorScheme();

    // Load Fonts
    const [isLoaded] = useFonts({
        "pop-thin": require("./assets/fonts/Poppins-Light.ttf"),
        "pop-regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "pop-medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "pop-italic": require("./assets/fonts/Poppins-Italic.ttf"),
        "pop-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "pop-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    });

    const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
            // hide the splashscreen
            await SplashScreen.hideAsync();
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    const theme =
        colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[styles.container, theme]}
                onLayout={handleOnLayout}>
                <HomeScreen colorScheme={colorScheme} />
                {/* <AnimatedBox /> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#151718",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    lightContainer: {
        backgroundColor: "#d0d0c0",
    },
    darkContainer: {
        backgroundColor: "#242c40",
    },
    boxInfoMode: {
        marginTop: 20,
        backgroundColor: "orange",
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontFamily: "pop-bold",
        fontSize: 30,
    },
    darkMode: {
        backgroundColor: "#151718",
    },
    ligthThemeText: {
        color: "#242c40",
    },
    darkThemeText: {
        color: "#ffff",
    },
});

const styleAnimatedBox = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        width: 100,
        height: 80,
        backgroundColor: "black",
        margin: 30,
    },
});

const styleTextInput = StyleSheet.create({
    container: {
        borderStyle: "solid",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});
