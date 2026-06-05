import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { useLearningStore } from '@/store/useLearningStore';
import { useStreakStore } from '@/store/useStreakStore';
import { THEME } from '@/theme/theme';
import { Button, StyleSheet, View } from 'react-native'; // 💡 N'oubliez pas d'importer Alert !

export default function DebugStreakTools() {
    const checkAndIncrementStreak = useStreakStore(state => state.checkAndIncrementStreak);
    const streakCount = useStreakStore(state => state.streakCount);

    const ONE_DAY = 24 * 60 * 60 * 1000;

    const simulateHier = () => {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        useStreakStore.setState({ lastActiveDate: midnight - ONE_DAY });
        checkAndIncrementStreak();
    };

    const simulateOubli = () => {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        useStreakStore.setState({
            lastActiveDate: midnight - (ONE_DAY * 2),
            streakCount: 5
        });
        checkAndIncrementStreak();
    };

    const resetTout = () => {
        useStreakStore.setState({
            lastActiveDate: null,
            streakCount: 0,
            previousStreak: 0,
            status: null,
            isModalVisible: false
        });
    };

    return (
        <View style={styles.debugBox}>
            <MyText variant="caps" style={{ color: '#FF00FF', marginBottom: 10 }}>
                🔧 DEV TOOLS (Streak: {streakCount})
            </MyText>
            <View style={styles.btnRow}>
                <Button title="Simuler +1 Jour" onPress={simulateHier} color="#00FF00" />
                <Button title="Simuler Perte" onPress={simulateOubli} color="#FF0000" />
                <Button title="Reset Data" onPress={resetTout} color="#AAAAAA" />
            </View>

            <View style={{ marginTop: 16 }}>
                <MyButton
                    title="[DEBUG] FORCER RÉVISIONS"
                    variant="outline"
                    onPress={() => {
                        const now = Date.now();
                        const testCountries = ['FR', 'JP'];
                        const testCountries2 = ['US', 'DE'];

                        // 💡 CORRECTION ICI : Un seul setState global !
                        useLearningStore.setState((state) => {
                            const newMemoryMap = { ...state.memoryMap };

                            testCountries.forEach(code => {
                                newMemoryMap[code] = {
                                    ...newMemoryMap[code], // On garde les anciennes données au cas où
                                    box: 4,
                                    nextReviewDate: now - 10000, // On force dans le passé pour créer l'urgence
                                    step: 'basics'
                                };
                            });

                            testCountries2.forEach(code => {
                                newMemoryMap[code] = {
                                    ...newMemoryMap[code], // On garde les anciennes données au cas où
                                    box: 2,
                                    nextReviewDate: now + 10000, // On force dans le futur pour créer l'urgence
                                    step: 'basics'
                                };
                            });

                            return { memoryMap: newMemoryMap };
                        });
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    debugBox: {
        margin: 20,
        padding: 15,
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
        borderWidth: 1,
        borderColor: '#FF00FF',
        borderRadius: THEME.metrics.radius.sm,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: THEME.metrics.spacing.sm,
    }
});