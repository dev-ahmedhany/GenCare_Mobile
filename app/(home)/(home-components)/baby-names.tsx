import React from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { theme } from '@/constants/Colors1';
import { Image as ExpoImage } from 'expo-image';

const { width, height } = Dimensions.get('window');

export default function BabyNames() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('@/assets/images/svg1.png')}
              style={styles.headerOverlay}
              resizeMode="contain"
            />
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>Baby Names</ThemedText>
            <ThemedText style={styles.subtitle}>A-Z</ThemedText>
          </View>

          {/* Blobs Container */}
          <View style={styles.blobsContainer}>
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

            {/* Decorative GIFs */}
            <ExpoImage 
              source={require('../../../assets/gif/Birth.gif')}
              style={[styles.blobGif, styles.gifTopRight]}
              contentFit="cover"
              transition={300}
            />
            <ExpoImage 
              source={require('../../../assets/gif/baby1.gif')}
              style={[styles.blobGif, styles.gifBottomLeft]}
              contentFit="cover"
              transition={300}
            />
          </View>

          {/* See More Button */}
          <Link href="/(home)/(home-components)/(pages-components)/BabyNames" asChild>
            <Pressable style={styles.button}>
              <ThemedText style={styles.buttonText}>See More</ThemedText>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.9, // Adjust based on screen height
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    height: '95%',
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.15, // Adjust based on screen height
    marginBottom: 10,
  },
  headerOverlay: {
    width: '100%',
    height: '120%',
    top: -18,
    left: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 30,
    left: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.secondary,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  blobsContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
  blob: {
    position: 'absolute',
    width: width * 0.28, // Responsive size
    height: width * 0.28,
    borderRadius: width * 0.15,
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
  blobText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  blobA: {
    backgroundColor: theme.colors.ligthblue,
    top: '1%',
    left: '5%',
  },
  blobB: {
    backgroundColor: theme.colors.lightpink,
    top: '31%',
    left: '35%',
  },
  blobC: {
    backgroundColor: theme.colors.ligthblue,
    bottom: '10%',
    right: '5%',
  },
  blobGif: {
    position: 'absolute',
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
  },
  gifTopRight: {
    top: '-3%',
    right: '-3%',
  },
  gifBottomLeft: {
    bottom: '0%',
    left: '-3%',
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
    marginBottom: 20, // Added space at bottom
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});