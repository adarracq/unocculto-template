import { CyberText } from '@/components/atoms/CyberText';
import { ALL_COUNTRIES, getFlagImage } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import WorldProgressMap from '@/components/organisms/WorldProgressMap'; // Import direct
import { LinearGradient } from 'expo-linear-gradient';
import CountryDetailModal from './components/CountryDetailModal';
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

    const getStatusInfo = (countryCode: string) => {
        const mem = memoryMap[countryCode];
        if (!mem || mem.box === 0) return { color: THEME.colors.text.disabled, text: 'Non exploré' };
        if (mem.box === 5) return { color: THEME.colors.success, text: 'Maîtrisé' };
        if (mem.nextReviewDate <= Date.now()) return { color: THEME.colors.danger, text: 'À réviser' };
        return { color: THEME.colors.primary, text: 'En apprentissage' };
    };

    const renderCountryItem = ({ item }: { item: typeof ALL_COUNTRIES[0] }) => {
        const mem = memoryMap[item.code];
        const isMastered = mem?.box === 5;
        const isUrgent = mem?.box > 0 && mem?.box < 5 && mem?.nextReviewDate <= Date.now();
        const isLearning = mem?.box > 0 && mem?.box < 5 && !isUrgent;

        // Détermination de la couleur du titre (Or si maîtrisé, Blanc sinon)
        const titleColor = isMastered ? THEME.colors.success : THEME.colors.text.primary;

        // Texte de sous-titre personnalisé selon le statut
        let subtitleText = 'Non exploré';
        if (isMastered) subtitleText = 'Maîtrisé';
        else if (isUrgent) subtitleText = 'À réviser';
        else if (isLearning) subtitleText = `Apprentissage (Niv ${mem.box})`;

        let borderColor = 'rgba(255,255,255,0.05)'; // Couleur par défaut
        if (isMastered) borderColor = THEME.colors.success + '20';
        else if (isUrgent) borderColor = THEME.colors.danger + '20';
        else if (isLearning) borderColor = THEME.colors.secondary + '20';

        let backgroundColor = 'rgba(255,255,255,0.02)'; // Fond très légèrement visible
        if (isMastered) backgroundColor = THEME.colors.success + '10';
        else if (isUrgent) backgroundColor = THEME.colors.danger + '10';
        else if (isLearning) backgroundColor = THEME.colors.secondary + '10';

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedCountryCode(item.code)}
                style={[styles.logbookRow, { borderColor, backgroundColor }]} // 💡 Nouveau style appliqué ici
            >
                {/* 1. Drapeau Rond */}
                <View style={styles.flagWrapper}>
                    <Image source={getFlagImage(item.code)} style={styles.rowFlag} resizeMode="cover" />
                </View>

                {/* 2. Textes (Titre + Icône de validation + Sous-titre) */}
                <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                        <CyberText variant="body" style={{ fontFamily: 'Jakarta-Bold', color: titleColor }}>
                            {item.name_fr.toUpperCase()}
                        </CyberText>
                        {isMastered && (
                            <Ionicons name="checkmark-circle" size={16} color={THEME.colors.success} style={{ marginLeft: 6 }} />
                        )}
                        {isUrgent && (
                            <Ionicons name="warning" size={16} color={THEME.colors.danger} style={{ marginLeft: 6 }} />
                        )}
                    </View>

                    <CyberText variant="bodySmall" colorType="secondary" style={{ marginTop: 2 }}>
                        {item.capital || 'Capitale inconnue'}  •  {subtitleText}
                    </CyberText>
                </View>

                {/* 3. Icône de navigation à droite */}
                <Ionicons name="chevron-forward" size={20} color={THEME.colors.text.disabled} />
            </TouchableOpacity>
        );
    };

    return (
        <LinearGradient colors={[THEME.colors.backgroundLight, THEME.colors.background]} style={styles.container}>

            <CyberText variant="h1" style={{ padding: 20 }}>
                Tableau de bord
            </CyberText>
            <View style={styles.regionSelectorContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.regionScroll}>
                    {REGIONS.map(reg => (
                        <TouchableOpacity
                            key={reg.id}
                            activeOpacity={0.8}
                            onPress={() => setSelectedRegion(reg.id)}
                            style={[styles.regionPill, selectedRegion === reg.id && styles.regionPillActive]}
                        >
                            <CyberText variant="caps" style={{ fontSize: 12, color: selectedRegion === reg.id ? THEME.colors.background : THEME.colors.text.primary }}>
                                {reg.id}
                            </CyberText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.statsContainer}>
                <GlobalStats visited={stats.visited} total={stats.total} mastered={stats.mastered} urgent={stats.urgent} />
            </View>

            <View style={styles.toggleContainer}>
                <View style={styles.toggleTrack}>
                    <TouchableOpacity onPress={() => setViewMode('map')} style={[styles.toggleBtn, viewMode === 'map' && styles.toggleBtnActive]}>
                        <Ionicons name="map-outline" size={16} color={viewMode === 'map' ? THEME.colors.primary : THEME.colors.text.disabled} style={{ marginRight: 6 }} />
                        <CyberText variant="caps" style={{ fontSize: 10, color: viewMode === 'map' ? THEME.colors.primary : THEME.colors.text.disabled }}>Carte</CyberText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setViewMode('list')} style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}>
                        <Ionicons name="list-outline" size={16} color={viewMode === 'list' ? THEME.colors.primary : THEME.colors.text.disabled} style={{ marginRight: 6 }} />
                        <CyberText variant="caps" style={{ fontSize: 10, color: viewMode === 'list' ? THEME.colors.primary : THEME.colors.text.disabled }}>Liste</CyberText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentArea}>
                {viewMode === 'map' ? (
                    <View style={styles.mapWrapper}>
                        {/* 💡 Les props sont maintenant bien définies et passées */}
                        <WorldProgressMap
                            validCountries={validCountries}
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
                        contentContainerStyle={{ paddingBottom: 40, gap: 12 }} // 💡 Espacement entre les cartes
                        renderItem={({ item }) => {
                            const { color, text } = getStatusInfo(item.code);
                            return renderCountryItem({ item });
                        }}
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
    container: { flex: 1, paddingTop: 40 },
    regionSelectorContainer: { paddingTop: 10, paddingBottom: 16 },
    regionScroll: { paddingHorizontal: 20, gap: 10 },
    regionPill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    regionPillActive: { backgroundColor: THEME.colors.text.primary, borderColor: THEME.colors.text.primary },
    statsContainer: { paddingHorizontal: 20, marginBottom: 20 },
    toggleContainer: { paddingHorizontal: 20, marginBottom: 16, alignItems: 'center' },
    toggleTrack: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4 },
    toggleBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 24, borderRadius: 8 },
    toggleBtnActive: { backgroundColor: 'rgba(255,255,255,0.1)' },
    contentArea: { flex: 1, paddingHorizontal: 20 },
    mapWrapper: { flex: 1, marginBottom: 20 },
    countryCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    //flagWrapper: { width: 42, height: 28, borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginRight: 12 },
    flag: { width: '100%', height: '100%' },
    statusWrapper: { alignItems: 'flex-end', justifyContent: 'center', paddingLeft: 12 },
    statusIndicator: { width: 6, height: 6, borderRadius: 3 },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 12, // 💡 Espacement entre les cartes
    },
    logbookRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: 'rgba(255,255,255,0.02)', // Fond très légèrement visible
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)'
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
});