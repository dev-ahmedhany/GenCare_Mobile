import { View, StyleSheet, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function UsersManagementScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ThemedText style={styles.header}>إدارة المستخدمين</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 