import { CyberText } from '@/components/atoms/CyberText';
import { useArenaStore } from '@/store/useArenaStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import RegionBadge from './components/RegionBadge';

export const LicenseMapScreen = () => {
    const router = useRouter();

    const progression = useArenaStore((state) => state.progression);
    const { mode } = useLocalSearchParams<{ mode: string }>();
    const currentMode = mode || 'country';

    const getRegionLevel = (regionCode: string): 0 | 1 | 2 | 3 => {
        const regionData = progression[regionCode];
        if (!regionData) return 0;

        const modeData = regionData[currentMode as 'country' | 'flag' | 'capital'];
        if (!modeData || !modeData.levels) return 0;

        if (modeData.levels[3]?.completed) return 3;
        if (modeData.levels[2]?.completed) return 2;
        if (modeData.levels[1]?.completed) return 1;

        return 0;
    };

    const levelEUR = getRegionLevel('EUR');
    const levelASI = getRegionLevel('ASI');
    const levelAFR = getRegionLevel('AFR');
    const levelAME = getRegionLevel('AME');
    const levelOCE = getRegionLevel('OCE');
    const levelWLD = getRegionLevel('WLD');

    const unlockedRegionsCount = [levelEUR, levelASI, levelAFR, levelAME, levelOCE].filter(l => l >= 1).length;
    const isWorldUnlocked = unlockedRegionsCount >= 5;

    const getModeInfo = () => {
        switch (currentMode) {
            case 'flag': return { title: 'DRAPEAUX', color: THEME.colors.levels.bronze };
            case 'capital': return { title: 'CAPITALES', color: THEME.colors.levels.silver };
            default: return { title: 'PAYS', color: THEME.colors.levels.gold };
        }
    };
    const info = getModeInfo();

    const navigateToRegion = (regionId: string) => {
        router.push({ pathname: '/arena/region-levels', params: { regionId, mode: currentMode } });
    };

    return (
        <View style={styles.container}>
            {/* Header Profil & Bouton retour */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backArrow}>
                <Ionicons name="arrow-back" size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <CyberText variant="h1" style={{ color: THEME.colors.text.primary }}>
                        {info.title}
                    </CyberText>
                    <CyberText variant="caps" style={{ color: THEME.colors.text.secondary, letterSpacing: 2 }}>
                        SÉLECTION DE ZONE
                    </CyberText>
                </View>

                <View style={styles.gridContainer}>
                    <View style={styles.row}>
                        <RegionBadge name="EUROPE" code="EUR" level={levelEUR} onPress={() => navigateToRegion('EUR')} />
                        <RegionBadge name="ASIE" code="ASI" level={levelASI} onPress={() => navigateToRegion('ASI')} />
                    </View>

                    <View style={styles.row}>
                        <RegionBadge name="AFRIQUE" code="AFR" level={levelAFR} onPress={() => navigateToRegion('AFR')} />
                        <RegionBadge name="AMÉRIQUES" code="AME" level={levelAME} onPress={() => navigateToRegion('AME')} />
                    </View>

                    <View style={styles.row}>
                        <RegionBadge name="OCÉANIE" code="OCE" level={levelOCE} onPress={() => navigateToRegion('OCE')} />
                        <View style={{ flex: 1 }} />
                    </View>

                    <View style={{ marginTop: 'auto', paddingTop: 20 }}>
                        <RegionBadge
                            name="MONDE ENTIER"
                            code="WLD"
                            level={levelWLD}
                            onPress={() => navigateToRegion('WLD')}
                            isLarge
                            isLocked={!isWorldUnlocked}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background // Fond unifié OLED
    },
    backArrow: {
        position: 'absolute',
        top: 60, // Ajuster selon le Safe Area
        left: 20,
        zIndex: 10
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 100, // Espace pour la flèche
        flexGrow: 1
    },
    header: {
        marginBottom: 20,
        gap: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
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