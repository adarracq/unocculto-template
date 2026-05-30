// src/screens/learn/components/LearningDossier.tsx
import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import CountryFocusMap from '@/components/organisms/CountryFocusMap';
import { getFlagImage } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

interface Props {
    country: any;
    onNextCountry: () => void;
}

export default function LearningDossier({ country, onNextCountry }: Props) {
    const [page, setPage] = useState<1 | 2 | 3>(1);

    const handleNext = () => {
        if (page < 3) {
            setPage((prev) => (prev + 1) as 1 | 2 | 3);
        } else {
            setPage(1);
            onNextCountry();
        }
    };

    // Coordonnées pour la caméra (Fallbacks de sécurité si données manquantes)
    const center: [number, number] = [country.longitude || 0, country.latitude || 0];

    // --- PAGE 1 : MÉTADONNÉES ---
    const renderPage1 = () => (
        <View style={styles.dataGrid}>
            <DataCell icon="business" label="CAPITALE" value={country.capital || 'Inconnue'} />
            <DataCell icon="people" label="POPULATION" value={`${functions.stringNumber(country.population || 0)} hab.`} />
            <DataCell icon="wallet" label="MONNAIE" value={country.currency || 'N/A'} />
            <DataCell icon="chatbubbles" label="LANGUE" value={country.language || 'N/A'} />
        </View>
    );

    // --- PAGE 2 : BRIEFING STRATÉGIQUE ---
    const renderPage2 = () => (
        <View style={styles.textPanel}>
            <View style={styles.panelHeader}>
                <Ionicons name="information-circle" size={20} color={THEME.colors.primary} style={{ marginRight: 8 }} />
                <CyberText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 1 }}>
                    INFORMATIONS
                </CyberText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <CyberText variant="body" style={{ color: THEME.colors.text.primary, lineHeight: 24 }}>
                    {country.intro_fr || "Aucun renseignement supplémentaire n'est disponible pour ce territoire."}
                </CyberText>
            </ScrollView>
        </View>
    );

    // --- PAGE 3 : ÉVÉNEMENTS CLÉS ---
    const renderPage3 = () => {
        const mockDates = country.dates || [];
        return (
            <View style={styles.textPanel}>
                <View style={styles.panelHeader}>
                    <Ionicons name="time" size={20} color={THEME.colors.primary} style={{ marginRight: 8 }} />
                    <CyberText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 1 }}>
                        HISTORIQUE
                    </CyberText>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    {mockDates.length > 0 ? (
                        mockDates.map((item: any, index: number) => (
                            <View key={index} style={styles.timelineRow}>
                                <View style={styles.timelineNode}>
                                    <View style={styles.timelineDot} />
                                    {index < mockDates.length - 1 && <View style={styles.timelineLine} />}
                                </View>
                                <View style={styles.timelineContent}>
                                    <CyberText variant="body" style={{ fontWeight: 'bold', color: THEME.colors.primary }}>
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
                </ScrollView>
            </View>
        );
    };

    const getButtonConfig = () => {
        switch (page) {
            case 1: return { title: "CONSULTER LE BRIEFING", icon: "document-text-outline" as any, variant: "outline" as any };
            case 2: return { title: "ANALYSER L'HISTOIRE", icon: "time-outline" as any, variant: "outline" as any };
            case 3: return { title: "DOSSIER SUIVANT", icon: "chevron-forward" as any, variant: "gradient" as any };
            default: return { title: "SUIVANT", icon: "chevron-forward" as any, variant: "gradient" as any };
        }
    };

    const btnConfig = getButtonConfig();

    return (
        <View style={styles.container}>

            {/* 1. CARTE EN FOND */}
            <CountryFocusMap countryCode={country.code} centerCoordinate={center} zoom={2} />

            {/* 2. HUD FLOTTANT */}
            <View style={styles.hudContainer} pointerEvents="box-none">

                {/* --- EN-TÊTE FIXE (Nom + Drapeau) --- */}
                <View style={styles.headerArea} pointerEvents="none">
                    <View style={styles.flagWrapper}>
                        <Image source={getFlagImage(country.code)} style={styles.flag} resizeMode='cover' />
                        <View style={styles.flagOverlay} />
                    </View>
                    <View style={styles.titleWrapper}>
                        <CyberText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 2 }}>
                            CIBLE //
                        </CyberText>
                        <CyberText variant="h1" style={{ fontSize: 32, marginTop: -4 }} numberOfLines={1}>
                            {country.name_fr?.toUpperCase()}
                        </CyberText>
                    </View>
                </View>

                {/* --- ZONE CENTRALE VIDE (Pour manipuler la carte) --- */}
                <View style={{ flex: 1 }} pointerEvents="none" />

                {/* --- BLOC D'INFORMATION BAS --- */}
                <View style={styles.bottomArea} pointerEvents="box-none">

                    {/* Conteneur des pages avec hauteur maximale pour éviter que le texte ne mange l'écran */}
                    <View style={styles.contentWrapper}>
                        {page === 1 && renderPage1()}
                        {page === 2 && renderPage2()}
                        {page === 3 && renderPage3()}
                    </View>

                    {/* Zone d'action (Bouton + Points) */}
                    <View style={styles.actionBlock}>
                        <View style={styles.pageIndicatorRow}>
                            <View style={[styles.pageDot, page >= 1 ? styles.pageDotActive : null]} />
                            <View style={[styles.pageDot, page >= 2 ? styles.pageDotActive : null]} />
                            <View style={[styles.pageDot, page === 3 ? styles.pageDotActive : null]} />
                        </View>

                        <MyButton
                            title={btnConfig.title}
                            variant={btnConfig.variant}
                            iconRight={btnConfig.icon}
                            onPress={handleNext}
                        />
                    </View>
                </View>

            </View>
        </View>
    );
}

