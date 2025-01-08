import { View, StyleSheet, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRef, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function AIChatPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEnvelopeClosed, setIsEnvelopeClosed] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [response, setResponse] = useState(null);
  const [isClickable, setIsClickable] = useState(true);

  const envelopeAnimation = useRef(new Animated.Value(0)).current;
  const bottomFlapAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const sealAnimation = useRef(new Animated.Value(0)).current;
  const centerSealAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    envelopeAnimation.setValue(0);
    bottomFlapAnimation.setValue(0);
    sealAnimation.setValue(0);
  }, []);

  const closeEnvelope = () => {
    Animated.parallel([
      Animated.timing(bottomFlapAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(envelopeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(centerSealAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(sealAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(() => setIsEnvelopeClosed(true));
  };

  const openEnvelope = () => {
    Animated.parallel([
      Animated.timing(bottomFlapAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(envelopeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(() => setIsEnvelopeClosed(false));
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // @ts-ignore
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      closeEnvelope();
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    openEnvelope();
  };

  const handleSubmit = () => {
    setIsSent(true);
    Animated.timing(slideAnimation, {
      toValue: Dimensions.get('window').height,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      slideAnimation.setValue(-Dimensions.get('window').height);
      
      setTimeout(() => {
        setResponse("هذه النتيجة من الـ AI");
        Animated.spring(slideAnimation, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  const handleShowResult = () => {
    setIsClickable(false);
    Animated.timing(centerSealAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      openEnvelope();
      setShowResult(true);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>AI Model</ThemedText>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.envelopeContainer}>
          <Animated.View style={[styles.envelope, {
            transform: [
              { translateY: slideAnimation },
              { rotate: '180deg' }
            ]
          }]}>
            <TouchableOpacity 
              style={styles.envelopeFront}
              onPress={handleImagePick}
              disabled={isEnvelopeClosed || !isClickable}
            >
              {selectedImage ? (
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: selectedImage }}
                    style={styles.uploadedImage}
                  />
                </View>
              ) : (
                <View style={styles.uploadButton}>
                  <Ionicons name="cloud-upload-outline" size={40} color="#007AFF" />
                  <ThemedText style={styles.uploadText}>Upload Image</ThemedText>
                </View>
              )}
            </TouchableOpacity>
            
            <Animated.View
              style={[
                styles.envelopeLid,
                {
                  transform: [{
                    rotateX: envelopeAnimation.interpolate({
                      inputRange: [0, 1],
                      // the lower
                      outputRange: ['180deg', '0deg']
                    })
                  }]
                }
              ]}
            />
            <Animated.View
              style={[
                styles.bottomFlap,
                {
                  transform: [{
                    rotateX: bottomFlapAnimation.interpolate({
                      inputRange: [0, 1],
                      // the higher one
                      outputRange: ['180deg', '0deg']
                    })
                  }]
                }
              ]}
            />
            <View style={[styles.envelopeSide, styles.leftSide]} />
            <View style={[styles.envelopeSide, styles.rightSide]} />
            <View style={styles.envelopeBottom} />
            <Animated.Image
              source={require('@/assets/Logo/Web-Logo-removebg-preview.png')}
              style={[
                styles.sealLogo,
                styles.centerSealLogo,
                {
                  opacity: centerSealAnimation,
                  transform: [
                    { rotate: '180deg' },
                    { scale: centerSealAnimation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1.4, 1.2]
                    })}
                  ]
                }
              ]}
            />
            <Animated.Image
              source={require('@/assets/Logo/Web-Logo-removebg-preview.png')}
              style={[
                styles.sealLogo,
                styles.bottomRightSealLogo,
                {
                  opacity: sealAnimation,
                  transform: [
                    { rotate: '180deg' },
                    { scale: sealAnimation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1.1, 0.8]
                    })}
                  ]
                }
              ]}
            />
          </Animated.View>
        </View>

        {selectedImage && isEnvelopeClosed && !isSent && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.removeButton]}
              onPress={handleRemove}
            >
              <ThemedText style={styles.buttonText}>Remove</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <ThemedText style={styles.buttonText}>Submit</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {!showResult && response && (
          <TouchableOpacity 
            style={[styles.button, styles.resultButton]}
            onPress={handleShowResult}
          >
            <ThemedText style={styles.buttonText}>See Result</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'rgba(137, 207, 240, 0.7)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,192,203, 0.8)',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelope: {
    width: 300,
    height: 200,
    backgroundColor: 'transparent',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#333',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  envelopeFront: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#333',
    borderRadius: 10,
    zIndex: 1,
    backgroundImage: 'linear-gradient(45deg, #89CFF0 25%, transparent 25%, transparent 75%, #89CFF0 75%)',
    backgroundSize: '20px 20px',
  },
  envelopeLid: {
    position: 'absolute',
    top: 0,
    left: -3,
    right: -3,
    height: '60%',
    backgroundColor: '#89CFF0',
    borderWidth: 3,
    borderColor: '#333',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    transformOrigin: 'top',
    zIndex: 2,
  },
  envelopeSide: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: '35%',
    backgroundColor: '#89CFF0',
    borderWidth: 3,
    borderColor: '#333',
    zIndex: 0,
  },
  leftSide: {
    marginLeft: 20,
    left: -3,
    transform: [{ skewY: '45deg' }],
    transformOrigin: 'bottom left',
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  rightSide: {
    marginRight: 20,
    right: -3,
    transform: [{ skewY: '-45deg' }],
    transformOrigin: 'bottom right',
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  envelopeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    backgroundColor: '#89CFF0',
    zIndex: 0,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  bottomFlap: {
    position: 'absolute',
    bottom: -3,
    left: -3,
    right: -3,
    height: '60%',
    backgroundColor: '#89CFF0',
    borderWidth: 3,
    borderColor: '#333',
    borderBottomWidth: 10,
    transformOrigin: 'bottom',
    zIndex: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  giftRibbon: undefined,
  giftRibbonHorizontal: undefined,
  giftBow: undefined,
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultButton: {
    backgroundColor: '#34C759',
    marginBottom: 20,
  },
  resultContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '90%',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  uploadButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  imageContainer: {
    flex: 1,
    transform: [{ rotate: '180deg' }],
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  sealLogo: {
    position: 'absolute',
    width: 100,
    height: 100,
    zIndex: 4,
    opacity: 0,
  },
  centerSealLogo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    top: '7%',
  },
  bottomRightSealLogo: {
    width: 150,
    height: 150,
    right: 170,
    bottom: 100,
  },
});
