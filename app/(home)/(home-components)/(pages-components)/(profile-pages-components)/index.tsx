import React, { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

export default function ProfileIndex() {
  useEffect(() => {
    router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/ProfileSplash');
  }, []);

  return <View />;
}