import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { theme } from '@/constants/Colors1';

export default function BabyNames() {
  return (
    <View style={styles.container}>
      {/* Header Overlay Image */}
      <Image 
        source={require('@/assets/images/svg1.png')}
        style={styles.headerOverlay}
        resizeMode="contain"
      />

      {/* Title Section */}
      <View style={[styles.titleContainer]}>
        <ThemedText style={styles.title}>Baby Names</ThemedText>
        <ThemedText style={styles.subtitle}>A-Z</ThemedText>
      </View>

      {/* Blobs Container */}
      <View style={styles.blobsContainer}>
        {/* Decorative GIFs */}
        <Image 
          source={require('../../../assets/gif/Birth.gif')}
          style={[styles.blobGif, styles.gifTopRight]}
        />
        <Image 
          source={require('../../../assets/gif/baby1.gif')}
          style={[styles.blobGif, styles.gifBottomLeft]}
        />

        {/* Letter Blobs */}
        <View style={[styles.blob, styles.blobA]}>
          <ThemedText style={styles.blobText}>A</ThemedText>
        </View>

        <View style={[styles.blob, styles.blobB]}>
          <ThemedText style={styles.blobText}>B</ThemedText>
        </View>

        <View style={[styles.blob, styles.blobC]}>
          <ThemedText style={styles.blobText}>C</ThemedText>
        </View>
      </View>

      {/* See More Button */}
      <Link href="/(home)/(home-components)/(pages-components)/BabyNames" asChild>
        <Pressable style={styles.button}>
          <ThemedText style={styles.buttonText}>See More</ThemedText>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 10,
    width: '100%',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: -50,
    left: 50,
    width: '100%',
    height: 200,
    zIndex: 1,
  },
  titleContainer: {
    marginTop: 10,
    // marginBottom: 40,
    color: 'black',
    marginHorizontal: 'auto',
    textAlign: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.secondary,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  blobsContainer: {
    position: 'relative',
    height: 400,
    width: '100%',
    zIndex: 3,
  },
  blob: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  blobA: {
    backgroundColor: theme.colors.ligthblue, // Light blue
    top: '5%',
    left: '5%',
  },
  blobB: {
    backgroundColor: theme.colors.lightpink,
    top: '35%',
    left: '50%',
    transform: [{ translateX: -60 }],
  },
  blobC: {
    backgroundColor: theme.colors.ligthblue,
    bottom: '10%',
    right: '10%',
  },
  blobText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  blobGif: {
    position: 'absolute',
    width: 200,
    height: 200,
    zIndex: 4,
    borderRadius: 999,
  },
  gifTopRight: {
    top: '-5%',
    right: '-15%',
  },
  gifBottomLeft: {
    bottom: '-10%',
    left: '-15%',
  },
  button: {
    backgroundColor: '#4f2fa2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    // marginTop: 20,
    zIndex: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});