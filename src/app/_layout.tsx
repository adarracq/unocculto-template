// src/app/_layout.tsx

import { THEME } from '@/theme/theme';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    // On enveloppe le tout pour capter les gestes tactiles
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: THEME.colors.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}