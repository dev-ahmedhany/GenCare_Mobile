<<<<<<< HEAD
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { InputField } from '@/components/InputField';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background }
      ]}
    >
      <Link href="/home" asChild>
        <TouchableOpacity style={styles.homeButton}>
          <Ionicons 
            name="home-outline" 
            size={30} 
            color={Colors[colorScheme].tint} 
          />
        </TouchableOpacity>
      </Link>

      <Ionicons 
        name="person-circle-outline" 
        size={120} 
        color={Colors[colorScheme].tint}
        style={styles.logo}
      />
      
      <ThemedText 
        type="title" 
        style={[
          styles.title,
          { color: Colors[colorScheme].text }
        ]}
      >
        Login
      </ThemedText>
      
      <InputField
        icon="mail-outline"
        placeholder="email or phone"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        darkMode={colorScheme === 'dark'}
      />
      
      <InputField
        icon="lock-closed-outline"
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        darkMode={colorScheme === 'dark'}
      />
      
      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme].tint }
        ]}
      >
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>

      <Link href="/signup" style={styles.link}>
        <ThemedText style={{ color: Colors[colorScheme].text }}>
          Don't have an account? Sign up now
        </ThemedText>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    alignSelf: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    alignSelf: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
}); 
=======
import { Image, StyleSheet,TextInput, Text, View, ImageBackground, TouchableOpacity, Animated } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import  AntDesign  from "@expo/vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = () => {
    const router = useRouter();
    
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
            // Fade in everything
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            // Slide in top image
            Animated.timing(slideTopAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            // Slide in bottom vector
            Animated.timing(slideBottomAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            // Scale up the content
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
                // Cleanup animations
                fadeAnim.stopAnimation();
                slideTopAnim.stopAnimation();
                slideBottomAnim.stopAnimation();
                scaleAnim.stopAnimation();
            };
        }, [])
    );

    const handleRegister = () => {
        router.push('/(auth)/signup');
    };
    const passwordReset = () => {
        router.push('/(auth)/forgotPassword');
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
          source={require("D:/Gencare/Gencare/assets/images/topVector.png")}
          style={styles.topImage}
        />
      </Animated.View>
      
      <Animated.View style={{
        opacity: fadeAnim,
      }}>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>GenCare</Text>
        </View>
        <View>
          <Text style={styles.signInText}>Sign in to your account</Text>
        </View>
        <View style = {styles.inputContainer}>
          <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder="Username" />
        </View>
        <View style = {styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder="Password" secureTextEntry/>
        </View>

        <TouchableOpacity onPress={passwordReset}>
          <Text style={styles.forgotPasswordText}>Forgot your Password?</Text>
        </TouchableOpacity>

        <View style={styles.signinButtonContainer}>
          <Text style={styles.signIn}>Sign in</Text>
          <LinearGradient
              colors = {["#F97794", "#623AA2"]}
              style={styles.linearGradient}>
              <AntDesign name="arrowright" size={24} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.footerText}>Don't have an account?{" "} <Text style={{textDecorationLine: "underline"}}>Create</Text>
          </Text>
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
          source={require("D:/Gencare/Gencare/assets/images/Vector 2.png")}
          style={styles.leftVectorImage}/>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

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
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color:"#262626",
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
    forgotPasswordText: {
        textAlign: "right",
        color: "#BEBEBE",
        fontSize: 16,
        marginRight: 40,
        width: "90%",
    },
    signinButtonContainer: {
        flexDirection: "row",
        marginTop: 80,
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
        marginTop: 80,
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
>>>>>>> master
