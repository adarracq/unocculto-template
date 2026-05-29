import { CyberText } from '@/components/atoms/CyberText';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { ALL_COUNTRIES, getFlagImage } from '@/data/Countries'; // Votre BDD
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationGameView from '../games/LocationGameView';

type SessionPhase = 'learning' | 'gaming' | 'finished';

export default function DiscoverySessionScreen() {
    const router = useRouter();
    const { batch } = useLocalSearchParams<{ batch: string }>();
    const countryCodes = batch ? batch.split(',') : [];

    // On récupère les 4 pays cibles
    const sessionCountries = ALL_COUNTRIES.filter(c => countryCodes.includes(c.code));

    // --- ÉTATS DE LA SESSION ---
    const [phase, setPhase] = useState<SessionPhase>('learning');
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentCountry = sessionCountries[currentIndex];

    // Animation de clignotement "Breathing" pour le bouton Continuer
    const pulseAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        if (phase === 'learning') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 0.4, duration: 1000, useNativeDriver: true })
                ])
            ).start();
        }
    }, [phase]);

    // --- HANDLERS ---
    const handleNextCountry = () => {
        if (currentIndex < sessionCountries.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Fin de la phase d'apprentissage, on passe aux mini-jeux !
            setPhase('gaming');
        }
    };

    const handleFinishSession = () => {
        // Retour au QG
        router.push('/');
    };

    // ==========================================
    // PHASE 3 : FIN DE SESSION
    // ==========================================
    if (phase === 'finished' || sessionCountries.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.finishedContent}>
                    <View style={styles.successGlow}>
                        <Ionicons name="checkmark-done-circle" size={80} color={THEME.colors.primary} />
                    </View>
                    <CyberText variant="h1" align="center" style={{ marginBottom: THEME.metrics.spacing.md }}>
                        DONNÉES ASSIMILÉES
                    </CyberText>
                    <CyberText variant="body" colorType="secondary" align="center" style={{ paddingHorizontal: 40, marginBottom: 40 }}>
                        Ces {sessionCountries.length} pays ont été intégrés à votre réseau neural.
                    </CyberText>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleFinishSession} style={styles.primaryButton}>
                        <CyberText variant="caps" style={{ color: THEME.colors.background }}>
                            RETOUR AU CENTRE D'OPÉRATIONS
                        </CyberText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // ==========================================
    // PHASE 2 : MINI JEUX (En attente de votre code)
    // ==========================================
    if (phase === 'gaming') {
        return (
            <LocationGameView step={{ title: "Localisez le pays", content: "Trouvez le pays sur la carte" }} country={currentCountry} onValid={() => setPhase('finished')} />
        );
    }

    // ==========================================
    // PHASE 1 : DOSSIER D'APPRENTISSAGE (Recap)
    // ==========================================
    // Données fallback si la BDD est incomplète
    const mockDates = currentCountry?.dates;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color={THEME.colors.text.secondary} />
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    <CyberText variant="caps" colorType="secondary" align="center" style={{ marginBottom: 8, fontSize: 10 }}>
                        ACQUISITION ({currentIndex + 1}/{sessionCountries.length})
                    </CyberText>
                    <ProgressBar progress={(currentIndex) / sessionCountries.length} color={THEME.colors.primary} />
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* --- EN-TÊTE : IDENTIFICATION --- */}
                <View style={styles.recapHeader}>
                    <View style={styles.flagContainer}>
                        <Image source={getFlagImage(currentCountry?.code)} style={styles.flag} resizeMode='cover' />
                        <View style={styles.flagOverlay} />
                    </View>
                    <View style={styles.titleWrapper}>
                        <CyberText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 2, marginBottom: 4 }}>
                            DOSSIER //
                        </CyberText>
                        <CyberText variant="h1" style={{ fontSize: 32 }}>
                            {currentCountry?.name_fr?.toUpperCase()}
                        </CyberText>
                    </View>
                </View>

                {/* --- GRILLE DE RENSEIGNEMENTS --- */}
                <View style={styles.dataGrid}>
                    <DataCell icon="business" label="CAPITALE" value={currentCountry?.capital || 'Inconnue'} />
                    <DataCell icon="people" label="POPULATION" value={`${functions.stringNumber(currentCountry?.population || 0)} hab.`} />
                    <DataCell icon="wallet" label="MONNAIE" value={currentCountry?.currency || 'N/A'} />
                    <DataCell icon="chatbubbles" label="LANGUE" value={currentCountry?.language || 'N/A'} />
                </View>

                {/* --- TIMELINE HISTORIQUE --- */}
                <View style={styles.timelineContainer}>
                    <CyberText variant="caps" style={{ color: THEME.colors.text.primary, marginBottom: 15 }}>
                        DATES CLÉS
                    </CyberText>
                    {mockDates.map((item: any, index: number) => (
                        <View key={index} style={styles.timelineRow}>
                            <View style={styles.timelineNode}>
                                <View style={styles.timelineDot} />
                                {index < mockDates.length - 1 && <View style={styles.timelineLine} />}
                            </View>
                            <View style={styles.timelineContent}>
                                <CyberText variant="body" style={{ fontWeight: 'bold', color: THEME.colors.text.primary }}>
                                    {item.year.toString()}
                                </CyberText>
                                <CyberText variant="bodySmall" colorType="secondary" style={{ marginTop: 2, fontStyle: 'italic' }}>
                                    {item.event}
                                </CyberText>
                            </View>
                        </View>
                    ))}
                </View>

                {/* --- BRIEFING (Intro) --- */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.05)', 'transparent']}
                    style={styles.briefingContainer}
                >
                    <CyberText variant="caps" style={{ color: THEME.colors.text.disabled, marginBottom: 8 }}>
                        BRIEFING DE MISSION :
                    </CyberText>
                    <CyberText variant="body" style={{ color: THEME.colors.text.primary, lineHeight: 22 }}>
                        {currentCountry?.intro_fr || "Aucun renseignement supplémentaire n'est disponible pour ce territoire à l'heure actuelle."}
                    </CyberText>
                </LinearGradient>

                {/* --- INDICATEUR DE CONTINUATION (Pulsing) --- */}
                <TouchableOpacity activeOpacity={0.9} onPress={handleNextCountry} style={styles.touchArea}>
                    <Animated.View style={[styles.tapIndicator, { opacity: pulseAnim }]}>
                        <Ionicons name="chevron-down" size={24} color={THEME.colors.text.primary} style={{ marginBottom: -4 }} />
                        <CyberText variant="caps" style={{ letterSpacing: 1, fontSize: 10, color: THEME.colors.text.primary }}>
                            TAP POUR CONTINUER
                        </CyberText>
                    </Animated.View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

