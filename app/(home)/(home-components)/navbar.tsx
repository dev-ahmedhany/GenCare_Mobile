import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';


export default function Navbar() {

import { useRouter } from 'expo-router';

export default function Navbar() {
  const router = useRouter();

import { router, useRouter } from 'expo-router';

export default function Navbar() {
  const router = useRouter();
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems: { 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    route?: string 
  }[] = [
    { icon: 'calendar-outline', title: 'Weeks' },
    { icon: 'medical-outline', title: 'Baby Names' },
    { icon: 'chatbubbles-outline', title: 'AI Page' },
    { icon: 'person-outline', title: 'Diseases' },
    { icon: 'man-outline', title: 'Management', route: '/(management)/management' as const },
  ];

  const authButtons: { icon: keyof typeof Ionicons.glyphMap; title: string; onPress: () => void }[] = isLoggedIn ? [
 
    { icon: 'log-out-outline' as keyof typeof Ionicons.glyphMap, title: 'Logout', onPress: () => {

    { icon: 'log-out-outline', title: 'Logout', onPress: () => {
 
      setIsLoggedIn(false);
      setIsMenuOpen(false);
    }}
  ] : [
    { icon: 'log-in-outline' as keyof typeof Ionicons.glyphMap, title: 'Login', onPress: () => {
      setIsLoggedIn(true);
      setIsMenuOpen(false);
    }},
    { icon: 'person-add-outline' as keyof typeof Ionicons.glyphMap, title: 'Sign Up', onPress: () => {
      setIsLoggedIn(true);
    { icon: 'log-in-outline', title: 'Login', onPress: () => {
      router.push('/(auth)/login');
      setIsMenuOpen(false);
    }},
    { icon: 'person-add-outline', title: 'Sign Up', onPress: () => {
      router.push('/(auth)/signup');
      setIsMenuOpen(false);
    }}
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('@/assets/Logo/Web-Logo-removebg-preview.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity 
          onPress={() => setIsMenuOpen(!isMenuOpen)} 
          style={styles.menuButton}
        >
          <Ionicons 
            name={isMenuOpen ? "close-outline" : "menu-outline"} 
            size={50} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  if (item.route) {
                    router.push(item.route as any);
                  }
                  setIsMenuOpen(false);
                }}
              >
                <Ionicons name={item.icon} size={24} color="#007AFF" />
                <Text style={styles.menuText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
            
            <View style={styles.divider} />
            
            {authButtons.map((item, index) => (
              <TouchableOpacity 
                key={`auth-${index}`}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon} size={24} color="#007AFF" />
                <Text style={styles.menuText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    backgroundColor: 'rgba(137, 207, 240, 0.7)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,192,203, 0.8)',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    height: 70,
  },
  logo: {
    paddingRight: 10,
    width: 250,
    height: 400,
  },
  menuButton: {
    paddingRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
    zIndex: 1001,
  },
  menuItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
});
