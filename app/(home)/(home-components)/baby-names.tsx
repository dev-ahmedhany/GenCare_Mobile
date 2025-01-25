import React from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link, router } from 'expo-router';
import { theme } from '@/constants/Colors1';
import { Image as ExpoImage } from 'expo-image';
import { bgColors } from '@/constants/Colors';
import MainButton from '@/constants/MainButton';

const { width, height } = Dimensions.get('window');

const handleSeeMore = () => {
  router.push('/(home)/(home-components)/(pages-components)/BabyNames');
};

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
            <View style={styles.button}>
              <MainButton 
                title="See More"
                onPress={handleSeeMore}
              />
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColors.light.background,
    width: '100%',
    height: height ,
  },
  cardContainer: {
    backgroundColor: bgColors.light.background,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    height: '95%',
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    top: 0,
    right: 0,
    width: width ,
    height: height * 0.15,
    zIndex: 1,
  },
  headerOverlay: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    transform: [{ translateX: width * 0.13 }],
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
    position: 'absolute',
    top: height * 0.04,
    left: width * 0.04,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '900',
    color: theme.colors.secondary,
  },
  subtitle: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  blobsContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    marginBottom: height * 0.02,
  },
  blob: {
    position: 'absolute',
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  blobText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#FFF',
  },
  blobA: {
    backgroundColor: theme.colors.ligthblue,
    top: '5%',
    left: '5%',
  },
  blobB: {
    backgroundColor: theme.colors.lightpink,
    top: '35%',
    left: '35%',
  },
  blobC: {
    backgroundColor: theme.colors.ligthblue,
    bottom: '15%',
    right: '5%',
  },
  blobGif: {
    position: 'absolute',
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.075,
  },
  gifTopRight: {
    top: '0%',
    right: '0%',
  },
  gifBottomLeft: {
    bottom: '5%',
    left: '0%',
  },
  button: {
    position: 'relative',
    bottom: 0,
    left: 0,
    width: width * 0.34,
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
});
