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
                    source={require("@/assets/auth_imgs/svg.png")}
                    style={styles.topImage}
                />
            </Animated.View>

            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
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

                <TouchableOpacity style={styles.verifyButton}>
                    <LinearGradient
                        colors={["#8ED1FC", "#8ED1FC"]}
                        style={styles.verifyButtonGradient}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resendContainer}>
                    <Text style={styles.resendText}>Didn't receive the code? Resend</Text>
                </TouchableOpacity>
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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    topImageContainer: {
        alignItems: 'center',
    },
    topImage: {
        width: "100%",
        height: 150,
    },
    titleContainer: {
        marginBottom: 10,
    },
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
    verifyButton: {
        marginTop: 30,
        alignSelf: 'center',
        width: '60%',
    },
    verifyButtonGradient: {
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
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
});

export default VerifyEmailScreen;
