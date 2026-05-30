import { CyberText } from '@/components/atoms/CyberText';
import { ALL_COUNTRIES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const CONTINENTS = [
    { id: 'EUR', name: 'Europe' },
    { id: 'ASI', name: 'Asie' },
    { id: 'AFR', name: 'Afrique' },
    { id: 'AME', name: 'Amériques' },
    { id: 'OCE', name: 'Océanie' }
];

interface Props {
    memoryMap: Record<string, any>;
}

export default function ContinentStats({ memoryMap }: Props) {

    // Calcul des statistiques par continent
    const statsData = useMemo(() => {
        return CONTINENTS.map(continent => {
            const countriesInContinent = ALL_COUNTRIES.filter(c => c.continentId === continent.id);
            const total = countriesInContinent.length;
            const visited = countriesInContinent.filter(c => memoryMap[c.code] && memoryMap[c.code].box > 0).length;
            const mastered = countriesInContinent.filter(c => memoryMap[c.code] && memoryMap[c.code].box === 5).length;
            const progress = total > 0 ? (visited / total) * 100 : 0;

            return { ...continent, total, visited, mastered, progress };
        });
    }, [memoryMap]);

    return (
        <View style={styles.container}>
            <CyberText variant="caps" colorType="secondary" style={styles.title}>
                PROGRESSION PAR CONTINENT
            </CyberText>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {statsData.map(stat => (
                    <View key={stat.id} style={styles.card}>
                        <CyberText variant="body" style={styles.cardTitle}>{stat.name}</CyberText>

                        <View style={styles.dataRow}>
                            <CyberText variant="bodySmall" colorType="secondary">Explorés</CyberText>
                            <CyberText variant="body" style={{ fontWeight: 'bold' }}>{stat.visited} / {stat.total}</CyberText>
                        </View>

                        <View style={styles.dataRow}>
                            <CyberText variant="bodySmall" colorType="secondary">Maîtrisés</CyberText>
                            <CyberText variant="body" style={{ color: THEME.colors.success }}>{stat.mastered}</CyberText>
                        </View>

                        {/* Petite barre de progression interne */}
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${stat.progress}%` }]} />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    title: {
        fontSize: 10,
        paddingHorizontal: 20,
        marginBottom: 12,
        letterSpacing: 1
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    card: {
        width: 140,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 12,
        color: THEME.colors.text.primary,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressBarBg: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
        marginTop: 8,
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: THEME.colors.primary,
        borderRadius: 2
    }
});