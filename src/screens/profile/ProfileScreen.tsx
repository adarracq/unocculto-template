import { CyberText } from '@/components/atoms/CyberText';
import { ALL_COUNTRIES } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import WorldProgressMap from '@/components/organisms/WorldProgressMap'; // Import direct
import { LinearGradient } from 'expo-linear-gradient';
import CountryDetailModal from './components/CountryDetailModal';
import CountryListItem from './components/CountryListItem';
import GlobalStats from './components/GlobalStats';

const REGIONS = [
    { id: 'WLD', name: 'Monde' },
    { id: 'EUR', name: 'Europe' },
    { id: 'ASI', name: 'Asie' },
    { id: 'AFR', name: 'Afrique' },
    { id: 'AME', name: 'Amériques' },
    { id: 'OCE', name: 'Océanie' }
];

export default function ProfileScreen() {
    const memoryMap = useLearningStore((state) => state.memoryMap);

    const [selectedRegion, setSelectedRegion] = useState('WLD');
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

    // 💡 Calculs corrigés : On génère les listes dynamiquement pour la carte !
    const { filteredCountries, stats, validCountries, urgentList, consolidatedList, masteredList } = useMemo(() => {
        // 1. Filtrage par continent
        const countries = selectedRegion === 'WLD' ? ALL_COUNTRIES : ALL_COUNTRIES.filter(c => c.continentId === selectedRegion);

        let visited = 0; let mastered = 0; let urgent = 0;
        const now = Date.now();

        const allCodes: string[] = [];
        const uList: string[] = [];
        const cList: string[] = [];
        const mList: string[] = [];

        countries.forEach(c => {
            allCodes.push(c.code); // Pour le calque de base
            const mem = memoryMap[c.code];

            if (mem && mem.box > 0) {
                visited++;
                if (mem.box === 5) {
                    mastered++;
                    mList.push(c.code);
                } else if (mem.box < 5 && mem.nextReviewDate <= now) {
                    urgent++;
                    uList.push(c.code);
                } else {
                    cList.push(c.code);
                }
            }
        });

        const sorted = [...countries].sort((a, b) => (a.name_fr || '').localeCompare(b.name_fr || ''));

        return {
            filteredCountries: sorted,
            stats: { visited, mastered, urgent, total: countries.length },
            validCountries: allCodes,
            urgentList: uList,
            consolidatedList: cList,
            masteredList: mList
        };
    }, [selectedRegion, memoryMap]);


    return (
        <LinearGradient colors={[THEME.colors.backgroundLight, THEME.colors.background]} style={styles.container}>

            <CyberText variant="h1" style={{ padding: 20 }}>
                Tableau de bord
            </CyberText>

            <View style={styles.segmentedControl}>

                {REGIONS.map(reg => (
                    <TouchableOpacity
                        key={reg.id}
                        activeOpacity={0.8}
                        onPress={() => setSelectedRegion(reg.id)}
                        style={[styles.segmentBtn, selectedRegion === reg.id && styles.segmentBtnActive]}
                    >
                        <CyberText variant="caps" style={[selectedRegion === reg.id ? styles.segmentTextActive : styles.segmentText]}>
                            {reg.id}
                        </CyberText>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.statsContainer}>
                <GlobalStats visited={stats.visited} total={stats.total} mastered={stats.mastered} urgent={stats.urgent} />
            </View>

            <View style={styles.toggleContainer}>
                <View style={styles.toggleTrack}>
                    <TouchableOpacity onPress={() => setViewMode('map')} style={[styles.segmentBtn, viewMode === 'map' && styles.segmentBtnActive]}>
                        <Ionicons name="map-outline" size={16} color={viewMode === 'map' ? THEME.colors.text.primary : THEME.colors.text.disabled} style={{ marginRight: 6 }} />
                        <CyberText variant="caps" style={[viewMode === 'map' ? styles.segmentTextActive : styles.segmentText]}>Carte</CyberText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setViewMode('list')} style={[styles.segmentBtn, viewMode === 'list' && styles.segmentBtnActive]}>
                        <Ionicons name="list-outline" size={16} color={viewMode === 'list' ? THEME.colors.text.primary : THEME.colors.text.disabled} style={{ marginRight: 6 }} />
                        <CyberText variant="caps" style={[viewMode === 'list' ? styles.segmentTextActive : styles.segmentText]}>Liste</CyberText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentArea}>
                {viewMode === 'map' ? (
                    <View style={styles.mapWrapper}>
                        <WorldProgressMap
                            validCountries={selectedRegion === 'WLD' ? undefined : validCountries}
                            urgentCountries={urgentList}
                            consolidatedCountries={consolidatedList}
                            masteredCountries={masteredList}
                            regionId={selectedRegion}
                            onCountryPress={setSelectedCountryCode}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item.code}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 80, gap: 12 }}
                        renderItem={({ item }) => (
                            // 💡 Utilisation du nouveau composant ici
                            <CountryListItem
                                country={item}
                                memoryData={memoryMap[item.code]}
                                onPress={() => setSelectedCountryCode(item.code)}
                            />
                        )}
                    />
                )}
            </View>


            <CountryDetailModal
                countryCode={selectedCountryCode}
                visible={!!selectedCountryCode}
                onClose={() => setSelectedCountryCode(null)}
            />

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40, },
    regionSelectorContainer: { paddingBottom: 20 },
    regionScroll: { paddingHorizontal: 20, gap: 10 },
    statsContainer: { paddingHorizontal: 20, marginBottom: 20 },
    toggleContainer: { paddingHorizontal: 20, marginBottom: 16, alignItems: 'center' },
    toggleTrack: { flexDirection: 'row', backgroundColor: THEME.colors.glass.background, borderRadius: 12, padding: 4 },
    contentArea: { flex: 1, paddingHorizontal: 20, },
    mapWrapper: { flex: 1, marginBottom: 80 },

    logbookRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: THEME.colors.glass.background, // Fond très légèrement visible
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border
    },
    flagWrapper: {
        position: 'relative'
    },
    rowFlag: {
        width: 44,
        height: 44,
        borderRadius: 22, // 💡 Rend le drapeau parfaitement rond
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentedControl: { flexDirection: 'row', backgroundColor: THEME.colors.glass.background, borderRadius: 14, padding: 4, marginBottom: 16, borderWidth: 1, borderColor: THEME.colors.glass.border, marginHorizontal: 20 },
    segmentBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', gap: 6 },
    segmentBtnActive: { backgroundColor: THEME.colors.glass.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
    segmentText: { color: THEME.colors.text.disabled, fontSize: 12 },
    segmentTextActive: { color: THEME.colors.text.primary },
});