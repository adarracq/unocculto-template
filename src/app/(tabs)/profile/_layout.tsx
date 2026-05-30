import { Stack } from 'expo-router';
import { THEME } from '../../../theme/theme';

export default function ProfileNavigator() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: THEME.colors.background },
                animation: 'slide_from_right', // Animation fluide native (Style iOS/Premium)
            }}
        >
            {/* L'écran principal du profil */}
            <Stack.Screen name="index" />

        </Stack>
    );
}