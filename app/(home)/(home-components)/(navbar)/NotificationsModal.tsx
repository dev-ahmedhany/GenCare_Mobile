import React from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
  },
  menuItemsContainer: {
    position: 'absolute',
    right: SCREEN_WIDTH * 0.05,
    top: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    width: Math.min(SCREEN_WIDTH * 0.85, 340),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  notificationsContainer: {
    maxHeight: '80%',
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  clearButton: {
    color: '#623AA2',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    maxHeight: 400,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  unreadNotification: {
    backgroundColor: 'rgba(98, 58, 162, 0.05)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#623AA2',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  emptyNotifications: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptySubText: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
});

interface NotificationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearAll: () => void;
  onNotificationPress: (notification: Notification) => void;
}

export default function NotificationsModal({
  isVisible,
  onClose,
  notifications,
  onClearAll,
  onNotificationPress
}: NotificationsModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View style={[styles.menuItemsContainer, styles.notificationsContainer]}>
              <View style={styles.notificationsHeader}>
                <Text style={styles.notificationsTitle}>Notifications</Text>
                {notifications.length > 0 && (
                  <TouchableOpacity onPress={onClearAll}>
                    <Text style={styles.clearButton}>Clear all</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <TouchableOpacity 
                      key={notification.id}
                      style={[
                        styles.menuItem,
                        !notification.isRead && styles.unreadNotification
                      ]}
                      onPress={() => onNotificationPress(notification)}
                    >
                      <View style={styles.menuIconContainer}>
                        <Ionicons 
                          name={notification.icon as any}
                          size={20}
                          color="#623AA2"
                        />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>{notification.title}</Text>
                        <Text style={styles.menuDescription}>{notification.description}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                      {!notification.isRead && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyNotifications}>
                    <Ionicons 
                      name="notifications-off-outline"
                      size={40}
                      color="#999"
                      style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyText}>No notifications yet</Text>
                    <Text style={styles.emptySubText}>We'll notify you when something arrives</Text>
                  </View>
                )}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
} 