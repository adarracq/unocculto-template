import { CyberText } from '@/components/atoms/CyberText'; // Ajustez l'import
import { useStreakStore } from '@/store/useStreakStore';
import { Button, StyleSheet, View } from 'react-native';

export default function DebugStreakTools() {
    const checkAndIncrementStreak = useStreakStore(state => state.checkAndIncrementStreak);
    const streakCount = useStreakStore(state => state.streakCount);

    const ONE_DAY = 24 * 60 * 60 * 1000;

    // Triche 1 : Fait croire à l'app qu'on s'est connectés hier
    const simulateHier = () => {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        useStreakStore.setState({ lastActiveDate: midnight - ONE_DAY });
        checkAndIncrementStreak(); // Déclenche le test
    };

    // Triche 2 : Fait croire à l'app qu'on a raté un jour
    const simulateOubli = () => {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        useStreakStore.setState({
            lastActiveDate: midnight - (ONE_DAY * 2), // Il y a 2 jours
            streakCount: 5 // On triche en se donnant 5 jours pour voir si ça sauvegarde le "previousStreak"
        });
        checkAndIncrementStreak();
    };

    // Triche 3 : Tout effacer
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
            <CyberText variant="caps" style={{ color: '#FF00FF', marginBottom: 10 }}>
                🔧 DEV TOOLS (Streak: {streakCount})
            </CyberText>
            <View style={styles.btnRow}>
                <Button title="Simuler +1 Jour" onPress={simulateHier} color="#00FF00" />
                <Button title="Simuler Perte" onPress={simulateOubli} color="#FF0000" />
                <Button title="Reset Data" onPress={resetTout} color="#AAAAAA" />
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
        borderRadius: 10,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
    }
});