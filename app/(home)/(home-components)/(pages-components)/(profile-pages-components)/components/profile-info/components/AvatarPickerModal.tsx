import React from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '../ProfileInfoStyles';

interface AvatarPickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAvatar: (avatarName: string) => void;
  avatarImages: { [key: string]: any };
}

const AvatarPickerModal = ({
  isVisible,
  onClose,
  onSelectAvatar,
  avatarImages
}: AvatarPickerModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Choose Profile Image</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#623AA2" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.avatarGrid}>
            {Object.entries(avatarImages).map(([name, image]) => (
              <TouchableOpacity
                key={name}
                style={styles.avatarItem}
                onPress={() => onSelectAvatar(name)}
              >
                <Image source={image} style={styles.avatarImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AvatarPickerModal; 