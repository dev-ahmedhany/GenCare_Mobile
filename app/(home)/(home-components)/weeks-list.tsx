import { View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function WeeksList() {
  // Array من 5 أسابيع
  const weeks = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Pregnancy Weeks</ThemedText>
      <ThemedText style={styles.subtitle}>
        Pregnancy Weeks 
      </ThemedText>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {weeks.map((week) => (
          <TouchableOpacity key={week} style={styles.weekCard}>
            <ThemedText style={styles.weekNumber}>Week {week}</ThemedText>
            <Image 
              source={require('@/assets/images/favicon.png')}
              style={styles.babyIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  scrollContainer: {
    paddingRight: 0,
    paddingLeft: 0,
    gap: 0, // المسافة بين الـ cards
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  weekCard: {
    backgroundColor: 'rgb(37, 207, 240)',
    width: 200,
    height: 250,
    borderRadius: 16,
    padding: 26,
    justifyContent: 'space-between',
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weekNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  babyIcon: {
    width: 80,
    height: 80,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 26,
    color: '#000',
    marginBottom: 12,
    textAlign: 'left',
  },
});
