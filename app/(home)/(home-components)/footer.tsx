import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Footer() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    // الصفحات الرئيسية
    {
      title: 'Main Pages',
      items: [
        { icon: 'home-outline' as keyof typeof Ionicons.glyphMap, title: 'Home' },
        { icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap, title: 'Pregnancy Weeks' },
        { icon: 'happy-outline' as keyof typeof Ionicons.glyphMap, title: 'Baby Names' },
        { icon: 'brain-outline' as keyof typeof Ionicons.glyphMap, title: 'AI Test' },
      ]
    },
    // قسم الأطباء
    {
      title: 'Our Doctors',
      items: [
        { icon: 'person-outline' as keyof typeof Ionicons.glyphMap, title: 'Dr. Mark' },
        { icon: 'person-outline' as keyof typeof Ionicons.glyphMap, title: 'Dr. Sara' },
        { icon: 'person-outline' as keyof typeof Ionicons.glyphMap, title: 'Dr. John' },
      ]
    },
    // معلومات الاتصال
    {
      title: 'Support',
      items: [
        { icon: 'mail-outline' as keyof typeof Ionicons.glyphMap, title: 'example@gmail.com' },
        { icon: 'call-outline' as keyof typeof Ionicons.glyphMap, title: '+20 12345678910' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#495057" />
          <ThemedText style={styles.navText}>Home</ThemedText>
        </TouchableOpacity>
        

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => setIsSideMenuOpen(true)}
        >
          <Ionicons name="settings-outline" size={24} color="#495057" />
          <ThemedText style={styles.navText}>Settings</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Side Menu Modal */}
      <Modal
        visible={isSideMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsSideMenuOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsSideMenuOpen(false)}
        >
          <View style={styles.sideMenu}>
            <View style={styles.sideMenuHeader}>
              <ThemedText style={styles.sideMenuTitle}>Menu</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsSideMenuOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#495057" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {menuItems.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.menuSection}>
                  <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
                  {section.items.map((item, itemIndex) => (
                    <TouchableOpacity 
                      key={itemIndex}
                      style={styles.menuItem}
                      onPress={() => {
                        // Handle navigation here
                        setIsSideMenuOpen(false);
                      }}
                    >
                      <Ionicons name={item.icon} size={24} color="#495057" />
                      <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
  },
  navButton: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#495057',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  sideMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sideMenuHeader: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sideMenuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
  },
  closeButton: {
    padding: 5,
  },
  menuSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    paddingLeft: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#495057',
  },
});
