import { THEME } from '@/theme/theme';
import { useRouter } from 'expo-router'; // Import du routeur
import { ScrollView, StyleSheet, View } from 'react-native';

import DailyMissionCard from './components/DailyMissionCard';
import LeaderboardCard from './components/LeaderboardCard';
import TrainingSelector from './components/TrainingSelector';

export const ArenaScreen = () => {
    const router = useRouter(); // Initialisation du routeur

    const mockDailyMission = {
        title: "OPÉRATION : AFRIQUE",
        type: "DRAPEAUX",
        bonus: "XP x2",
        regionId: "AFR"
    };

    const mockLocalRecords = [
        { rank: 1, pseudo: "Europe (Niv. 3)", time: "00:14", accuracy: 100, isUser: true },
        { rank: 2, pseudo: "Asie (Niv. 2)", time: "00:21", accuracy: 95, isUser: false },
        { rank: 3, pseudo: "Afrique (Niv. 1)", time: "00:35", accuracy: 80, isUser: false },
    ];

    const handleDailyMission = () => {
        // Redirection vers le mode lié à la mission du jour
        router.push({
            pathname: '/arena/license-map',
            params: { mode: 'flag' } // La mission du jour est sur les drapeaux
        });
    };

    const handleSelectMode = (mode: 'country' | 'flag' | 'capital') => {
        // Envoi du mode choisi en paramètre à l'écran de la carte
        router.push({
            pathname: '/arena/license-map',
            params: { mode: mode }
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <DailyMissionCard
                    title={mockDailyMission.title}
                    type={mockDailyMission.type}
                    bonus={mockDailyMission.bonus}
                    regionId={mockDailyMission.regionId}
                    onPress={handleDailyMission}
                />

                <TrainingSelector onSelect={handleSelectMode} />

                <LeaderboardCard
                    title="RECORDS LOCAUX"
                    subTitle="MEILLEURS TEMPS"
                    data={mockLocalRecords}
                    limit={10}
                />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },
});