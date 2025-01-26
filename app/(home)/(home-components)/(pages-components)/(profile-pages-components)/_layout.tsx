import { Stack } from 'expo-router';

export default function ProfilePagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="ProfileSplash" />
      <Stack.Screen 
        name="components/MainProfile"
        options={{
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen name="components/ProfileInfo" />
      <Stack.Screen name="components/PregnancySection" />
      <Stack.Screen name="components/HealthSection" />
      <Stack.Screen name="components/ProfileHeader" />
      <Stack.Screen name="components/SavedItems" />
    </Stack>
  );
} 