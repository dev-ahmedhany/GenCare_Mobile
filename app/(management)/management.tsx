import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

export default function ManagementScreen() {
  const managementButtons = [
    {
      title: 'Weeks Management',
      icon: 'calendar-outline' as const,
      route: '/(management)/weeks-management' as const,
    },
    {
      title: 'Disease Management',
      icon: 'medical-outline' as const,
      route: '/(management)/disease-management' as const,
    },
    {
      title: 'Users Management',
      icon: 'people-outline' as const,
      route: '/(management)/users-management' as const,
    },
  ];

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemedText style={styles.header}>Admin Panel</ThemedText>
        </View>
        
        <View style={styles.buttonsContainer}>
          {managementButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                { backgroundColor: index % 2 === 0 ? '#89CFF0' : '#FFB6C1' }
              ]}
              onPress={() => router.push(button.route)}
            >
              <Ionicons name={button.icon} size={28} color="#1a1a1a" />
              <ThemedText style={styles.buttonText}>{button.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}
          
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  headerContainer: {
    paddingTop: 100,
  },
  header: {
    paddingTop: 70,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  buttonsContainer: {
    gap: 25,
    paddingHorizontal: 10,
  },
  button: {
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: '600',
  },
}); 