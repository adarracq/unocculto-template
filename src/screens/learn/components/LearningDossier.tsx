import { MyText } from '@/components/atoms/MyText';
import CountryFocusMap from '@/components/organisms/CountryFocusMap';
import { getFlagImage } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    country: any;
    onNextCountry: () => void;
}

export default function LearningDossier({ country, onNextCountry }: Props) {
    const [page, setPage] = useState<1 | 2 | 3>(1);

    const handleNext = () => {
        if (page < 3) {
            feedbackService.medium();
            setPage((prev) => (prev + 1) as 1 | 2 | 3);
        } else {
            feedbackService.heavy();
            setPage(1);
            onNextCountry();
        }
    };

    // 💡 Nouvelle fonction pour le retour en arrière
    const handlePrev = () => {
        if (page > 1) {
            feedbackService.light();
            setPage((prev) => (prev - 1) as 1 | 2 | 3);
        }
    };

    const center: [number, number] = [country.longitude || 0, country.latitude || 0];

    // --- PAGE 1 : MÉTADONNÉES ---
    const renderPage1 = () => (
        <View style={styles.generalInfoBox}>
            <InfoRow icon="chatbubbles-outline" label="Langue(s) officielle(s)" value={country.language || 'N/A'} />
            <View style={styles.divider} />
            <InfoRow icon="wallet-outline" label="Monnaie locale" value={country.currency || 'N/A'} />
            <View style={styles.divider} />
            <InfoRow icon="people-outline" label="Population" value={`${functions.stringNumber(country.population || 0)} habitants`} />
        </View>
    );

    // --- PAGE 2 : BRIEFING STRATÉGIQUE ---
    const renderPage2 = () => (
        <View style={styles.textPanel}>
            <View style={styles.panelHeader}>
                <Ionicons name="information-circle" size={20} color={THEME.colors.primary} style={{ marginRight: 8 }} />
                <MyText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 1 }}>
                    INFORMATIONS
                </MyText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <MyText variant="body" style={{ color: THEME.colors.text.secondary, lineHeight: 24 }}>
                    {functions.addLineBreaks(country.intro_fr) || "Aucun renseignement supplémentaire n'est disponible pour ce territoire."}
                </MyText>
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
                    <MyText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 1 }}>
                        HISTORIQUE
                    </MyText>
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
                                    <MyText variant="body" style={{ color: THEME.colors.primary }}>
                                        {item.year.toString()}
                                    </MyText>
                                    <MyText variant="bodySmall" colorType="secondary" style={{ marginTop: 2 }}>
                                        {item.event}
                                    </MyText>
                                </View>
                            </View>
                        ))
                    ) : (
                        <MyText variant="bodySmall" colorType="disabled" align="center" style={{ paddingVertical: 20 }}>
                            Aucune archive chronologique disponible.
                        </MyText>
                    )}
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CountryFocusMap countryCode={country.code} centerCoordinate={center} zoom={2} />

            <View style={styles.hudContainer} pointerEvents="box-none">

                {/* --- EN-TÊTE FLOTTANT (Drapeau + Pays + Capitale) --- */}
                <View style={styles.headerArea} pointerEvents="none">
                    {/* Le dégradé subtil pour garantir la lisibilité du texte sur la carte */}
                    <LinearGradient
                        colors={[THEME.colors.background, 'transparent']}
                        style={StyleSheet.absoluteFill}
                    />

                    <View style={styles.headerContent}>
                        <View style={styles.flagWrapper}>
                            <Image source={getFlagImage(country.code)} style={styles.flag} resizeMode='cover' />
                            <View style={styles.flagOverlay} />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <MyText variant="h1" style={styles.countryName} numberOfLines={1}>
                                {country.name_fr?.toUpperCase()}
                            </MyText>

                            {/* La ligne de la capitale avec l'icône */}
                            <View style={styles.capitalRow}>
                                <Ionicons name="location" size={14} color={THEME.colors.primary} />
                                <MyText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 1, marginTop: 1 }}>
                                    {country.capital || 'CAPITALE INCONNUE'}
                                </MyText>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1 }} pointerEvents="none" />

                {/* --- ZONE BASSE --- */}
                <View style={styles.bottomArea} pointerEvents="box-none">
                    <View style={styles.contentWrapper}>
                        {page === 1 && renderPage1()}
                        {page === 2 && renderPage2()}
                        {page === 3 && renderPage3()}
                    </View>

                    {/* 💡 NOUVELLE PILULE DE NAVIGATION FLOTTANTE */}
                    <View style={styles.navigationPill}>

                        {/* Bouton Précédent */}
                        <TouchableOpacity
                            onPress={handlePrev}
                            disabled={page === 1}
                            style={[styles.navIconBtn, { opacity: page === 1 ? 0.2 : 1 }]}
                        >
                            <Ionicons name="chevron-back" size={24} color={THEME.colors.text.primary} />
                        </TouchableOpacity>

                        {/* Indicateurs (au centre) */}
                        <View style={styles.pageIndicatorRow}>
                            <View style={[styles.pageDot, page >= 1 ? styles.pageDotActive : null]} />
                            <View style={[styles.pageDot, page >= 2 ? styles.pageDotActive : null]} />
                            <View style={[styles.pageDot, page === 3 ? styles.pageDotActive : null]} />
                        </View>

                        {/* Bouton Suivant / Terminer */}
                        <TouchableOpacity
                            onPress={handleNext}
                            style={[styles.navIconBtn, page === 3 && styles.navBtnFinish]}
                        >
                            {page < 3 ? (
                                <Ionicons name="chevron-forward" size={24} color={THEME.colors.text.primary} />
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                    <Ionicons name="checkmark" size={24} color={THEME.colors.primary} />
                                </View>
                            )}
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </View>
    );
}

