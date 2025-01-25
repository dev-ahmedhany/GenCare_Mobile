import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Navbar from '../../../navbar';

const scrollY = new Animated.Value(0);
export default function ProfileHeader() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Navbar scrollY={scrollY} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#623AA2',
  },
}); 