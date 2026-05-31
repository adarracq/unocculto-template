import { CyberText } from '@/components/atoms/CyberText';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { ALL_COUNTRIES, getFlagImage } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    countryCode: string | null;
    visible: boolean;
    onClose: () => void;
}

type TabType = 'info' | 'about' | 'history';

export default function CountryDetailModal({ countryCode, visible, onClose }: Props) {
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const memoryMap = useLearningStore((state) => state.memoryMap);

    const country = useMemo(() => ALL_COUNTRIES.find(c => c.code === countryCode), [countryCode]);

    if (!country) return null;

    // --- LOGIQUE DE STATUT ---
    const memoryData = memoryMap[country.code];
    const boxLevel = memoryData?.box || 0;
    const isUrgent = boxLevel > 0 && boxLevel < 5 && (memoryData?.nextReviewDate || 0) <= Date.now();

    const getStatusTheme = () => {
        if (boxLevel === 0) return {
            color: THEME.colors.text.disabled,
            title: "NON EXPLORÉ",
            text: "Aucune donnée acquise. Apprentissage requis.",
            icon: 'cube-outline'
        };
        if (boxLevel === 5) return {
            color: THEME.colors.success,
            title: "100% MAÎTRISÉ",
            text: "Dossier validé. Intégration totale en mémoire.",
            icon: 'checkmark-circle'
        };
        if (isUrgent) return {
            color: THEME.colors.danger,
            title: "RÉVISION REQUISE",
            text: "Les données s'effacent. Consolidation prioritaire.",
            icon: 'warning'
        };
        return {
            color: THEME.colors.inProgress,
            title: `EN COURS (Niveau ${boxLevel})`,
            text: "Exploration partielle. Réseau neural en formation.",
            icon: 'sync-circle'
        };
    };

    const statusTheme = getStatusTheme();

    const formatCoordinates = (lat?: number, lng?: number) => {
        if (lat === undefined || lng === undefined) return 'Données indisponibles';
        const latDir = lat >= 0 ? 'N' : 'S';
        const lngDir = lng >= 0 ? 'E' : 'O';
        return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lng).toFixed(2)}° ${lngDir}`;
    };

    return (
        <BaseBottomSheet
            isVisible={visible}
            title={country.name_fr.toUpperCase()}
            onClose={onClose}
        >
            <View style={styles.container}>

                {/* 1. EN-TÊTE GLOBAL (Infos + Statut) */}
                <View style={[
                    styles.headerCard,
                    { borderColor: statusTheme.color + '40', backgroundColor: statusTheme.color + '08' }
                ]}>
                    <View style={styles.headerTop}>
                        <View style={styles.flagWrapper}>
                            <Image source={getFlagImage(country.code)} style={styles.rectangularFlag} resizeMode="cover" />
                        </View>

                        <View style={styles.headerDetails}>
                            <CyberText variant="caps" style={styles.label}>
                                CAPITALE
                            </CyberText>
                            <CyberText variant="h2" style={styles.valueH2}>
                                {country.capital || 'Inconnue'}
                            </CyberText>

                            <CyberText variant="caps" style={styles.label}>
                                CONTINENT
                            </CyberText>
                            <CyberText variant="body" style={[styles.valueBody, { color: statusTheme.color }]}>
                                {country.continentId}
                            </CyberText>
                        </View>
                    </View>

                    <View style={[styles.headerDivider, { backgroundColor: statusTheme.color + '20' }]} />

                    <View style={styles.headerStatus}>
                        <View style={[styles.statusIconBox, { backgroundColor: statusTheme.color + '15' }]}>
                            <Ionicons name={statusTheme.icon as any} size={20} color={statusTheme.color} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <CyberText variant="caps" style={{ color: statusTheme.color, fontSize: 11, letterSpacing: 1 }}>
                                STATUT : {statusTheme.title}
                            </CyberText>
                            <CyberText variant="bodySmall" style={{ color: THEME.colors.text.secondary, marginTop: 2 }}>
                                {statusTheme.text}
                            </CyberText>
                        </View>
                    </View>
                </View>

                {/* 2. SÉLECTEUR D'ONGLETS */}
                <View style={styles.segmentedControl}>
                    <TouchableOpacity onPress={() => setActiveTab('info')} style={[styles.segmentBtn, activeTab === 'info' && styles.segmentBtnActive]}>
                        <CyberText variant="caps" style={[styles.segmentText, activeTab === 'info' && styles.segmentTextActive]}>Fiche</CyberText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('about')} style={[styles.segmentBtn, activeTab === 'about' && styles.segmentBtnActive]}>
                        <CyberText variant="caps" style={[styles.segmentText, activeTab === 'about' && styles.segmentTextActive]}>Présentation</CyberText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('history')} style={[styles.segmentBtn, activeTab === 'history' && styles.segmentBtnActive]}>
                        <CyberText variant="caps" style={[styles.segmentText, activeTab === 'history' && styles.segmentTextActive]}>Histoire</CyberText>
                    </TouchableOpacity>
                </View>

                {/* 3. ZONE DE CONTENU VARIABLE */}
                <View style={styles.contentArea}>

                    {/* ONGLET 1 : FICHE ALLÉGÉE */}
                    {activeTab === 'info' && (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            <View style={styles.generalInfoBox}>
                                <InfoRow icon="chatbubbles-outline" label="Langue(s) officielle(s)" value={country.language || 'N/A'} />
                                <View style={styles.divider} />
                                <InfoRow icon="wallet-outline" label="Monnaie locale" value={country.currency || 'N/A'} />
                                <View style={styles.divider} />
                                <InfoRow icon="people-outline" label="Population" value={`${functions.stringNumber(country.population || 0)} habitants`} />
                                <View style={styles.divider} />
                                <InfoRow icon="compass-outline" label="Coordonnées" value={formatCoordinates(country.latitude, country.longitude)} />
                            </View>
                        </ScrollView>
                    )}

                    {/* ONGLET 2 : PRÉSENTATION */}
                    {activeTab === 'about' && (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            <View style={styles.textPanel}>
                                <View style={styles.panelHeader}>
                                    <Ionicons name="information-circle" size={20} color={statusTheme.color} style={{ marginRight: 8 }} />
                                    <CyberText variant="caps" style={{ color: statusTheme.color, letterSpacing: 1 }}>
                                        INFORMATIONS
                                    </CyberText>
                                </View>
                                <CyberText variant="body" style={{ lineHeight: 26, color: THEME.colors.text.primary, fontSize: 15 }}>
                                    {functions.addLineBreaks(country.intro_fr) || "Aucune description approfondie n'est disponible pour ce territoire à l'heure actuelle."}
                                </CyberText>
                            </View>
                        </ScrollView>
                    )}

                    {/* ONGLET 3 : HISTOIRE */}
                    {activeTab === 'history' && (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            <View style={styles.textPanel}>

                                {(country.dates && country.dates.length > 0) ? (
                                    country.dates.map((item: any, index: number) => (
                                        <View key={index} style={styles.timelineRow}>
                                            <View style={styles.timelineNode}>
                                                <View style={[styles.timelineDot, { backgroundColor: statusTheme.color }]} />
                                                {index < country.dates.length - 1 && <View style={styles.timelineLine} />}
                                            </View>
                                            <View style={styles.timelineContent}>
                                                <CyberText variant="body" style={{ color: statusTheme.color }}>
                                                    {item.year.toString()}
                                                </CyberText>
                                                <CyberText variant="bodySmall" colorType="secondary" style={{ marginTop: 2, fontStyle: 'italic' }}>
                                                    {item.event}
                                                </CyberText>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <CyberText variant="bodySmall" colorType="disabled" align="center" style={{ paddingVertical: 20 }}>
                                        Aucune archive chronologique disponible.
                                    </CyberText>
                                )}
                            </View>
                        </ScrollView>
                    )}

                </View>
            </View>
        </BaseBottomSheet>
    );
}

// Composant interne
const InfoRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <View style={styles.infoRow}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={18} color={THEME.colors.text.primary} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <CyberText variant="caps" style={{ fontSize: 10, color: THEME.colors.text.disabled, letterSpacing: 0.5 }}>
                {label}
            </CyberText>
            <CyberText variant="body" style={{ marginTop: 2, fontSize: 15, color: THEME.colors.text.primary }}>
                {value}
            </CyberText>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
        paddingBottom: 10,
    },

    // --- EN-TÊTE CARD ---
    headerCard: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 16,
        marginBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    flagWrapper: {
        width: 86,
        height: 60,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    rectangularFlag: {
        width: '100%',
        height: '100%',
    },
    headerDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        color: THEME.colors.text.secondary,
        letterSpacing: 1,
    },
    valueH2: {
        fontSize: 20,
        color: THEME.colors.text.primary,
        marginBottom: 8,
    },
    valueBody: {
        color: THEME.colors.primary,
        fontSize: 15,
    },
    headerDivider: {
        height: 1,
        marginVertical: 14,
    },
    headerStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statusIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- SÉLECTEUR D'ONGLETS ---
    segmentedControl: { flexDirection: 'row', backgroundColor: THEME.colors.glass.background, borderRadius: 14, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: THEME.colors.glass.border },
    segmentBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', gap: 6 },
    segmentBtnActive: { backgroundColor: THEME.colors.glass.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
    segmentText: { color: THEME.colors.text.disabled, fontSize: 12 },
    segmentTextActive: { color: THEME.colors.text.primary },

    contentArea: {
        height: 340, // Hauteur ajustée car l'en-tête est plus grand
    },

    // --- FICHE (Onglet 1) ---
    generalInfoBox: {
        backgroundColor: THEME.colors.glass.background,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        gap: 14,
    },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.03)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    divider: { height: 1, backgroundColor: THEME.colors.glass.border, marginLeft: 56 },

    // --- PANNEAUX TEXTUELS (Onglets 2 & 3) ---
    textPanel: {
        backgroundColor: THEME.colors.glass.background,
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border
    },
    panelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.glass.border,
        paddingBottom: 16
    },

    // --- TIMELINE (Onglet 3) ---
    timelineRow: { flexDirection: 'row' },
    timelineNode: { width: 24, alignItems: 'center', marginRight: 16 },
    timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: THEME.colors.primary, zIndex: 2, marginTop: 6 },
    timelineLine: { width: 2, flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginTop: -6, marginBottom: -6, zIndex: 1 },
    timelineContent: { flex: 1, paddingBottom: 24 },
});