// Sous-composant pour les cases de données (Grid)
const DataCell = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <View style={styles.dataCell}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={18} color={THEME.colors.text.secondary} />
        </View>
        <View style={{ flex: 1 }}>
            <CyberText variant="caps" style={{ fontSize: 8, color: THEME.colors.text.disabled, letterSpacing: 1 }}>
                {label}
            </CyberText>
            <CyberText variant="body" style={{ fontSize: 13, fontWeight: 'bold', color: THEME.colors.text.primary, marginTop: 2 }} numberOfLines={1}>
                {value}
            </CyberText>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: THEME.metrics.spacing.lg, paddingTop: THEME.metrics.spacing.md, paddingBottom: THEME.metrics.spacing.xl },
    closeBtn: { width: 40, height: 40, justifyContent: 'center' },
    progressContainer: { flex: 1, paddingHorizontal: THEME.metrics.spacing.lg },

    // Header Recap
    recapHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
    flagContainer: { width: 90, height: 65, borderRadius: 8, borderWidth: 1, borderColor: THEME.colors.glass.borderHighlight, overflow: 'hidden', marginRight: 15, shadowColor: THEME.colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 10 },
    flag: { width: '100%', height: '100%' },
    flagOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.1)' },
    titleWrapper: { flex: 1 },

    // Data Grid
    dataGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 25 },
    dataCell: { width: '48%', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: THEME.colors.glass.border, flexDirection: 'row', alignItems: 'center', gap: 10 },
    iconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },

    // Timeline
    timelineContainer: { backgroundColor: 'rgba(255,255,255,0.02)', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: THEME.colors.glass.border, marginBottom: 25 },
    timelineRow: { flexDirection: 'row' },
    timelineNode: { width: 20, alignItems: 'center', marginRight: 10 },
    timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: THEME.colors.text.secondary, zIndex: 2, marginTop: 6 },
    timelineLine: { width: 1, flex: 1, backgroundColor: THEME.colors.glass.border, marginTop: -4, marginBottom: -4, zIndex: 1 },
    timelineContent: { flex: 1, paddingBottom: 20 },

    // Briefing
    briefingContainer: { padding: 20, borderRadius: 16, borderLeftWidth: 2, borderLeftColor: THEME.colors.primary, marginBottom: 40 },

    // Tap Indicator
    touchArea: { paddingVertical: 20, alignItems: 'center', justifyContent: 'center' },
    tapIndicator: { alignItems: 'center', justifyContent: 'center' },

    // Shared
    primaryButton: { backgroundColor: THEME.colors.primary, paddingHorizontal: 24, paddingVertical: 16, borderRadius: THEME.metrics.radius.md, shadowColor: THEME.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
    finishedContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: THEME.metrics.spacing.xl },
    successGlow: { marginBottom: THEME.metrics.spacing.xl, shadowColor: THEME.colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30 }
});