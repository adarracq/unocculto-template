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
        if (boxLevel === 0) return { color: THEME.colors.text.disabled, title: "NON EXPLORÉ", text: "Aucune donnée acquise. Apprentissage requis." };
        if (boxLevel === 5) return { color: THEME.colors.success, title: "100% MAÎTRISÉ", text: "Dossier validé. Intégration totale en mémoire." };
        if (isUrgent) return { color: THEME.colors.danger, title: "RÉVISION REQUISE", text: "Les données s'effacent. Consolidation prioritaire." };
        return { color: THEME.colors.primary, title: `EN COURS (Niveau ${boxLevel})`, text: "Exploration partielle. Réseau neural en formation." };
    };

    const statusTheme = getStatusTheme();

    return (
        <BaseBottomSheet
            isVisible={visible}
            title={country.name_fr.toUpperCase()}
            onClose={onClose}
        >
            <View style={styles.container}>

                {/* 1. EN-TÊTE FIXE : Drapeau & Capitale */}
                <View style={styles.headerBox}>
                    <View style={styles.flagWrapper}>
                        <Image source={getFlagImage(country.code)} style={styles.headerFlag} resizeMode="cover" />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <CyberText variant="caps" style={{ fontSize: 10, color: THEME.colors.text.secondary, letterSpacing: 1 }}>
                            CAPITALE
                        </CyberText>
                        <CyberText variant="h2" style={{ fontSize: 18, color: THEME.colors.text.primary, marginBottom: 8 }}>
                            {country.capital || 'Inconnue'}
                        </CyberText>

                        <CyberText variant="caps" style={{ fontSize: 10, color: THEME.colors.text.secondary, letterSpacing: 1 }}>
                            CONTINENT
                        </CyberText>
                        <CyberText variant="body" style={{ fontWeight: 'bold', color: THEME.colors.primary }}>
                            {country.continentId}
                        </CyberText>
                    </View>
                </View>

                {/* 2. BARRE D'ONGLETS FIXE */}
                <View style={styles.tabsRow}>
                    <TouchableOpacity onPress={() => setActiveTab('info')} style={[styles.tabButton, activeTab === 'info' && styles.tabButtonActive]}>
                        <CyberText variant="caps" style={[styles.tabText, activeTab === 'info' && { color: THEME.colors.primary }]}>Fiche</CyberText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('about')} style={[styles.tabButton, activeTab === 'about' && styles.tabButtonActive]}>
                        <CyberText variant="caps" style={[styles.tabText, activeTab === 'about' && { color: THEME.colors.primary }]}>Présentation</CyberText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('history')} style={[styles.tabButton, activeTab === 'history' && styles.tabButtonActive]}>
                        <CyberText variant="caps" style={[styles.tabText, activeTab === 'history' && { color: THEME.colors.primary }]}>Histoire</CyberText>
                    </TouchableOpacity>
                </View>

                {/* 3. ZONE DE CONTENU VARIABLE */}
                <View style={styles.contentArea}>

                    {/* ONGLET 1 : FICHE & STATUT */}
                    {activeTab === 'info' && (
                        <View style={{ gap: 20 }}>
                            <View style={styles.generalInfoBox}>
                                <InfoRow icon="chatbubbles-outline" label="Langue(s) officielle(s)" value={country.language || 'N/A'} />
                                <View style={styles.divider} />
                                <InfoRow icon="wallet-outline" label="Monnaie locale" value={country.currency || 'N/A'} />
                                <View style={styles.divider} />
                                <InfoRow icon="people-outline" label="Population" value={`${functions.stringNumber(country.population || 0)} habitants`} />
                            </View>

                            <View style={[styles.statusBox, { borderColor: statusTheme.color + '50', backgroundColor: statusTheme.color + '05' }]}>
                                <CyberText variant="caps" style={{ fontSize: 10, color: THEME.colors.text.secondary, marginBottom: 8, letterSpacing: 1 }}>STATUT D'ACQUISITION</CyberText>
                                <CyberText variant="h2" style={{ color: statusTheme.color, marginBottom: 4 }}>
                                    {statusTheme.title}
                                </CyberText>
                                <CyberText variant="bodySmall" style={{ color: THEME.colors.text.secondary }}>
                                    {statusTheme.text}
                                </CyberText>
                            </View>
                        </View>
                    )}

                    {/* ONGLET 2 : PRÉSENTATION (Scrollable si long) */}
                    {activeTab === 'about' && (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            <CyberText variant="body" style={{ lineHeight: 26, color: THEME.colors.text.primary, fontSize: 15 }}>
                                {country.intro_fr || "Aucune description approfondie n'est disponible pour ce territoire à l'heure actuelle."}
                            </CyberText>
                        </ScrollView>
                    )}

                    {/* ONGLET 3 : HISTOIRE (Timeline scrollable) */}
                    {activeTab === 'history' && (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            {(country.dates && country.dates.length > 0) ? (
                                <View style={styles.timelineContainer}>
                                    {country.dates.map((item: any, index: number) => (
                                        <View key={index} style={styles.timelineRow}>
                                            <View style={styles.timelineYearBox}>
                                                <CyberText variant="body" style={{ fontWeight: 'bold', color: THEME.colors.primary, fontSize: 16 }}>
                                                    {item.year}
                                                </CyberText>
                                            </View>
                                            <View style={styles.timelineDivider} />
                                            <View style={styles.timelineContent}>
                                                <CyberText variant="body" style={{ color: THEME.colors.text.primary }}>
                                                    {item.event}
                                                </CyberText>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <CyberText variant="bodySmall" colorType="disabled" align="center" style={{ paddingVertical: 20 }}>
                                    Aucune donnée chronologique disponible.
                                </CyberText>
                            )}
                        </ScrollView>
                    )}

                </View>
            </View>
        </BaseBottomSheet>
    );
}

// Composant interne pour rendre les lignes d'informations
const InfoRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <View style={styles.infoRow}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={18} color={THEME.colors.text.secondary} />
        </View>
        <View style={{ flex: 1 }}>
            <CyberText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.secondary, letterSpacing: 0.5 }}>
                {label}
            </CyberText>
            <CyberText variant="body" style={{ fontWeight: 'bold', marginTop: 2, fontSize: 15 }}>
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

    // En-tête
    headerBox: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.02)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 20,
    },
    flagWrapper: {
        width: 80,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerFlag: { width: '100%', height: '100%' },

    // Onglets
    tabsRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        marginBottom: 20
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent'
    },
    tabButtonActive: { borderBottomColor: THEME.colors.primary },
    tabText: { fontSize: 12, color: THEME.colors.text.disabled, letterSpacing: 1 },

    // Zone de Contenu
    contentArea: {
        height: 320, // 💡 Hauteur fixe pour éviter que la modale ne saute en changeant d'onglet
    },

    // Fiche & Infos Générales
    generalInfoBox: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        gap: 12,
    },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginLeft: 52 },

    // Boîte de Statut
    statusBox: {
        borderWidth: 1,
        padding: 16,
        borderRadius: 12,
    },

    // Timeline (Dates Clés)
    timelineContainer: { marginLeft: 4, marginTop: 4 },
    timelineRow: { flexDirection: 'row', gap: 16 },
    timelineYearBox: { width: 50, alignItems: 'flex-end', paddingTop: 2 },
    timelineDivider: { width: 2, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: 6 },
    timelineContent: { flex: 1, paddingBottom: 20 },
});