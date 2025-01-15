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
          source={require("@/assets/auth_imgs/svg.png")}
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

        <TouchableOpacity style={styles.signinButton}>
            <LinearGradient
                colors={["#8ED1FC", "#0693E3"]}
                style={styles.signinButtonGradient}>
                <Text style={styles.signinButtonText}>Sign in</Text>
            </LinearGradient>
        </TouchableOpacity>
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
    signinButton: {
        marginTop: 30,
        alignSelf: 'center',
        width: '40%',
    },
    signinButtonGradient: {
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signinButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: "center",
        color: "#262626",
        fontSize: 18,
        marginTop: 70,
    },
    

});
