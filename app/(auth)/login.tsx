import { Image, StyleSheet,TextInput, Text, View, ImageBackground, TouchableOpacity, Animated, Dimensions } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import  AntDesign  from "@expo/vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import MainButton from "@/constants/MainButton";
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
          source={require("@/assets/auth_imgs/svg.png")}
          style={styles.topImage}
        />
      </Animated.View>
      
      <Animated.View style={{
        opacity: fadeAnim,
      }}>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Welcome Back to GenCare!</Text>
        </View>
        
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/Logo/Mob-Logo-removebg-preview.png")}
            style={styles.logo}
            resizeMode="contain"
          />
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
        <View style={styles.signinButton}>
        <MainButton 
          title="Sign in"
          onPress={() => {}}
          backgroundColor="#8ED1FC"
        />      
        </View>
        <View style={styles.socialMediaContainer}>
                    <AntDesign name="google" size={30} color="#9A9A9A" style={styles.socialMediaIcon} />
        </View>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.footerText}>Don't have an account?{" "} <Text style={{textDecorationLine: "underline"}}>Create</Text>
          </Text>
        </TouchableOpacity>
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
    marginBottom: "25%",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: "18%",
    minHeight: 100,
    maxHeight: 150,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: Math.min(32, Dimensions.get('window').width * 0.08),
    marginBottom: Dimensions.get('window').height * 0.01,
    fontWeight: "500",
    color: "#262626",
    paddingHorizontal: "5%",
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.2,
    resizeMode: 'contain',
  },
  signInText: {
    textAlign: "center",
    fontSize: Math.min(18, Dimensions.get('window').width * 0.045),
    color: "#262626",
    marginBottom: "1%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "8%",
    marginVertical: "3%",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    height: Math.max(45, Dimensions.get('window').height * 0.06),
  },
  inputIcon: {
    marginLeft: "5%",
    marginRight: "2%",
  },
  textInput: {
    flex: 1,
    fontSize: Math.min(16, Dimensions.get('window').width * 0.04),
  },
    forgotPasswordText: {
        textAlign: "right",
        color: "#BEBEBE",
        fontSize: Math.min(16, Dimensions.get('window').width * 0.04),
        marginRight: "10%",
        width: "90%",
    },
    signinButton: {
        marginTop: "5%",
        alignSelf: 'center',
        width: '40%',
        minWidth: 120,
        maxWidth: 200,
    },
    signinButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    socialMediaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: "3%",
    },
    socialMediaIcon: {
      backgroundColor: "#FFFFFF",
      elevation: 10,
      margin: "1%",
      padding: "3%",
      borderRadius: 50,
  },
    footerText: {
        textAlign: "center",
        color: "#262626",
        fontSize: Math.min(18, Dimensions.get('window').width * 0.045),
        marginTop: "5%",
    },
    

});
