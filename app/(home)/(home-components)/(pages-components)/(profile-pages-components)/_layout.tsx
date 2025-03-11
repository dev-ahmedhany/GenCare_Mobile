import { Stack } from 'expo-router';

export default function ProfilePagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ animation: 'none' }} />
      <Stack.Screen name="ProfileSplash" />
      <Stack.Screen name="components/ProfileInfo" />
      <Stack.Screen name="components/PregnancySection" />
      <Stack.Screen name="components/HealthSection" />
      <Stack.Screen name="components/SavedItems" />
      <Stack.Screen name="components/MainProfile" />
    </Stack>
  );
} 