// src/screens/learn/DiscoverySessionScreen.tsx
import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet'; // 💡 Import du BottomSheet
import { ALL_COUNTRIES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useLearningStore } from '@/store/useLearningStore';
import { feedbackService } from '@/utils/feedbackService';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
        if (router.canGoBack()) {
            console.log("Finishing discovery session, going back to previous screen.");
            router.back();
        } else {
            console.warn("No previous screen to go back to, replacing with home screen.");
            router.replace('/');
        }
    };

    // ==========================================
    // PHASE 3 : FIN DE SESSION (BOTTOM SHEET)
    // ==========================================
    if (phase === 'finished' || sessionCountries.length === 0) {
        return (
            <View style={styles.container}>
                {/* Background derrière le Modal */}
                <LinearGradient
                    colors={[THEME.colors.backgroundVeryLight, THEME.colors.background]}
                    style={StyleSheet.absoluteFill}
                />

                <BaseBottomSheet
                    isVisible={true}
                    onClose={handleFinishSession}
                    title="RAPPORT D'OPÉRATION"
                >
                    <View style={styles.finishedContent}>
                        <View style={styles.successIconWrapper}>
                            <Ionicons name="shield-checkmark" size={64} color={THEME.colors.primary} />
                        </View>

                        <MyText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 2, marginBottom: 8, textAlign: 'center' }}>
                            SUCCÈS
                        </MyText>

                        <MyText variant="h1" align="center" style={{ marginBottom: 16 }}>
                            DONNÉES ASSIMILÉES
                        </MyText>

                        <MyText variant="body" colorType="secondary" align="center" style={{ lineHeight: 22, marginBottom: 32 }}>
                            {sessionCountries.length} nouveaux pays ont été intégrés à votre réseau neural et ajoutés au protocole de révision.
                        </MyText>

                        <View style={{ width: '100%' }}>
                            <MyButton
                                title="TERMINER"
                                iconLeft="home"
                                iconRight="chevron-forward"
                                onPress={handleFinishSession}
                            />
                        </View>
                    </View>
                </BaseBottomSheet>
            </View>
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
        <View
            style={[styles.container, { paddingTop: THEME.paddings.top + useSafeAreaInsets().top }]}
        >
            {/* HEADER : Navigation et Progression */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { feedbackService.error(); handleFinishSession(); }} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color={THEME.colors.text.secondary} />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <MyText variant="caps" colorType="secondary" style={{ fontSize: 10, letterSpacing: 1 }}>
                            ACQUISITION EN COURS
                        </MyText>
                        <MyText variant="caps" style={{ color: THEME.colors.primary, fontSize: 10 }}>
                            {currentIndex + 1} / {sessionCountries.length}
                        </MyText>
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 60 },
    header: { flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 10, paddingBottom: 20 },
    closeBtn: { width: 40, height: 40, justifyContent: 'center' },
    progressContainer: { flex: 1 },

    // --- ÉCRAN DE FIN ---
    finishedContent: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    successIconWrapper: {
        width: 100,
        height: 100,
        borderRadius: THEME.metrics.radius.round,
        backgroundColor: THEME.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: THEME.colors.primary + '40',
    }
});