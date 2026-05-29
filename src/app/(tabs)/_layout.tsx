import { THEME } from '@/theme/theme';
import { Tabs } from 'expo-router';
import { CircleUser, GraduationCap, Radar, Swords } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: THEME.colors.primary,
                tabBarInactiveTintColor: THEME.colors.text.secondary,
                tabBarLabelStyle: { fontSize: 10, marginTop: -5, marginBottom: 5, letterSpacing: 1 },
            }}
        >
            <Tabs.Screen
                name="learn"
                options={{
                    title: 'ACADÉMIE',
                    tabBarIcon: ({ color }) => (
                        // Utilise ton icone ou un composant vectoriel
                        <GraduationCap size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: 'RADAR',
                    tabBarIcon: ({ color }) => (
                        <Radar size={24} color={color} />

                    ),
                }}
            />
            <Tabs.Screen
                name="arena"
                options={{
                    title: 'ARÈNE',
                    tabBarIcon: ({ color }) => (
                        <Swords size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="passport"
                options={{
                    title: 'PASSEPORT',
                    tabBarIcon: ({ color }) => (
                        <CircleUser size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: THEME.colors.background,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        height: 60, // Ajuste selon le design souhaité
    }
});