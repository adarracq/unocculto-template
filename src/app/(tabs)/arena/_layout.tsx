import { Stack } from 'expo-router';
import { THEME } from '../../../theme/theme';

export default function ArenaNavigator() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: THEME.colors.background },
                animation: 'slide_from_right', // Animation fluide native (Style iOS/Premium)
            }}
        >
            {/* L'écran principal de l'arène */}
            <Stack.Screen name="index" />

            {/* L'écran du parcours de licences */}
            <Stack.Screen name="license-map" />

            {/* L'écran de jeu pour les épreuves géographiques */}
            <Stack.Screen name="game" />
        </Stack>
    );
}