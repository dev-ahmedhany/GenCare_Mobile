import { Stack } from 'expo-router';

export default function ManagementLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="management" />
      <Stack.Screen name="weeks-management" />
      <Stack.Screen name="disease-management" />
      <Stack.Screen name="users-management" />
    </Stack>
  );
}