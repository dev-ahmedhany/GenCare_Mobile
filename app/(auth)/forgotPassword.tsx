import { Image, StyleSheet, TextInput, Text, View, ImageBackground, TouchableOpacity, Animated } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { useNavigation } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");

    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideTopAnim = React.useRef(new Animated.Value(-100)).current;
    const slideBottomAnim = React.useRef(new Animated.Value(100)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

    const startAnimations = () => {
        // Reset animations
        fadeAnim.setValue(100);
        slideTopAnim.setValue(-100);
        slideBottomAnim.setValue(100);
        scaleAnim.setValue(0.3);

        // Start animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideTopAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideBottomAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useFocusEffect(
        React.useCallback(() => {
            startAnimations();
            return () => {
                fadeAnim.stopAnimation();
                slideTopAnim.stopAnimation();
                slideBottomAnim.stopAnimation();
                scaleAnim.stopAnimation();
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.topImageContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideTopAnim }]
                    }
                ]}
            >
                <Image
                    source={require("D:/Gencare/Gencare/assets/images/topVector.png")}
                    style={styles.topImage}
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Forgot Password</Text>
                </View>
                <Text style={styles.subtitle}>Enter your email to reset password</Text>

                <View style={styles.inputContainer}>
                    <AntDesign name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.resetButtonContainer}>
                    <Text style={styles.resetText}>Reset</Text>
                    <LinearGradient
                        colors={["#F97794", "#623AA2"]}
                        style={styles.linearGradient}>
                        <AntDesign name="arrowright" size={24} color="#FFFFFF" />
                    </LinearGradient>
                </View>
            </Animated.View>

            <Animated.View 
                style={[
                    styles.leftVectorContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideBottomAnim }]
                    }
                ]}
            >
                <ImageBackground
                    source={require("D:/Gencare/Gencare/assets/images/Vector 2.png")}
                    style={styles.leftVectorImage}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
        position: "relative",
    },
    topImageContainer: {},
    topImage: {
        width: "100%",
        height: 130,
    },
    titleContainer:  {},
    title: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "500",
        color: "#262626",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 18,
        color: "#262626",
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 40,
        marginVertical: 20,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        elevation: 10,
        height: 50,
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
    },
    resetButtonContainer: {
        flexDirection: "row",
        marginTop: 80,
        justifyContent: "flex-end",
        width: "90%",
    },
    resetText: {
        color: "#262626",
        fontSize: 25,
        fontWeight: "bold",
    },
    linearGradient: {
        width: 56,
        height: 34,
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    leftVectorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    leftVectorImage: {
        width: 250,
        height: 500,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
});

export default ForgotPasswordScreen;