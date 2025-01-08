import { Image, StyleSheet, TextInput, Text, View, ImageBackground, TouchableOpacity, Animated } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';

const VerifyEmailScreen = () => {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = React.useState(['', '', '', '', '', '']);
    const inputRefs = useRef<TextInput[]>([]);

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

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...verificationCode];
        newCode[index] = text;
        setVerificationCode(newCode);
        
        // Auto-focus next input
        if (text.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
        // Auto-focus previous input on backspace
        if (text.length === 0 && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

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
                    source={require("@/assets/images/topVector.png")}
                    style={styles.topImage}
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Verify Your Email</Text>
                </View>
                <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>

                <View style={styles.codeContainer}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref as TextInput}
                            style={styles.codeInput}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={verificationCode[index]}
                            onChangeText={(text) => handleCodeChange(text, index)}
                        />
                    ))}
                </View>

                <View style={styles.verifyButtonContainer}>
                    <Text style={styles.verifyText}>Verify</Text>
                    <LinearGradient
                        colors={["#F97794", "#623AA2"]}
                        style={styles.linearGradient}>
                        <AntDesign name="arrowright" size={24} color="#FFFFFF" />
                    </LinearGradient>
                </View>

                <TouchableOpacity style={styles.resendContainer}>
                    <Text style={styles.resendText}>Didn't receive the code? Resend</Text>
                </TouchableOpacity>
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
                    source={require("@/assets/images/Vector2.png")}
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
    titleContainer: {},
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
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    codeInput: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        elevation: 10,
        margin: 5,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: "#262626",
    },
    verifyButtonContainer: {
        flexDirection: "row",
        marginTop: 80,
        justifyContent: "flex-end",
        width: "90%",
    },
    verifyText: {
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
    resendContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resendText: {
        color: "#623AA2",
        fontSize: 16,
        textDecorationLine: 'underline',
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

export default VerifyEmailScreen;
