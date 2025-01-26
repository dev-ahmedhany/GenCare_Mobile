import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { bgColors } from '@/constants/Colors';
import { theme } from '@/constants/Colors1';
import MainButton from '@/constants/MainButton';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DiseasesList() {
  const handleDiseaseClick = () => {
    router.push('/(home)/(home-components)/(pages-components)/diseases-splash-page');
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header Container */}
      <Animated.View 
        entering={FadeInDown.duration(800).springify()}
        style={styles.headerContainer}
      >
        <LinearGradient
          colors={['rgba(98, 58, 162, 0.1)', 'transparent']}
          style={styles.headerGradient}
        />
        <ThemedText style={styles.title}>Common Diseases</ThemedText>
      </Animated.View>

      {/* List Container */}
      <View style={styles.listContainer}>
        {/* Disease Cards */}
        <Animated.View entering={FadeInRight.delay(200).duration(500)}>
          <TouchableOpacity style={styles.card} onPress={handleDiseaseClick}>
            <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.ligthblue}30` }]}>
              <Ionicons name="medical-outline" size={SCREEN_WIDTH * 0.055} color={theme.colors.ligthblue} />
            </View>
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>First Disease</ThemedText>
              <ThemedText style={styles.cardDescription}>Common in early pregnancy</ThemedText>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={SCREEN_WIDTH * 0.05} color={theme.colors.ligthblue} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(400).duration(500)}>
          <TouchableOpacity style={styles.card} onPress={handleDiseaseClick}>
            <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.lightpink}30` }]}>
              <Ionicons name="fitness-outline" size={SCREEN_WIDTH * 0.055} color={theme.colors.lightpink} />
            </View>
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Second Disease</ThemedText>
              <ThemedText style={styles.cardDescription}>Monitor blood sugar levels</ThemedText>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={SCREEN_WIDTH * 0.05} color={theme.colors.lightpink} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(600).duration(500)}>
          <TouchableOpacity style={styles.card} onPress={handleDiseaseClick}>
            <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.ligthblue}30` }]}>
              <Ionicons name="heart-outline" size={SCREEN_WIDTH * 0.055} color={theme.colors.ligthblue} />
            </View>
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Third Disease</ThemedText>
              <ThemedText style={styles.cardDescription}>High blood pressure during pregnancy</ThemedText>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={SCREEN_WIDTH * 0.05} color={theme.colors.ligthblue} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Button Container */}
      <Animated.View 
        entering={FadeInDown.delay(800).duration(500)}
        style={styles.buttonContainer}
      >
        <MainButton 
          title="See All"
          onPress={handleDiseaseClick}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: bgColors.light.background,
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.15,
    
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: '900',
    color: theme.colors.secondary,
  },
  listContainer: {
    flex: 0.6,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: SCREEN_WIDTH * 0.035,
    padding: SCREEN_WIDTH * 0.035,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.015,
    borderWidth: 1,
    borderColor: 'rgba(98, 58, 162, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.03,
    transform: [{ rotate: '-5deg' }],
  },
  cardContent: {
    flex: 1,
    paddingRight: SCREEN_WIDTH * 0.02,
  },
  cardTitle: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: '700',
    color: theme.colors.secondary,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    fontSize: SCREEN_WIDTH * 0.032,
    color: '#666',
  },
  arrowContainer: {
    width: SCREEN_WIDTH * 0.08,
    height: SCREEN_WIDTH * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.colors.secondary}08`,
    borderRadius: SCREEN_WIDTH * 0.02,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
  