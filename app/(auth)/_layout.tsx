import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
<<<<<<< HEAD
    <Stack 
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
=======
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="verifyEmail" />
>>>>>>> master
    </Stack>
  );
} 