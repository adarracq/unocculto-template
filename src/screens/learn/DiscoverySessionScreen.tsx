// src/screens/learn/DiscoverySessionScreen.tsx
import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { ALL_COUNTRIES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLearningStore } from '@/store/useLearningStore';
import DiscoveryGameController from './components/DiscoveryGameController';
import LearningDossier from './components/LearningDossier';

type SessionPhase = 'learning' | 'gaming' | 'finished';

export default function DiscoverySessionScreen() {
    const router = useRouter();
    const { batch } = useLocalSearchParams<{ batch: string }>();
    const countryCodes = batch ? batch.split(',') : [];

    const startDiscoverySession = useLearningStore(state => state.startDiscoverySession);

    const sessionCountries = ALL_COUNTRIES.filter(c => countryCodes.includes(c.code));

    const [phase, setPhase] = useState<SessionPhase>('learning');
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentCountry = sessionCountries[currentIndex];

    // --- HANDLERS ---
    const handleNextCountry = () => {
        if (currentIndex < sessionCountries.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setPhase('gaming');
        }
    };

    const handleFinishSession = () => {
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
                        Ces {sessionCountries.length} territoires ont été intégrés à votre réseau neural.
                    </CyberText>

                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <MyButton
                            title="RETOUR AU QG"
                            iconRight="home-outline"
                            onPress={handleFinishSession}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    // ==========================================
    // PHASE 2 : MINI JEUX
    // ==========================================
    if (phase === 'gaming') {
        return (
            <DiscoveryGameController
                sessionCountries={sessionCountries}
                onFinish={() => {
                    startDiscoverySession(countryCodes);
                    setPhase('finished');
                }}
            />
        );
    }

    // ==========================================
    // PHASE 1 : DOSSIER D'APPRENTISSAGE
    // ==========================================
    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER : Navigation et Progression */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color={THEME.colors.text.secondary} />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <CyberText variant="caps" colorType="secondary" style={{ fontSize: 10, letterSpacing: 1 }}>
                            ACQUISITION EN COURS
                        </CyberText>
                        <CyberText variant="caps" style={{ color: THEME.colors.primary, fontSize: 10 }}>
                            {currentIndex + 1} / {sessionCountries.length}
                        </CyberText>
                    </View>
                    <ProgressBar
                        progress={(currentIndex + 1) / sessionCountries.length}
                        color={THEME.colors.primary}
                    />
                </View>

                <View style={{ width: 40 }} />
            </View>

            {/* CONTENU : Dossier paginé */}
            <LearningDossier
                country={currentCountry}
                onNextCountry={handleNextCountry}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    closeBtn: { width: 40, height: 40, justifyContent: 'center' },
    progressContainer: { flex: 1, paddingHorizontal: 16 },

    finishedContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    successGlow: { marginBottom: 30, shadowColor: THEME.colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30 }
});