// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { FontAwesome } from '@expo/vector-icons';
// import { ExpandedSections } from '../types/profile.types';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// interface SavedWeek {
//   weekNumber: number;
//   title: string;
// }

// interface SavedItemsProps {
//   expandedSections: ExpandedSections;
//   toggleSection: (section: keyof ExpandedSections) => void;
//   savedWeeks?: SavedWeek[];
// }

// export default function SavedItems({ 
//   expandedSections, 
//   toggleSection,
//   savedWeeks = [] 
// }: SavedItemsProps) {
//   return (
//     <View style={styles.container}>
//       <ThemedText style={styles.cardTitle}>Saved Items</ThemedText>
      
//       {/* Diseases Section */}
//       <TouchableOpacity 
//         style={styles.sectionHeader} 
//         onPress={() => toggleSection('diseases')}
//       >
//         <ThemedText style={styles.sectionTitle}>Diseases</ThemedText>
//         <FontAwesome 
//           name={expandedSections.diseases ? 'chevron-up' : 'chevron-down'} 
//           size={16} 
//           color="#495057" 
//         />
//       </TouchableOpacity>
//       {expandedSections.diseases && (
//         <View style={styles.sectionContent}>
//           <ThemedText style={styles.emptyText}>No saved diseases</ThemedText>
//         </View>
//       )}

//       {/* Weeks Section */}
//       <TouchableOpacity 
//         style={styles.sectionHeader} 
//         onPress={() => toggleSection('weeks')}
//       >
//         <ThemedText style={styles.sectionTitle}>Weeks</ThemedText>
//         <FontAwesome 
//           name={expandedSections.weeks ? 'chevron-up' : 'chevron-down'} 
//           size={16} 
//           color="#495057" 
//         />
//       </TouchableOpacity>
//       {expandedSections.weeks && (
//         <View style={styles.sectionContent}>
//           {savedWeeks.length > 0 ? (
//             savedWeeks.map((week, index) => (
//               <View key={index} style={styles.weekItem}>
//                 <ThemedText style={styles.weekText}>
//                   Week {week.weekNumber}: {week.title}
//                 </ThemedText>
//               </View>
//             ))
//           ) : (
//             <ThemedText style={styles.emptyText}>No saved weeks</ThemedText>
//           )}
//         </View>
//       )}

//       {/* Baby Names Section */}
//       <TouchableOpacity 
//         style={styles.sectionHeader} 
//         onPress={() => toggleSection('babyNames')}
//       >
//         <ThemedText style={styles.sectionTitle}>Baby Names</ThemedText>
//         <FontAwesome 
//           name={expandedSections.babyNames ? 'chevron-up' : 'chevron-down'} 
//           size={16} 
//           color="#495057" 
//         />
//       </TouchableOpacity>
//       {expandedSections.babyNames && (
//         <View style={styles.sectionContent}>
//           <ThemedText style={styles.emptyText}>No saved baby names</ThemedText>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     margin: SCREEN_WIDTH * 0.04,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   cardTitle: {
//     fontSize: SCREEN_WIDTH * 0.045,
//     fontWeight: 'bold',
//     color: '#623AA2',
//     marginBottom: 15,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#495057',
//   },
//   sectionContent: {
//     padding: 12,
//   },
//   emptyText: {
//     color: '#6c757d',
//     fontStyle: 'italic',
//     textAlign: 'center',
//   },
//   weekItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   weekText: {
//     fontSize: 14,
//     color: '#495057',
//   },
// });