// Sous-composant de la liste
const InfoRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <View style={styles.infoRow}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={18} color={THEME.colors.text.secondary} />
        </View>
        <View style={{ flex: 1 }}>
            <MyText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.secondary, letterSpacing: 0.5 }}>
                {label}
            </MyText>
            <MyText variant="body" style={{ marginTop: 2, fontSize: 15 }}>
                {value}
            </MyText>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    hudContainer: { flex: 1, justifyContent: 'space-between' },

    bottomArea: { paddingHorizontal: THEME.paddings.horizontal, justifyContent: 'flex-end' },
    contentWrapper: { maxHeight: 400, flexShrink: 1, marginBottom: 20 },

    generalInfoBox: { backgroundColor: 'rgba(15, 15, 17, 0.85)', padding: 16, borderRadius: THEME.metrics.radius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', gap: 12 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    iconBox: { width: 36, height: 36, borderRadius: THEME.metrics.radius.md, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginLeft: 52 },

    textPanel: { flexShrink: 1, backgroundColor: 'rgba(15, 15, 17, 0.85)', borderRadius: THEME.metrics.radius.md, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    panelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 12 },

    timelineRow: { flexDirection: 'row' },
    timelineNode: { width: 20, alignItems: 'center', marginRight: 12 },
    timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: THEME.colors.primary, zIndex: 2, marginTop: 8 },
    timelineLine: { width: 1, flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: -4, marginBottom: -4, zIndex: 1 },
    timelineContent: { flex: 1, paddingBottom: 16 },

    // 💡 NOUVEAUX STYLES DE LA PILULE DE NAVIGATION
    navigationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(15, 15, 17, 0.85)',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: THEME.metrics.radius.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    navIconBtn: {
        width: 44,
        height: 44,
        borderRadius: THEME.metrics.radius.md,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBtnFinish: {

        borderColor: THEME.colors.primary,
        borderWidth: 1,
    },
    pageIndicatorRow: {
        flexDirection: 'row',
        gap: 6,
    },
    pageDot: {
        width: 16,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    pageDotActive: {
        backgroundColor: THEME.colors.primary,
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    // --- NOUVEAUX STYLES DE L'EN-TÊTE ---
    headerArea: {
        paddingTop: 20,
        paddingBottom: 80, // Laisse la place au dégradé de s'estomper doucement
    },
    headerContent: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        paddingHorizontal: THEME.paddings.horizontal,
    },
    countryName: {
        fontSize: 28,
        color: THEME.colors.text.primary,
        marginBottom: 4,
        // Une légère ombre sur le texte pour qu'il claque par-dessus la carte
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    capitalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    flagWrapper: {
        width: 72,
        height: 48,
        borderRadius: THEME.metrics.radius.sm,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        // Ombre portée du drapeau
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    flag: { width: '100%', height: '100%' },
    flagOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.05)' },
});