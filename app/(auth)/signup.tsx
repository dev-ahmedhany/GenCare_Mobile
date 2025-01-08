import { Image, StyleSheet,TextInput, Text, View, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import  AntDesign  from "@expo/vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import {Animated} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

const SignupScreen = () => {
    const router = useRouter();
    
    // Animation values
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(-100)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.3)).current;
    const slideBottomAnim = React.useRef(new Animated.Value(100)).current;
    const floatAnim = React.useRef(new Animated.Value(0)).current;

    // Reset and start animations
    const startAnimations = () => {
        // Reset all animation values
        fadeAnim.setValue(100);
        slideAnim.setValue(-100);
        scaleAnim.setValue(0.);
        slideBottomAnim.setValue(100);
        floatAnim.setValue(0);

        // Start entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
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

    // Use useFocusEffect instead of useEffect
    useFocusEffect(
        React.useCallback(() => {
            // This will run every time the screen comes into focus
            startAnimations();

            // Start floating animation
            const startFloatingAnimation = () => {
                Animated.sequence([
                    Animated.timing(floatAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(floatAnim, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideBottomAnim, {
                      toValue: 0,
                      duration: 800,
                      useNativeDriver: true,
                  }),
                ]).start(() => startFloatingAnimation());
            };

            startFloatingAnimation();

            // Cleanup when screen loses focus
            return () => {
                fadeAnim.stopAnimation();
                slideAnim.stopAnimation();
                slideBottomAnim.stopAnimation();
                scaleAnim.stopAnimation();
                floatAnim.stopAnimation();
            };
        }, []) // Empty dependency array means this effect runs on every focus
    );

    const handleCreate = () => {
        router.push('/(auth)/verifyEmail');
    };

  return (
    <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
            <Animated.View 
                style={[
                    styles.topImageContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Image
                    source={require("D:/Gencare/Gencare/assets/images/topVector.png")}
                    style={styles.topImage}
                />
            </Animated.View>
            <View>
                <Text style={styles.createAccount}>Create Your Account</Text>
            </View>
            <View style = {styles.inputContainer}>
                <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Username" />
            </View>
            <View style = {styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Password" secureTextEntry/>
            </View>
            <View style = {styles.inputContainer}>
                <AntDesign name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="E-mail" />
            </View>
            <View style = {styles.inputContainer}>
                <AntDesign name="mobile1" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Mobile" />
            </View>

            <View style={styles.createButtonContainer}>
                <Text style={styles.signIn}>Create</Text>
                <TouchableOpacity onPress={handleCreate}>
                    <LinearGradient
                        colors = {["#F97794", "#623AA2"]}
                        style={styles.linearGradient}>
                        <AntDesign name="arrowright" size={24} color="#FFFFFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Or create using..</Text>
                <View style={styles.socialMediaContainer}>
                    <AntDesign name="google" size={30} color="#9A9A9A" style={styles.socialMediaIcon} />
                    <Entypo name="facebook-with-circle" size={30} color="blue" style={styles.socialMediaIcon} />
                    <AntDesign name="twitter" size={30} color="lightblue" style={styles.socialMediaIcon} />
                </View>
            </View>
        </ScrollView>

        <Animated.View 
            style={[
                styles.leftVectorContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim },
                      { translateY: slideBottomAnim }
                    ]
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

export default SignupScreen;

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
    helloContainer: {},
    helloText: {
        textAlign: "center",
        fontSize: 70,
        fontWeight: "500",
        color: "#262626",
  },
  createAccount: {
    textAlign: "center",
    fontSize: 30,
    color:"#262626",
    marginBottom: 30,
    fontWeight: 400,
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

    createButtonContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "flex-end",
        width: "90%",

    },
    signIn:{
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
    footerText: {
        textAlign: "center",
        color: "#262626",
        fontSize: 18,
        marginTop: 20,
    },
    leftVectorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        
    },
    leftVectorImage: {
        width: 200,
        height: 350,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    footerContainer: {
        marginTop: 20,
    },
socialMediaContainer: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
},
socialMediaIcon: {
    backgroundColor: "#FFFFFF",
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 50,
},

});
