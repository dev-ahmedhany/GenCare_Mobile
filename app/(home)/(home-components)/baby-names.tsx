import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';

export default function AnimatedBoxes() {
  const animatedValues = useRef({
    box1: new Animated.Value(0),
    box2: new Animated.Value(0),
    box3: new Animated.Value(0),
  }).current;

  useEffect(() => {
    const animate = () => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animatedValues.box1, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.box2, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.box3, {
              toValue: 1,
              duration: 2500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(animatedValues.box1, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.box2, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.box3, {
              toValue: 0,
              duration: 2500,
              useNativeDriver: true,
            }),
          ]),
        ])
      );

      animation.start();
      return () => animation.stop();
    };

    animate();
  }, []);

  const getAnimatedStyle = (animatedValue: Animated.Value) => ({
    transform: [{
      rotate: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }],
    opacity: animatedValue
  });

  const SpiralLine = () => {
    const spiral = Array.from({ length: 50 }).map((_, i) => {
      const angle = 0.5 * i;
      const radius = 2 * i;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y };
    });

    return (
      <Svg style={StyleSheet.absoluteFill}>
        <Path
          d={`M ${spiral.map(p => `${p.x + 150} ${p.y + 150}`).join(' L ')}`}
          stroke="rgba(137, 207, 240, 0.3)"
          strokeWidth="2"
          fill="none"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Baby Names</ThemedText>
      <ThemedText style={styles.subtitle}>
        Baby Names 
      </ThemedText>
      <View style={styles.boxesContainer}>
        <SpiralLine />
        <Animated.View 
          style={[styles.box, styles.box1, getAnimatedStyle(animatedValues.box1)]}
          collapsable={false}
        >
          <ThemedText style={styles.boxText}>A</ThemedText>
        </Animated.View>
        
        <Animated.View 
          style={[styles.box, styles.box2, getAnimatedStyle(animatedValues.box2)]}
          collapsable={false}
        >
          <ThemedText style={styles.boxText}>B</ThemedText>
        </Animated.View>
        
        <Animated.View 
          style={[styles.box, styles.box3, getAnimatedStyle(animatedValues.box3)]}
          collapsable={false}
        >
          <ThemedText style={styles.boxText}>C</ThemedText>
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.buttonText}>See More</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 0,
  } as ViewStyle,
  boxesContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  } as ViewStyle,
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'rgb(137, 207, 240)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  box1: {
    top: 0,
    left: 20,
  } as ViewStyle,
  box2: {
    top: '32%',
    left: '40%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 2,
  } as ViewStyle,
  box3: {
    bottom: 0,
    right: 20,
  } as ViewStyle,
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  } as TextStyle,
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  } as ViewStyle,
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
  title: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  } as TextStyle,
  subtitle: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 50,
    paddingTop: 5,
    fontSize: 26,
    color: '#000',
    marginBottom: 12,
    textAlign: 'left',
  } as TextStyle,
});