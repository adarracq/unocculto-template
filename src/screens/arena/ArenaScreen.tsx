import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { getDailyMission } from '@/utils/DailyGameManager';
import DailyMissionCard from './components/DailyMissionCard';
import TrainingSelector from './components/TrainingSelector';

export const ArenaScreen = () => {
    const router = useRouter();

    // 1. Récupération dynamique de la mission du jour
    // On utilise useMemo pour éviter de recalculer la date à chaque re-rendu de l'écran
    const dailyMission = useMemo(() => getDailyMission(), []);


    const handleDailyMission = () => {
        // 2. Redirection dynamique basée sur la fonction getDailyMission
        router.push({
            pathname: '/arena/license-map',
            params: {
                mode: dailyMission.modeId,
                regionId: dailyMission.regionId,
                isDailyBonus: 'true' // On passe un flag pour doubler l'XP en fin de partie
            }
        });
        router.push({
            pathname: '/arena/game',
            params: {
                regionId: dailyMission.regionId,
                mode: dailyMission.modeId,
                level: '1', // On force le niveau 1 (QCM) pour la mission quotidienne (ou 2, 3 selon votre choix)
                isDailyBonus: 'true',
                alreadyDone: 'false'
            }
        });
    };

    const handleSelectMode = (mode: 'country' | 'flag' | 'capital') => {
        router.push({
            pathname: '/arena/license-map',
            params: { mode: mode }
        });
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={[THEME.colors.backgroundLight, THEME.colors.background]} style={styles.scrollContent}>

                <CyberText variant="h1" style={{ paddingBottom: 20 }}>
                    Entraînement
                </CyberText>

                {/* 3. Injection des données dynamiques dans la carte */}
                <DailyMissionCard
                    title={dailyMission.title}
                    type={dailyMission.typeLabel} // Remplace l'ancien "type"
                    bonus={dailyMission.bonus}
                    regionId={dailyMission.regionId}
                    onPress={handleDailyMission}
                />

                <TrainingSelector onSelect={handleSelectMode} />


            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },
});