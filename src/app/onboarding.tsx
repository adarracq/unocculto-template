// src/app/onboarding.tsx
import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    StyleSheet,
    useWindowDimensions,
    View
} from 'react-native';

// 1. Définition des données des slides (Adapté à Unocculto)
const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'UNOCCULTO',
        description: 'Le monde n\'aura plus aucun secret pour vous. Apprenez à placer près de 200 pays, drapeaux et capitales les yeux fermés.',
        icon: 'logo',
        color: THEME.colors.levels.bronze,
    },
    {
        id: '2',
        title: 'MÉMOIRE ACTIVE',
        description: 'Fini le par cœur ennuyeux. Le jeu s\'adapte à votre rythme et cible vos erreurs pour que vous n\'oubliiez plus jamais rien.',
        icon: 'brain',
        color: THEME.colors.levels.silver,
    },
    {
        id: '3',
        title: 'SIMULATION LIBRE',
        description: 'Place à l\'action ! Plongez dans l\'Arène, testez vos réflexes sous la pression du chrono et prouvez votre maîtrise.',
        icon: 'swords',
        color: THEME.colors.levels.gold,
    },
];

export default function OnboardingScreen() {
    const { width } = useWindowDimensions();
    const router = useRouter();

    // 💡 On utilise votre fonction de store pour marquer l'onboarding comme terminé
    const completeOnboarding = useUserStore((state) => state.completeOnboarding);

    const [currentIndex, setCurrentState] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems[0]) {
            setCurrentState(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            completeOnboarding();
            router.replace('/');
        }
    };

    // Composant pour chaque slide
    const RenderItem = ({ item }: { item: typeof ONBOARDING_DATA[0] }) => (
        <View style={[styles.slide, { width }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }]}>
                <Image
                    source={functions.getIconSource(item.icon)}
                    style={{ width: 80, height: 80, tintColor: item.color }}
                />
            </View>
            <View style={styles.textContainer}>
                <MyText variant="h1" align="center" style={[styles.title, { color: item.color }]}>
                    {item.title}
                </MyText>
                <MyText variant="body" colorType="secondary" align="center" style={styles.description}>
                    {item.description}
                </MyText>
            </View>
        </View>
    );

    return (
        <LinearGradient
            colors={[THEME.colors.backgroundVeryLight, THEME.colors.background]}
            style={styles.container}
        >
            {/* Le Carrousel */}
            <FlatList
                data={ONBOARDING_DATA}
                renderItem={({ item }) => <RenderItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />

            {/* Footer : Indicateurs + Bouton */}
            <View style={styles.footer}>
                {/* Points de progression (Dots) */}
                <View style={styles.indicatorContainer}>
                    {ONBOARDING_DATA.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 24, 10],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={i.toString()}
                                style={[styles.dot, {
                                    width: dotWidth,
                                    opacity,
                                    backgroundColor: currentIndex === i ? ONBOARDING_DATA[i].color : THEME.colors.text.disabled
                                }]}
                            />
                        );
                    })}
                </View>

                {/* Bouton Suivant/Démarrer */}
                <MyButton
                    title={currentIndex === ONBOARDING_DATA.length - 1 ? 'COMMENCER' : 'CONTINUER'}
                    onPress={handleNext}
                    iconRight='chevron-forward'
                    variant={currentIndex === ONBOARDING_DATA.length - 1 ? 'outline' : 'default'}

                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: THEME.paddings.horizontal,
    },
    iconContainer: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        borderWidth: 1,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    footer: {
        height: 160,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    indicatorContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginBottom: 20,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
});