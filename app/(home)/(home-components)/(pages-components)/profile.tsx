import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { bgColors } from '@/constants/Colors';
import MainProfile from './(profile-pages-components)/MainProfile';
import ProfileHeader from './(profile-pages-components)/components/ProfileHeader';

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <ScrollView style={styles.container}>
        <MainProfile />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
});

