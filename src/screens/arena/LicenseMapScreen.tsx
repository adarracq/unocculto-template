import { MyText } from '@/components/atoms/MyText';
import { GAME_CONFIG, GameMode } from '@/constants/GameConfig'; // 💡 Assure-toi que le chemin d'import est correct
import { useArenaStore } from '@/store/useArenaStore';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RegionBadge from './components/RegionBadge';

export const LicenseMapScreen = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const progression = useArenaStore((state) => state.progression);
    const { mode } = useLocalSearchParams<{ mode: string }>();
    const currentMode = (mode || 'country') as GameMode;

    // 💡 On récupère directement la config du mode pour avoir la couleur et le nombre de niveaux
    const modeConfig = GAME_CONFIG[currentMode];
    const totalLevelsForMode = modeConfig.levels.length;

    // 💡 Nouvelle logique : compte le nombre exact de niveaux complétés
    const getRegionProgress = (regionCode: string) => {
        let completedLevels = 0;
        const regionData = progression[regionCode];

        if (regionData) {
            const modeData = regionData[currentMode];
            if (modeData && modeData.levels) {
                // On vérifie chaque niveau jusqu'au max de ce mode
                for (let i = 1; i <= totalLevelsForMode; i++) {
                    if (modeData.levels[i]?.completed) {
                        completedLevels++;
                    }
                }
            }
        }

        return { completedLevels, totalLevels: totalLevelsForMode };
    };

    const dataEUR = getRegionProgress('EUR');
    const dataASI = getRegionProgress('ASI');
    const dataAFR = getRegionProgress('AFR');
    const dataAME = getRegionProgress('AME');
    const dataOCE = getRegionProgress('OCE');
    const dataWLD = getRegionProgress('WLD');

    // Le monde est débloqué si au moins 1 niveau a été fait dans TOUTES les régions
    // (Tu peux changer `d.completedLevels >= 1` par `d.completedLevels === d.totalLevels` si tu veux que ce soit plus dur)
    const unlockedRegionsCount = [dataEUR, dataASI, dataAFR, dataAME, dataOCE].filter(d => d.completedLevels >= 1).length;
    const isWorldUnlocked = unlockedRegionsCount >= 5;

    const navigateToRegion = (regionId: string) => {
        router.push({ pathname: '/arena/region-levels', params: { regionId, mode: currentMode } });
    };

    return (
        <LinearGradient
            colors={[THEME.colors.backgroundVeryLight, THEME.colors.background]}
            style={[styles.container, { paddingTop: THEME.paddings.top + insets.top }]}
        >
            <View style={styles.content}>

                {/* 💡 EN-TÊTE COMPACT ET ALIGNÉ À DROITE */}
                <View style={styles.topBar}>

                    {/* Bouton Retour (Gauche) */}
                    <TouchableOpacity
                        onPress={() => { feedbackService.light(); router.back(); }}
                        style={styles.backButton}
                    >
                        <View style={styles.backButtonIcon}>
                            <Ionicons name="arrow-back" size={20} color={THEME.colors.text.primary} />
                        </View>
                    </TouchableOpacity>

                    {/* Bloc Informations (Droite) */}
                    <View style={styles.headerRight}>
                        <MyText variant="caps" style={[styles.cyberSubtitle, { color: modeConfig.color }]}>
                            /// SELECTION DE ZONE
                        </MyText>
                        <MyText variant="h1" style={styles.heroTitle}>
                            {modeConfig.label}
                        </MyText>
                    </View>

                </View>

                {/* --- GRILLE DES RÉGIONS --- */}
                <View style={styles.gridContainer}>
                    <View style={styles.row}>
                        <RegionBadge
                            name="EUROPE"
                            code="EUR"
                            completedLevels={dataEUR.completedLevels}
                            totalLevels={dataEUR.totalLevels}
                            themeColor={modeConfig.color}
                            onPress={() => navigateToRegion('EUR')}
                        />
                        <RegionBadge
                            name="ASIE"
                            code="ASI"
                            completedLevels={dataASI.completedLevels}
                            totalLevels={dataASI.totalLevels}
                            themeColor={modeConfig.color}
                            onPress={() => navigateToRegion('ASI')}
                        />
                    </View>

                    <View style={styles.row}>
                        <RegionBadge
                            name="AFRIQUE"
                            code="AFR"
                            completedLevels={dataAFR.completedLevels}
                            totalLevels={dataAFR.totalLevels}
                            themeColor={modeConfig.color}
                            onPress={() => navigateToRegion('AFR')}
                        />
                        <RegionBadge
                            name="AMÉRIQUES"
                            code="AME"
                            completedLevels={dataAME.completedLevels}
                            totalLevels={dataAME.totalLevels}
                            themeColor={modeConfig.color}
                            onPress={() => navigateToRegion('AME')}
                        />
                    </View>

                    <View style={styles.row}>
                        <RegionBadge
                            name="OCÉANIE"
                            code="OCE"
                            completedLevels={dataOCE.completedLevels}
                            totalLevels={dataOCE.totalLevels}
                            themeColor={modeConfig.color}
                            onPress={() => navigateToRegion('OCE')}
                        />
                        <View style={{ flex: 1 }} />
                    </View>

                    <View style={{ marginTop: 'auto', paddingTop: 20 }}>
                        <RegionBadge
                            name="MONDE ENTIER"
                            code="WLD"
                            completedLevels={dataWLD.completedLevels}
                            totalLevels={dataWLD.totalLevels}
                            themeColor={modeConfig.color}
                            onPress={() => navigateToRegion('WLD')}
                            isLarge
                            isLocked={!isWorldUnlocked}
                        />
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: THEME.paddings.horizontal
    },
    content: {
        flex: 1
    },
    // --- STYLES D'EN-TÊTE COMPACT ---
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    backButton: {
        // padding enlevé pour que le bouton touche le bord gauche visuellement
    },
    backButtonIcon: {
        width: 38,
        height: 38,
        borderRadius: THEME.metrics.radius.sm,
        backgroundColor: THEME.colors.glass.background,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        alignItems: 'flex-end',
        flex: 1, // Prend l'espace restant pour bien coller à droite
        paddingLeft: 20, // Empêche de chevaucher le bouton retour sur les petits écrans
    },
    cyberSubtitle: {
        fontSize: 11,
        letterSpacing: 2,
        marginBottom: 2,
    },
    heroTitle: {
        color: THEME.colors.text.primary,
        fontSize: 32, // Légèrement réduit pour gagner de la place
        lineHeight: 36,
    },
    gridContainer: {
        flex: 1,
        paddingBottom: 20,
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15
    }
});