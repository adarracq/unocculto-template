import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { functions } from '@/utils/Functions';
import { Tabs, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 1. Dictionnaire des icônes
const ICONS: Record<string, string> = {
    learn: 'school',
    arena: 'earth',
    profile: 'id-card',
};

// 2. Le composant animé de l'icône
const TabIcon = ({ iconName, color, focused }: { iconName: string, color: string, focused: boolean }) => {
    const translateY = useSharedValue(0);
    const indicatorWidth = useSharedValue(0);
    const indicatorOpacity = useSharedValue(0);

    useEffect(() => {
        if (focused) {
            translateY.value = withTiming(-4, { duration: 250, easing: Easing.out(Easing.cubic) });
            indicatorWidth.value = withTiming(16, { duration: 250, easing: Easing.out(Easing.cubic) });
            indicatorOpacity.value = withTiming(1, { duration: 200 });
        } else {
            translateY.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.cubic) });
            indicatorWidth.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.cubic) });
            indicatorOpacity.value = withTiming(0, { duration: 200 });
        }
    }, [focused]);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        width: indicatorWidth.value,
        opacity: indicatorOpacity.value,
    }));

    const currentIconName = focused ? iconName : `${iconName}-outline`;

    return (
        <View style={styles.iconWrapper}>
            <Animated.View style={[styles.iconInner, animatedIconStyle]}>
                <Image
                    source={functions.getIconSource(currentIconName)}
                    style={{
                        width: 26, // Légèrement plus grand pour un look premium
                        height: 26,
                        tintColor: color
                    }}
                    resizeMode="contain"
                />

                {/* 💡 Ligne Néon modernisée au lieu du simple point */}
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

// 3. LA CUSTOM TAB BAR (Flux standard, fixée en bas)
function BottomTabBar({ state, navigation }: any) {
    const pathname = usePathname();
    const insets = useSafeAreaInsets(); // 💡 Gestion propre de l'encoche du bas

    if (
        pathname.includes('/game')
        || pathname.includes('/discovery')
        || pathname.includes('/revision')
    ) {
        return null;
    }

    return (
        <View style={styles.tabBarWrapper}>
            <View
                style={[
                    styles.tabBarContainer,
                    // 💡 On applique le paddingBottom dynamiquement selon l'appareil
                    { paddingBottom: Math.max(insets.bottom, 12) }
                ]}
            >
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
                            feedbackService.light();
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const color = isFocused ? THEME.colors.primary : THEME.colors.text.disabled;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            activeOpacity={0.8}
                            onPress={onPress}
                            style={styles.tabItem}
                        >
                            <TabIcon iconName={baseIconName} color={color} focused={isFocused} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

// 4. LE LAYOUT PRINCIPAL
export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="learn" />
            <Tabs.Screen name="arena" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        // 💡 Suppression du 'position: absolute'. La barre prend sa place naturellement en bas.
        width: '100%',
        backgroundColor: THEME.colors.background,
    },
    tabBarContainer: {
        flexDirection: 'row',
        paddingTop: 12, // Espace au-dessus des icônes
        borderTopWidth: 1,
        borderTopColor: THEME.colors.glass.borderHighlight, // Ligne fine pour détacher la barre

        // Ombres inversées (vers le haut) pour la profondeur
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 15,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInner: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 44, // Hauteur constante pour éviter les sauts
    },
    indicator: {
        height: 3, // Épaisseur de la ligne
        borderRadius: 1.5,
        position: 'absolute',
        bottom: -6,

        // Effet Néon Premium
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
    }
});