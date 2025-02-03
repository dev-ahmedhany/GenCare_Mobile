import { SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList, Image, Animated, Dimensions, ScrollView, ViewStyle, TextStyle } from "react-native";
import React from "react";
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Font from "../../../../constants/Fonts";
import { alphabetData, BabyName } from "data/babyNames";
import { theme } from "../../../../constants/Colors1";
import { getLetterGif } from 'data/BabyGifs';
import { bgColors } from "@/constants/Colors";
import Navbar from '../(navbar)/navbar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGHT = SCREEN_HEIGHT * 0.12;

const BabyNames = () => {
  const [selectedLetter, setSelectedLetter] = React.useState('A');
  const [isSaved, setIsSaved] = React.useState(false);
  const scrollY = new Animated.Value(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  const navbarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleSaveName = () => {
    setIsSaved(!isSaved);
  };

  type AlphabetSection = {
    letter: string;
    names: Array<BabyName>;
  };

  const renderAlphabetItem = ({ item }: { item: AlphabetSection }) => {
    const isSelected = selectedLetter === item.letter;
    const imageSource = getLetterGif(item.letter);

    return (
      <TouchableOpacity
        onPress={() => setSelectedLetter(item.letter)}
        style={[
          styles.letterItem,
          isSelected && styles.selectedLetter,
        ]}
      >
        {!isSelected ? (
          <ImageBackground
            source={imageSource}
            style={styles.letterBackground}
            imageStyle={styles.letterBackgroundImage}
            resizeMode="cover"
            progressiveRenderingEnabled={true}
          />
        ) : (
          <View style={[styles.letterBackground, styles.defaultBackground]}>
            <View style={styles.letterTextContainer}>
              <Text style={[
                styles.letterText,
                styles.selectedLetterText
              ]}>
                {item.letter}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderNameItem = ({ item }: { item: BabyName }) => (
    <View style={styles.nameItem}>
      <View style={styles.leftContainer}>
        <Image
          source={item.gender === 'M' 
            ? require('../../../../assets/images/babyNames/man.png')
            : require('../../../../assets/images/babyNames/woman.png')
          }
          style={styles.genderIcon}
          resizeMode="contain"
        />
        <Text style={[
          styles.nameTxt,
          { color: item.gender === 'M' ? '#95cae4' : '#ffb9cc' }
        ]}>
          {item.name}
        </Text>
      </View>
    </View>
  );

  const selectedNames = alphabetData.find(
    section => section.letter === selectedLetter
  )?.names || [];
  
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.navbarContainer, { opacity: navbarOpacity }]} />
      <Navbar 
        scrollY={scrollY}
        variant="simple"
        style={styles.navbar}
      />

      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, isSaved && styles.savedButton]} 
            onPress={handleSaveName}
          >
            <MaterialIcons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={isSaved ? "#fff" : "#623AA2"} 
            />
            <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
              {isSaved ? 'Saved' : 'Save Names'}
            </Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={require('../../../../assets/images/babyNames/svg.png')}
          style={styles.waveContainer}
          resizeMode="cover"
        />
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Baby Names</Text>
        </View>

        <View style={styles.content}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={alphabetData}
            renderItem={renderAlphabetItem}
            keyExtractor={item => item.letter}
            style={styles.alphabetList}
          />

          <View style={styles.namesContainer}>
            <FlatList
              data={selectedNames}
              renderItem={renderNameItem}
              keyExtractor={item => item.name}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.namesGrid}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BabyNames;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColors.light.background,
  } as ViewStyle,
  waveContainer: {
    position: 'absolute',
    width: '100%',
    height: 210,
    top: 0,
    zIndex: -1,
  },
  titleContainer: {
    width: '100%',
    paddingVertical:15,
    marginVertical:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: Font["raleway"],
    fontSize: 40,
    fontWeight: '800',
    color: theme.colors.secondary,
  } as TextStyle,
  content: {
    flex: 1,
    zIndex: 1,
  },
  alphabetList: {
    maxHeight: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  letterItem: {
    width: 90,
    height: 80,
    margin: 5,
    borderRadius: 30,
    overflow: 'hidden',
  } as ViewStyle,
  letterBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  letterBackgroundImage: {
    borderRadius: 10,
  },
  letterTextContainer: {
    borderRadius: 15,
    padding: 8,
  } as ViewStyle,
  letterText: {
    fontFamily: Font["raleway"],
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  } as TextStyle,
  selectedLetter: {
    borderWidth: 2,
    borderColor: '#4A90E2',
  } as ViewStyle,
  selectedLetterText: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 15,
    padding: 8,
    color: theme.colors.secondary,
  },
  namesContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 10,
  } as ViewStyle,
  namesGrid: {
    padding: 5,
    paddingBottom: 20,
  },
  nameItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Space between icon and text
  },
  nameTxt: {
    fontFamily: Font["raleway"],
    fontSize: 16,
    fontWeight: '500',
  },
  genderIcon: {
    width: 24,
    height: 24,
  },
  defaultBackground: {
    backgroundColor: theme.colors.secondary, // or any color you prefer
  },
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: NAVBAR_HEIGHT,
  },
  scrollView: {
    flex: 1,
    marginTop: NAVBAR_HEIGHT,
  },
  saveButtonContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.025,
    right: 16,
    zIndex: 3,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
  },
  savedButton: {
    backgroundColor: '#623AA2',
    borderColor: '#623AA2',
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
  },
  savedButtonText: {
    color: '#fff',
  },
});
