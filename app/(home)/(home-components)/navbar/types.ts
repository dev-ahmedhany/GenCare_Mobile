import { Animated } from 'react-native';

export interface NavbarProps {
  scrollY: Animated.Value;
  variant?: 'default' | 'simple';
  showNotifications?: boolean;
  showProfile?: boolean;
  customLogo?: any;
  onNotificationPress?: () => void;
}

export interface MenuItem {
  icon: string;
  title: string;
  description: string;
  route?: string;
  onPress?: () => void;
  adminOnly?: boolean;
}

export interface Notification {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export type ScrollHandler = (event: any) => void; 