import { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

export type ScrollHandler = (event: any) => void;

interface NavbarProps {
  scrollY: Animated.Value;
}

export default function Navbar({ scrollY }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems: { 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    route?: string 
  }[] = [
    { icon: 'calendar-outline', title: 'Weeks' },
    { icon: 'medical-outline', title: 'Baby Names', route: '../BabyNames' },
    { icon: 'chatbubbles-outline', title: 'AI Page' },
    { icon: 'person-outline', title: 'Diseases' },
    { icon: 'man-outline', title: 'Management', route: '/(management)/management' as const },
  ];

  const authButtons: { icon: keyof typeof Ionicons.glyphMap; title: string; onPress: () => void }[] = isLoggedIn ? [
    { icon: 'log-out-outline', title: 'Logout', onPress: () => {
      setIsLoggedIn(false);
      setIsMenuOpen(false);
    }}
  ] : [
    { icon: 'log-in-outline', title: 'Login', onPress: () => {
      router.push('/(auth)/login');
      setIsMenuOpen(false);
    }},
    { icon: 'person-add-outline', title: 'Sign Up', onPress: () => {
      router.push('/(auth)/signup');
      setIsMenuOpen(false);
    }}
  ];
  
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const menuItemsAnimation = useRef(menuItems.map(() => new Animated.Value(0))).current;
  const authButtonsAnimation = useRef(authButtons.map(() => new Animated.Value(0))).current;

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  // Define scroll handler inside component
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimation, {
        toValue: isMenuOpen ? 1 : 1.2,
        friction: 5,
        useNativeDriver: true,
      }),
      ...menuItemsAnimation.map((anim, index) =>
        Animated.timing(anim, {
          toValue,
          duration: 200,
          delay: isMenuOpen ? 0 : index * 100,
          useNativeDriver: true,
        })
      ),
      ...authButtonsAnimation.map((anim, index) =>
        Animated.timing(anim, {
          toValue,
          duration: 200,
          delay: isMenuOpen ? 0 : (menuItems.length + index) * 100,
          useNativeDriver: true,
        })
      ),
    ]).start();

    setIsMenuOpen(!isMenuOpen);
  };

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={[
      styles.mainContainer,
      {
        transform: [{ translateY }]
      }
    ]}>
      <BlurView
        intensity={100}
        tint="default"
        style={styles.navbar}
      >
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
              <Ionicons 
                name={isMenuOpen ? "close" : "menu"} 
                size={24} 
                color="#623AA2"
              />
            </TouchableOpacity>

            <Animated.View style={[
              styles.menuItemsContainer,
              { display: isMenuOpen ? 'flex' : 'none' }
            ]}>
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
                  <Ionicons name={item.icon} size={20} color="#623AA2" />
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
              
              <View style={styles.divider} />
              
              {authButtons.map((item, index) => (
                <TouchableOpacity 
                  key={`auth-${index}`}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <Ionicons name={item.icon} size={20} color="#623AA2" />
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>

          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/Logo/Mob-Logo-removebg-preview.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle-outline" size={28} color="#623AA2" />
          </TouchableOpacity>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navbar: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  leftContainer: {
    position: 'relative',
    width: 40, // Fixed width to help with centering logo
  },
  menuItemsContainer: {
    position: 'absolute',
    left: 0,
    top: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 180,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  logoContainer: {
    position: 'absolute',
    left: 50,
    right: 0,
    alignItems: 'center',
    zIndex: -1, // Place behind other elements
  },
  logoImage: {
    width: 200,
    height: 200,
    marginLeft: -55,
  },
  profileButton: {
    padding: 8,
    width: 41, // Fixed width to match leftContainer
  },
});
