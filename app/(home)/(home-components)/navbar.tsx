import { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated, Text, Dimensions, Platform, StatusBar, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

export type ScrollHandler = (event: any) => void;

interface NavbarProps {
  scrollY: Animated.Value;
}

// إضافة ثابت لارتفاع الشاشة
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const NAVBAR_HEIGHT = Math.min(SCREEN_HEIGHT * 0.12, 80); // 12% من ارتفاع الشاشة بحد أقصى 80
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export default function Navbar({ scrollY }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // تحسين الأنيميشن باستخدام useRef
  const animations = useRef({
    rotate: new Animated.Value(0),
    scale: new Animated.Value(1),
    menu: new Animated.Value(0)
  }).current;

  // القائمة الرئيسية
  const menuItems = [
    { icon: 'person-outline', title: 'Profile', route: '/profile' },
    { icon: 'man-outline', title: 'Management', route: '/(management)/management' as const },
  ];

  // أزرار تسجيل الدخول
  const authButtons = isLoggedIn 
    ? [{ icon: 'log-out-outline', title: 'Logout', onPress: () => handleLogout() }]
    : [
        { icon: 'log-in-outline', title: 'Login', onPress: () => handleAuth('login') },
        { icon: 'person-add-outline', title: 'Sign Up', onPress: () => handleAuth('signup') }
      ];

  // تحسين أداء معالجات الأحداث باستخدام useCallback
  const handleAuth = useCallback((type: 'login' | 'signup') => {
    router.push(`/(auth)/${type}`);
    setIsMenuOpen(false);
  }, [router]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  }, []);

  const handleMenuPress = useCallback((route?: string) => {
    if (route) {
      router.push(route as any);
    }
    setIsMenuOpen(false);
  }, [router]);

  // تحسين أنيميشن القائمة
  const toggleMenu = useCallback(() => {
    const toValue = isMenuOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(animations.rotate, {
        toValue,
        useNativeDriver: true,
        tension: 40,
        friction: 7
      }),
      Animated.spring(animations.scale, {
        toValue: isMenuOpen ? 1 : 1.1,
        useNativeDriver: true,
        tension: 40,
        friction: 7
      }),
      Animated.timing(animations.menu, {
        toValue,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();

    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen, animations]);

  // حساب التحويلات للأنيميشن
  const navbarTranslateY = Animated.diffClamp(scrollY, 0, NAVBAR_HEIGHT).interpolate({
    inputRange: [0, NAVBAR_HEIGHT],
    outputRange: [0, -(NAVBAR_HEIGHT + STATUSBAR_HEIGHT + 20)],
  });

  const menuRotate = animations.rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <Animated.View style={[styles.mainContainer, { transform: [{ translateY: navbarTranslateY }] }]}>
      <BlurView intensity={100} tint="default" style={styles.navbar}>
        <View style={styles.container}>
          {/* زر القائمة */}
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={toggleMenu}>
              <Animated.View style={{ transform: [{ rotate: menuRotate }] }}>
                <Ionicons 
                  name={isMenuOpen ? "close" : "menu"} 
                  size={Math.min(SCREEN_WIDTH * 0.06, 24)}
                  color="#623AA2"
                />
              </Animated.View>
            </TouchableOpacity>

            {/* القائمة المنسدلة */}
            <Modal
              visible={isMenuOpen}
              transparent={true}
              animationType="none"
              onRequestClose={() => setIsMenuOpen(false)}
            >
              <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
                <View style={styles.modalOverlay}>
                  <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                    <Animated.View 
                      style={[
                        styles.menuItemsContainer,
                        {
                          opacity: animations.menu,
                          transform: [{ scale: animations.scale }]
                        }
                      ]}
                    >
                      {menuItems.map((item, index) => (
                        <TouchableOpacity 
                          key={index}
                          style={styles.menuItem}
                          onPress={() => handleMenuPress(item.route)}
                        >
                          <Ionicons 
                            name={item.icon as any} 
                            size={Math.min(SCREEN_WIDTH * 0.05, 20)}
                            color="#623AA2"
                          />
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
                          <Ionicons 
                            name={item.icon as any} 
                            size={Math.min(SCREEN_WIDTH * 0.05, 20)}
                            color="#623AA2"
                          />
                          <Text style={styles.menuText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>

          {/* الشعار */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/Logo/Mob-Logo-removebg-preview.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* زر الملف الشخصي */}
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons 
              name="person-circle-outline" 
              size={Math.min(SCREEN_WIDTH * 0.07, 28)}
              color="#623AA2"
            />
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
    height: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,
  },
  navbar: {
    height: NAVBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.04, // 4% من عرض الشاشة
    marginTop: STATUSBAR_HEIGHT,
    borderRadius: Math.min(SCREEN_WIDTH * 0.02, 10), // حد أقصى 10
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SCREEN_WIDTH * 0.02, // 2% من عرض الشاشة
  },
  leftContainer: {
    position: 'relative',
    width: SCREEN_WIDTH * 0.1, // 10% من عرض الشاشة
    minWidth: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuItemsContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.05,
    top: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: Math.min(SCREEN_WIDTH * 0.03, 12),
    padding: SCREEN_WIDTH * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: Math.min(SCREEN_WIDTH * 0.45, 300), // حد أقصى 300
    maxHeight: SCREEN_HEIGHT * 0.5, // 60% من ارتفاع الشاشة

  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: Math.min(SCREEN_WIDTH * 0.02, 8),
  },
  menuText: {
    marginLeft: SCREEN_WIDTH * 0.03,
    fontSize: Math.min(SCREEN_WIDTH * 0.04, 16), // حد أقصى 16
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: SCREEN_HEIGHT * 0.01,
  },
  logoContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.15,
    right: SCREEN_WIDTH * 0.15,
    alignItems: 'center',
    height: '100%', // إضافة ارتفاع كامل للحاوية
    justifyContent: 'center', // توسيط عمودي
  },
  logoImage: {

    width: Math.min(SCREEN_WIDTH * 0.25, 100),
    height: Math.min(SCREEN_WIDTH * 0.5, 100),
    resizeMode: 'contain',
  },
  profileButton: {
    padding: SCREEN_WIDTH * 0.02,
    width: SCREEN_WIDTH * 0.1, // 10% من عرض الشاشة
    minWidth: 40,
    alignItems: 'center',
  },
});
