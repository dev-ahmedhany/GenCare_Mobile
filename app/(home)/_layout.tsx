import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff', // تعيين لون خلفية موحد
          
        },
        animation: 'none', // إيقاف الانيميشن بين الصفحات
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen 
        name="(home-components)" 
        options={{
          contentStyle: {
            marginTop: 0, // إزالة أي هوامش علوية
            paddingTop: 0, // إزالة أي حشو علوي
          }
        }}
      />
    </Stack>
  );
} 