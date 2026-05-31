import { THEME } from '@/theme/theme';
import { Tabs, usePathname } from 'expo-router';
// 💡 Import de Ionicons à la place de lucide-react-native
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// 1. Dictionnaire des icônes (noms de base Ionicons)
// On utilise 'school' pour learn, 'shield' (ou 'flash') pour arena, et 'person' pour profile.
const ICONS: Record<string, string> = {
    learn: 'school',
    arena: 'trophy',
    profile: 'person-circle',
};

// 2. Le composant animé de l'icône
const TabIcon = ({ iconName, color, focused }: { iconName: string, color: string, focused: boolean }) => {
    const translateY = useSharedValue(0);
    const indicatorOpacity = useSharedValue(0);

    useEffect(() => {
        if (focused) {
            translateY.value = withTiming(-4, { duration: 200 });
            indicatorOpacity.value = withTiming(1, { duration: 200 });
        } else {
            // 💡 Idem ici
            translateY.value = withTiming(0, { duration: 200 });
            indicatorOpacity.value = withTiming(0, { duration: 200 });
        }
    }, [focused]);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        opacity: indicatorOpacity.value,
    }));

    // 💡 Logique pour alterner entre la version pleine et la version "-outline"
    const currentIconName = focused ? iconName : `${iconName}-outline`;

    return (
        <View style={styles.iconWrapper}>
            <Animated.View style={[styles.iconInner, animatedIconStyle]}>
                {/* 💡 Remplacement par Ionicons */}
                <Ionicons
                    name={currentIconName as any}
                    size={24}
                    color={color}
                />

                <Animated.View
                    style={[
                        styles.indicator,
                        animatedIndicatorStyle,
                        { backgroundColor: THEME.colors.primary }
                    ]}
                />
            </Animated.View>
        </View>
    );
};

// 3. LA CUSTOM TAB BAR (Elle remplace celle par défaut)
function FloatingTabBar({ state, descriptors, navigation }: any) {
    const pathname = usePathname();
    if (
        pathname.includes('/game')
        || pathname.includes('/discovery')
        || pathname.includes('/revision')
    ) {
        return null;
    }

    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;
                const baseIconName = ICONS[route.name];

                if (!baseIconName) return null;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const color = isFocused ? THEME.colors.primary : THEME.colors.text.disabled;

                return (
                    <TouchableOpacity
                        key={route.key}
                        activeOpacity={1}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        {/* 💡 On passe désormais "iconName" au lieu de "Icon" */}
                        <TabIcon iconName={baseIconName} color={color} focused={isFocused} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// 4. LE LAYOUT PRINCIPAL
export default function TabLayout() {
    return (
        <Tabs
            // 💡 On injecte notre Custom Tab Bar ici !
            tabBar={(props) => <FloatingTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="learn" />
            <Tabs.Screen name="arena" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    // 💡 La pilule : libérée de React Navigation, elle obéit enfin à nos règles !
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 40,   // Marges latérales forcées
        right: 40,  // Marges latérales forcées
        height: 64,
        flexDirection: 'row', // Aligne les boutons horizontalement
        backgroundColor: 'rgba(15, 15, 17, 0.95)',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,

        // Ombres
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    tabItem: {
        flex: 1, // Chaque bouton prend un tiers de la pilule
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInner: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    indicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        position: 'absolute',
        bottom: -10, // Le point s'aligne par rapport au bas de l'icône

        // Effet de lueur
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    }
});