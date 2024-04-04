import {useCallback} from "react";

// Import Hook Expo
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// Import React Native
import {StyleSheet, Text, View, useColorScheme} from "react-native";

// Import React Native Safe Area
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function HomeScreen({colorScheme}: {colorScheme: string | null | undefined}) {
    const insets = useSafeAreaInsets();
    const themeTextStyle =
        colorScheme === "light" ? styles.ligthThemeText : styles.darkThemeText;
    return (
        <View style={{paddingTop: insets.top}}>
            <Text style={[styles.text, themeTextStyle]}>
                Ini pake custom font
            </Text>
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
            <StatusBar style="auto" />
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
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#151718",
        // backgroundColor: "#ffff",
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
