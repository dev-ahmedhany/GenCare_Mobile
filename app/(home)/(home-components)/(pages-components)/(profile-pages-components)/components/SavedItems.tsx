import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function SavedItems() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>saved items</ThemedText>
        {/* محتوى العناصر المحفوظة سيضاف لاحقاً */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#623AA2',
  },
}); 