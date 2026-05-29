// src/screens/home/HomeScreen.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { useLearningStore } from '@/store/useLearningStore'; // Pour le SRS guidé
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const REGION_NAMES: Record<string, string> = {
    EUR: 'EUROPE', ASI: 'ASIE', AFR: 'AFRIQUE', AME: 'AMÉRIQUES', OCE: 'OCÉANIE', WLD: 'MONDE'
};

export default function HomeScreen() {
    const router = useRouter();

    // Connexion aux stores locaux (100% réactifs et hors-ligne)
    const pseudo = useUserStore((state) => state.pseudo);
    const currentZoneId = useLearningStore((state) => state.currentLearningZone);
    const setCurrentLearningZone = useLearningStore((state) => state.setCurrentLearningZone);

    // Récupération des compteurs via nos sélecteurs du store de mémoire
    const urgentCount = useLearningStore((state) => state.getUrgentCount());
    const consolidationCount = useLearningStore((state) => state.getConsolidationCount());
    const masteredCount = useLearningStore((state) => state.getMasteredCount());
    const remainingCount = useLearningStore((state) => state.getRemainingCount());

    const currentZoneName = REGION_NAMES[currentZoneId] || currentZoneId;

    // Handler pour basculer de continent cycliquement (Simulation d'un sélecteur rapide)
    const handleToggleZone = () => {
        const zones = ['EUR', 'ASI', 'AFR', 'AME', 'OCE'];
        const currentIndex = zones.indexOf(currentZoneId);
        const nextIndex = (currentIndex + 1) % zones.length;
        setCurrentLearningZone(zones[nextIndex]);
    };

    const handleDiscoverBatch = () => {
        const nextBatch = useLearningStore.getState().getNewCountriesBatch(5);
        if (nextBatch.length > 0) {
            // On inscrit le lot de 5 pays en Boîte 1 dans le store
            useLearningStore.getState().startDiscoverySession(nextBatch);

            router.push({ pathname: '/learn/discovery', params: { batch: nextBatch.join(',') } });
        }
    };

    const handleStartRevision = () => {
        if (urgentCount > 0) {
            console.log("Lancement de la boucle de révision Leitner");
            // router.push('/learn/revision');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* 1. HEADER IDENTITAIRE */}
                <View style={styles.header}>
                    <View>
                        <CyberText variant="caps" colorType="secondary" style={{ letterSpacing: 2 }}>
                            AGENT D'EXPLORATION
                        </CyberText>
                        <CyberText variant="h2" style={{ color: THEME.colors.text.primary, marginTop: 4 }}>
                            Bonjour, {pseudo}
                        </CyberText>
                    </View>
                    <TouchableOpacity style={styles.profileBtn}>
                        <Ionicons name="person" size={20} color={THEME.colors.text.primary} />
                    </TouchableOpacity>
                </View>

                {/* 2. COMPOSANT MONOLITHIQUE : SÉLECTEUR DE ZONE */}
                <CyberText variant="caps" colorType="secondary" style={styles.sectionLabel}>
                    ZONE D'ÉTUDE ACTUELLE
                </CyberText>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleToggleZone}
                    style={styles.heroCard}
                >
                    <LinearGradient
                        colors={[THEME.colors.primary + '15', 'transparent']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />

                    <View style={styles.watermarkContainer}>
                        <Image
                            source={functions.getImageSource(currentZoneId)}
                            style={styles.watermark}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.heroContent}>
                        <View>
                            <View style={styles.badge}>
                                <View style={[styles.dot, { backgroundColor: THEME.colors.primary }]} />
                                <CyberText variant="caps" style={{ color: THEME.colors.primary, fontSize: 10 }}>
                                    PARCOURS ACTIF
                                </CyberText>
                            </View>
                            <CyberText variant="h1" style={{ fontSize: 40, marginTop: 8 }}>
                                {currentZoneName}
                            </CyberText>
                        </View>
                        <Ionicons name="swap-horizontal" size={22} color={THEME.colors.text.secondary} />
                    </View>
                </TouchableOpacity>

                {/* 3. LE BOUTON MAÎTRE : INTENTION D'APPRENDRE */}
                <TouchableOpacity
                    activeOpacity={remainingCount > 0 ? 0.8 : 1}
                    onPress={remainingCount > 0 ? handleDiscoverBatch : undefined}
                    style={[styles.actionCard, remainingCount === 0 && { opacity: 0.5 }]}
                >
                    <LinearGradient
                        colors={[THEME.colors.primary, '#A68A2C']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.actionContent}>
                        <View>
                            <CyberText variant="h2" style={{ color: THEME.colors.background }}>
                                {remainingCount > 0 ? "DÉCOUVRIR 5 PAYS" : "ZONE COMPLÉTÉE"}
                            </CyberText>
                            <CyberText variant="bodySmall" style={{ color: THEME.colors.background, opacity: 0.8 }}>
                                {remainingCount} pays restants à cartographier en {currentZoneName.toLowerCase()}
                            </CyberText>
                        </View>
                        <View style={styles.playIconWrapper}>
                            <Ionicons
                                name={remainingCount > 0 ? "eye" : "checkmark-done"}
                                size={22}
                                color={THEME.colors.primary}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* 4. LE DASHBOARD NEURAL (La boîte de Répétition Espacée) */}
                <View style={styles.neuralHeader}>
                    <CyberText variant="caps" colorType="secondary" style={styles.sectionLabel}>
                        RÉSEAU NEURAL (MÉMOIRE)
                    </CyberText>
                    {urgentCount > 0 && (
                        <TouchableOpacity onPress={handleStartRevision}>
                            <CyberText variant="caps" style={{ color: THEME.colors.danger }}>
                                LIGNES D'URGENCE ACTIVE ▾
                            </CyberText>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.statsGrid}>
                    {/* Colonne Urgent */}
                    <TouchableOpacity
                        activeOpacity={urgentCount > 0 ? 0.8 : 1}
                        onPress={handleStartRevision}
                        style={[styles.statBox, { borderColor: THEME.colors.danger + (urgentCount > 0 ? '40' : '15') }]}
                    >
                        {urgentCount > 0 && <LinearGradient colors={[THEME.colors.danger + '10', 'transparent']} style={StyleSheet.absoluteFill} />}
                        <Ionicons name="warning" size={18} color={urgentCount > 0 ? THEME.colors.danger : THEME.colors.text.disabled} />
                        <CyberText variant="h1" style={{ color: urgentCount > 0 ? THEME.colors.danger : THEME.colors.text.disabled, marginVertical: 4 }}>
                            {urgentCount}
                        </CyberText>
                        <CyberText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.disabled }}>URGENTS</CyberText>
                    </TouchableOpacity>

                    {/* Colonne Consolidation */}
                    <View style={[styles.statBox, { borderColor: THEME.colors.glass.border }]}>
                        <Ionicons name="sync" size={18} color={THEME.colors.text.secondary} />
                        <CyberText variant="h1" style={{ color: THEME.colors.text.primary, marginVertical: 4 }}>
                            {consolidationCount}
                        </CyberText>
                        <CyberText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.disabled }}>EN COURS</CyberText>
                    </View>

                    {/* Colonne Maîtrisés */}
                    <View style={[styles.statBox, { borderColor: THEME.colors.success + (masteredCount > 0 ? '40' : '15') }]}>
                        {masteredCount > 0 && <LinearGradient colors={[THEME.colors.success + '05', 'transparent']} style={StyleSheet.absoluteFill} />}
                        <Ionicons name="checkmark-circle" size={18} color={masteredCount > 0 ? THEME.colors.success : THEME.colors.text.disabled} />
                        <CyberText variant="h1" style={{ color: masteredCount > 0 ? THEME.colors.success : THEME.colors.text.disabled, marginVertical: 4 }}>
                            {masteredCount}
                        </CyberText>
                        <CyberText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.disabled }}>MAÎTRISÉS</CyberText>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    scroll: { paddingHorizontal: THEME.metrics.spacing.lg, paddingTop: 60, paddingBottom: 100 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: THEME.metrics.spacing.xl },
    profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
    sectionLabel: { marginBottom: THEME.metrics.spacing.md },
    heroCard: { width: '100%', height: 160, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: THEME.metrics.radius.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: THEME.metrics.spacing.lg },
    watermarkContainer: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'flex-end', opacity: 0.08 },
    watermark: { width: '70%', height: '100%', right: -20, top: 20 },
    heroContent: { flex: 1, padding: THEME.metrics.spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.colors.primary + '20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start' },
    dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
    actionCard: { width: '100%', height: 80, borderRadius: THEME.metrics.radius.md, overflow: 'hidden', marginBottom: THEME.metrics.spacing.xxl, shadowColor: THEME.colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 10 },
    actionContent: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: THEME.metrics.spacing.lg },
    playIconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: THEME.colors.background, justifyContent: 'center', alignItems: 'center' },
    neuralHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    statBox: { flex: 1, height: 110, backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: THEME.metrics.radius.md, borderWidth: 1, padding: THEME.metrics.spacing.md, justifyContent: 'space-between', alignItems: 'flex-start', overflow: 'hidden' }
});