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