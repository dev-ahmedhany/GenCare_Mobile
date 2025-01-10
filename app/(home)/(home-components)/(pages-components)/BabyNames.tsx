import { SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import Font from "../../../../constants/Font";
import { alphabetData, BabyName } from "data/babyNames";
import { theme } from "../../../../constants/Colors1";
import { getLetterGif } from 'data/BabyGifs';

const SettingsScreen = () => {
  const [selectedLetter, setSelectedLetter] = React.useState('A');

  type AlphabetSection = {
    letter: string;
    names: Array<BabyName>;
  };

  const renderAlphabetItem = ({ item }: { item: AlphabetSection }) => {
    const isSelected = selectedLetter === item.letter;
    const imageSource = isSelected 
      ? getLetterGif(item.letter)
      : null;

    return (
      <TouchableOpacity
        onPress={() => setSelectedLetter(item.letter)}
        style={[
          styles.letterItem,
          isSelected && styles.selectedLetter,
        ]}
      >
        {imageSource ? (
          <ImageBackground
            source={imageSource}
            style={styles.letterBackground}
            imageStyle={styles.letterBackgroundImage}
            resizeMode="cover"
            progressiveRenderingEnabled={true}
          >
            <View style={styles.letterTextContainer}>
              <Text style={[
                styles.letterText,
                isSelected && styles.selectedLetterText
              ]}>
                {item.letter}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={[styles.letterBackground, styles.defaultBackground]}>
            <View style={styles.letterTextContainer}>
              <Text style={[
                styles.letterText,
                isSelected && styles.selectedLetterText
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
      <Text style={styles.nameTxt}>{item.name}</Text>
      <Text style={[
        styles.genderIndicator,
        { color: item.gender === 'M' ? '#4A90E2' : '#E2719E' }
      ]}>
        {item.gender}
      </Text>
    </View>
  );

  const selectedNames = alphabetData.find(
    section => section.letter === selectedLetter
  )?.names || [];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name='chevron-back' size={24} color="#000" />
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
            contentContainerStyle={styles.namesGrid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
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
    fontWeight: 800,
    color: theme.colors.secondary,
  },
  content: {
    flex: 1,
    // marginTop: 10,
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
  },
  letterBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterBackgroundImage: {
    borderRadius: 10,
  },
  letterTextContainer: {
    borderRadius: 15,
    padding: 8,
  },
  letterText: {
    fontFamily: Font["raleway"],
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  selectedLetter: {
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
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
  },
  namesGrid: {
    padding: 5,
  },
  nameItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameTxt: {
    fontFamily: Font["raleway"],
    fontSize: 16,
    fontWeight: '500',
  },
  genderIndicator: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  defaultBackground: {
    backgroundColor: theme.colors.secondary, // or any color you prefer
  },
});
