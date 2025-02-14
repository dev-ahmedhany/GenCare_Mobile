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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/app/config/config';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGHT = SCREEN_HEIGHT * 0.12;

const BabyNames = () => {
  const [selectedLetter, setSelectedLetter] = React.useState('A');
  const [isSaved, setIsSaved] = React.useState(false);
  const scrollY = new Animated.Value(0);
  const [selectedNames, setSelectedNames] = React.useState<BabyName[]>([]);
  const [savedNamesByLetter, setSavedNamesByLetter] = React.useState<Record<string, BabyName[]>>({});
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [hasChanges, setHasChanges] = React.useState(false);

  // جلب الأسماء المحفوظة عند تحميل الصفحة
  React.useEffect(() => {
    fetchSavedNames();
  }, []);

  const fetchSavedNames = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success && data.data.user.savedBabyNames) {
        const savedNames = data.data.user.savedBabyNames.reduce((acc: Record<string, BabyName[]>,
           group: { letter: string; names: BabyName[] }) => {
          acc[group.letter] = group.names;
          return acc;
        }, {});
        setSavedNamesByLetter(savedNames);
      }
    } catch (error) {
      console.error('Error fetching saved names:', error);
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  const navbarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleNameSelection = async (name: BabyName) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const isSelected = selectedNames.includes(name);
      let updatedNames: BabyName[];

      if (isSelected) {
        updatedNames = selectedNames.filter(n => n !== name);
      } else {
        updatedNames = [...selectedNames, name];
      }

      setSelectedNames(updatedNames);
      setHasChanges(true);
    } catch (error) {
      console.error('Error updating name selection:', error);
    }
  };

  const saveChanges = async () => {
    try {
      setIsUpdating(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${API_URL}/profile/save-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'babyName',
          data: {
            letter: selectedLetter,
            names: selectedNames
          }
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSavedNamesByLetter(prev => ({
          ...prev,
          [selectedLetter]: selectedNames
        }));
        setHasChanges(false);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // تحديث الواجهة عند تغيير الحرف
  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
    setSelectedNames(savedNamesByLetter[letter] || []);
  };

  // تحقق ما إذا كان الاسم محفوظاً
  const isNameSaved = (name: BabyName) => {
    return savedNamesByLetter[selectedLetter]?.some(
      saved => saved.name === name.name
    );
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
        onPress={() => handleLetterChange(item.letter)}
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

  const renderNameItem = ({ item }: { item: BabyName }) => {
    const saved = isNameSaved(item);
    const isSelected = selectedNames.includes(item);
    
    return (
      <TouchableOpacity 
        onPress={() => handleNameSelection(item)}
        style={[
          styles.nameItem,
          saved && styles.savedNameItem,
          isSelected && !saved && styles.selectedNameItem,
          hasChanges && isSelected && styles.updatingNameItem
        ]}
      >
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
        {saved && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={24} color="#623AA2" />
          </View>
        )}
        {isSelected && !saved && (
          <View style={styles.checkmark}>
            <Ionicons 
              name="add-circle" 
              size={24} 
              color={hasChanges ? "#4CAF50" : "#623AA2"} 
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const names = alphabetData.find(
    section => section.letter === selectedLetter
  )?.names || [];
  
  const renderSaveButton = () => (
    <TouchableOpacity 
      style={[
        styles.saveButton, 
        hasChanges && styles.updateButton
      ]} 
      onPress={saveChanges}
      disabled={!hasChanges || isUpdating}
    >
      <MaterialIcons 
        name={hasChanges ? "update" : "bookmark"} 
        size={24} 
        color={hasChanges ? "#fff" : "#623AA2"} 
      />
      <Text style={[
        styles.saveButtonText, 
        hasChanges && styles.updateButtonText
      ]}>
        {isUpdating ? 'Updating...' : hasChanges ? 'Update List' : 'Saved Names'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.navbarContainer, { opacity: navbarOpacity }]} />
      <Navbar 
        scrollY={scrollY}
        variant="simple"
        style={styles.navbar}
      />

      <Animated.FlatList
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <>
            <View style={styles.saveButtonContainer}>
              {renderSaveButton()}
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
                  data={names}
                  renderItem={renderNameItem}
                  keyExtractor={item => item.name}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.namesGrid}
                  nestedScrollEnabled={true}
                />
              </View>
            </View>
          </>
        )}
        data={[]}
        renderItem={null}
      />
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
    paddingBottom: 20,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameTxt: {
    fontFamily: Font["raleway"],
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  genderIcon: {
    width: 24,
    height: 24,
  },
  defaultBackground: {
    backgroundColor: theme.colors.secondary,
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
  selectedNameItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
    borderWidth: 1,
    transform: [{ scale: 1.02 }],
  },
  savedNameItem: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderColor: '#623AA2',
    borderWidth: 1,
  },
  checkmark: {
    position: 'absolute',
    right: 15,
    transform: [{ scale: 1.1 }],
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  updateButtonText: {
    color: '#fff',
  },
  updatingNameItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
});