// Sous-composant
const DataCell = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <View style={styles.dataCell}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={16} color={THEME.colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
            <CyberText variant="caps" style={{ fontSize: 8, color: THEME.colors.text.secondary, letterSpacing: 1 }}>{label}</CyberText>
            <CyberText variant="body" style={{ fontSize: 13, fontWeight: 'bold', color: THEME.colors.text.primary, marginTop: 2 }} numberOfLines={1}>
                {value}
            </CyberText>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    hudContainer: { flex: 1, justifyContent: 'space-between' },

    // En-tête (Drapeau + Titre)
    headerArea: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
    flagWrapper: { width: 70, height: 50, borderRadius: 8, borderWidth: 1, borderColor: THEME.colors.glass.borderHighlight, overflow: 'hidden', marginRight: 16 },
    flag: { width: '100%', height: '100%' },
    flagOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.1)' },
    titleWrapper: { flex: 1 },

    // Zone Basse
    bottomArea: { paddingHorizontal: 20, paddingBottom: 30, justifyContent: 'flex-end' },
    contentWrapper: { maxHeight: 280, flexShrink: 1, marginBottom: 20 },

    // Page 1 : Grid
    dataGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    dataCell: { width: '48%', backgroundColor: 'rgba(5, 5, 7, 0.85)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', gap: 10 },
    iconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: THEME.colors.primary + '15', justifyContent: 'center', alignItems: 'center' },

    // Pages 2 & 3 : Panneaux Textuels
    textPanel: { flexShrink: 1, backgroundColor: 'rgba(5, 5, 7, 0.85)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    panelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 12 },

    // Timeline
    timelineRow: { flexDirection: 'row' },
    timelineNode: { width: 20, alignItems: 'center', marginRight: 12 },
    timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: THEME.colors.primary, zIndex: 2, marginTop: 4 },
    timelineLine: { width: 1, flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: -4, marginBottom: -4, zIndex: 1 },
    timelineContent: { flex: 1, paddingBottom: 20 },

    // Action Block (Points + Bouton)
    actionBlock: { backgroundColor: 'rgba(5, 5, 7, 0.85)', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20 },
    pageIndicatorRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 16 },
    pageDot: { width: 24, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.1)' },
    pageDotActive: { backgroundColor: THEME.colors.primary, shadowColor: THEME.colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 5 },
});