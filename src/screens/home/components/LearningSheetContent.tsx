// src/screens/home/components/LearningSheetContent.tsx
import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { ALL_COUNTRIES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    currentZoneId: string;
    onSelectZone: (id: string) => void;
    remainingCount: number; // Du store, calculé selon la zone actuelle
    onStartLearning: () => void;
    memoryMap: Record<string, any>;
}

const CONTINENTS = [
    { id: 'EUR', name: 'EUROPE' },
    { id: 'ASI', name: 'ASIE' },
    { id: 'AFR', name: 'AFRIQUE' },
    { id: 'AME', name: 'AMÉRIQUES' },
    { id: 'OCE', name: 'OCÉANIE' }
];

export default function LearningSheetContent({ currentZoneId, onSelectZone, remainingCount, onStartLearning, memoryMap }: Props) {
    const getZoneProgress = (zoneId: string) => {
        const total = ALL_COUNTRIES.filter(c => c.continentId === zoneId).length;
        if (total === 0) return 0;
        const learned = ALL_COUNTRIES.filter(c => c.continentId === zoneId && memoryMap[c.code]?.box > 0).length;
        return Math.round((learned / total) * 100);
    };

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                {CONTINENTS.map((item) => {
                    const isSelected = currentZoneId === item.id;
                    const progress = getZoneProgress(item.id);

                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.7}
                            onPress={() => onSelectZone(item.id)}
                            style={[styles.zoneRow, isSelected && styles.zoneRowActive]}
                        >
                            <View style={styles.leftInfo}>
                                <Ionicons name={isSelected ? "radio-button-on" : "radio-button-off"} size={20} color={isSelected ? THEME.colors.primary : THEME.colors.text.disabled} />
                                <CyberText variant="body" style={{ fontSize: 16, color: isSelected ? THEME.colors.text.primary : THEME.colors.text.secondary }}>
                                    {item.name}
                                </CyberText>
                            </View>
                            <CyberText variant="caps" style={{ fontSize: 12, color: progress === 100 ? THEME.colors.success : THEME.colors.text.secondary }}>
                                {progress}%
                            </CyberText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <MyButton
                title={remainingCount > 0 ? "LANCER L'APPRENTISSAGE" : "ZONE COMPLÉTÉE"}
                subtitle={remainingCount > 0 ? `4 nouveaux pays à découvrir` : `Toutes les données sont acquises`}
                iconRight="arrow-forward"
                disabled={remainingCount === 0}
                onPress={onStartLearning}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingTop: 10, paddingBottom: 10 },
    listContainer: { gap: 10, marginBottom: 24 },
    zoneRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'transparent' },
    zoneRowActive: { borderColor: THEME.colors.primary, backgroundColor: 'rgba(255,255,255,0.05)' },
    leftInfo: { flexDirection: 'row', alignItems: 'center', gap: 16 }
});