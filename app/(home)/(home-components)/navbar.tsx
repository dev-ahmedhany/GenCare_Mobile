import { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

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
    <View style={styles.mainContainer}>
      <BlurView
        intensity={100}
        tint="default"
        style={[
          styles.navbar,
          { backgroundColor: 'rgba(255, 255, 255, 0.6)' }
        ]}
      >
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
          <Text style={styles.title}>GenCare</Text>
          <Animated.View style={[
            styles.menuItemsContainer,
            { display: isMenuOpen ? 'flex' : 'none' }
          ]}>
            {menuItems.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.menuItemWrapper,
                  {
                    opacity: menuItemsAnimation[index],
                    transform: [{
                      translateX: menuItemsAnimation[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0],
                      }),
                    }],
                  },
                ]}
              >
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    if (item.route) {
                      router.push(item.route as any);
                    }
                    toggleMenu();
                  }}
                >
                  <Ionicons name={item.icon} size={20} color="#623AA2" />
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
            
            <View style={styles.divider} />
            
            {authButtons.map((item, index) => (
              <Animated.View
                key={`auth-${index}`}
                style={[
                  styles.menuItemWrapper,
                  {
                    opacity: authButtonsAnimation[index],
                    transform: [{
                      translateX: authButtonsAnimation[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0],
                      }),
                    }],
                  },
                ]}
              >
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <Ionicons name={item.icon} size={20} color="#623AA2" />
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>

          <TouchableOpacity 
            onPress={toggleMenu} 
            style={styles.logoButton}
            activeOpacity={0.7}
          >
            <Animated.View 
              style={[
                styles.logoCircle,
                {
                  transform: [
                    { rotate: spin },
                    { scale: scaleAnimation }
                  ]
                }
              ]}
            >
              <Image 
                source={require('@/assets/Logo/Mob-Logo-removebg-preview.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#623AA2',
    letterSpacing: 1,
    flex: 1,
  },
  logoButton: {
    zIndex: 2,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1.5,
    borderColor: '#F97794',
  },
  logo: {
    width: 90,
    height: 400,
  },
  menuItemsContainer: {
    position: 'absolute',
    right: 50,
    top: 50,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 0,
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
  },
  menuItemWrapper: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 0,
    marginVertical: 2,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 6,
  },

});
