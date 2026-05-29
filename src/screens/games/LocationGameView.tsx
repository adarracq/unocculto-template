import { CyberText } from '@/components/atoms/CyberText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Types à ajuster selon vos models
interface LocationStep {
    title: string;
    content: string;
}

interface Country {
    code: string;
    longitude?: number;
    latitude?: number;
}

interface Props {
    step: LocationStep;
    country: Country;
    onValid: () => void;
}

export default function LocationGameView({ step, country, onValid }: Props) {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [status, setStatus] = useState<'playing' | 'success' | 'error'>('playing');
    const [cameraTarget, setCameraTarget] = useState<[number, number] | null>(null);

    const handleCountryPress = (code: string) => {
        // Bloque le clic si on a déjà gagné
        if (status === 'success') return;

        // Si on s'était trompé et qu'on reclique, on relance le mode "playing"
        if (status === 'error') setStatus('playing');

        setSelectedCode(code.toUpperCase());
    };

    const handleValidate = () => {
        if (!selectedCode) return;

        const targetCode = country.code.toUpperCase().trim();
        const userCode = selectedCode.toUpperCase().trim();

        console.log(`[LocationGame] Validation: Cible=${targetCode} | Joueur=${userCode}`);

        if (userCode === targetCode) {
            setStatus('success');
            // functions.vibrate('success');
        } else {
            setStatus('error');
            // functions.vibrate('error');

            // On déplace la caméra vers la bonne réponse pour montrer où c'était
            if (country.longitude && country.latitude) {
                setCameraTarget([country.longitude, country.latitude]);
            }
        }
    };

    // --- GESTION DES COULEURS DE LA CARTE ---
    const getMapColors = () => {
        const colors: Record<string, string> = {};
        const targetCode = country.code.toUpperCase();

        if (status === 'success') {
            colors[targetCode] = THEME.colors.success; // Vert
        }
        else if (status === 'error') {
            if (selectedCode) colors[selectedCode] = THEME.colors.danger; // Rouge (le mauvais choix)
            colors[targetCode] = THEME.colors.success; // Vert (révèle le bon choix)
        }
        return colors;
    };

    return (
        <View style={styles.container}>

            {/* 1. LA CARTE EN ARRIÈRE-PLAN (Prend tout l'écran) */}
            <View style={StyleSheet.absoluteFill}>
                <InteractiveMap
                    selectedCountry={selectedCode}
                    onCountryPress={handleCountryPress}
                    countryColors={getMapColors()}
                    focusCoordinates={cameraTarget}
                    zoomLevel={3}
                />
            </View>

            {/* 2. LE HUD SUPÉRIEUR (Question) */}
            <View style={styles.headerHud}>
                {/* Dégradé sombre pour que le texte reste lisible sur la carte */}
                <LinearGradient
                    colors={['rgba(5,5,7,0.9)', 'rgba(5,5,7,0)']}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.headerContent}>
                    <CyberText variant="caps" colorType="secondary" style={{ letterSpacing: 2, marginBottom: 4 }}>
                        {step.title}
                    </CyberText>
                    <CyberText variant="h1" style={{ fontSize: 24, lineHeight: 30 }}>
                        {step.content}
                    </CyberText>
                </View>
            </View>

            {/* 3. LE HUD INFÉRIEUR (Feedback & Action) */}
            <View style={styles.footerHud}>
                <LinearGradient
                    colors={['rgba(5,5,7,0)', 'rgba(5,5,7,0.95)', THEME.colors.background]}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.footerContent}>
                    {/* Feedback (Succès / Erreur) */}
                    {status !== 'playing' && (
                        <View style={[
                            styles.feedbackBar,
                            {
                                backgroundColor: status === 'success' ? THEME.colors.success + '20' : THEME.colors.danger + '20',
                                borderColor: status === 'success' ? THEME.colors.success : THEME.colors.danger
                            }
                        ]}>
                            <Ionicons
                                name={status === 'success' ? "checkmark-circle" : "close-circle"}
                                size={20}
                                color={status === 'success' ? THEME.colors.success : THEME.colors.danger}
                            />
                            <CyberText
                                variant="caps"
                                style={{ color: status === 'success' ? THEME.colors.success : THEME.colors.danger, marginLeft: 8 }}
                            >
                                {status === 'success' ? "LOCALISATION CONFIRMÉE" : "ERREUR DE CIBLAGE"}
                            </CyberText>
                        </View>
                    )}

                    {/* Bouton d'Action */}
                    {status === 'success' ? (
                        <TouchableOpacity activeOpacity={0.8} onPress={onValid} style={styles.actionButton}>
                            <LinearGradient
                                colors={[THEME.colors.primary, '#A68A2C']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={StyleSheet.absoluteFill}
                            />
                            <CyberText variant="caps" style={{ color: THEME.colors.background }}>
                                POURSUIVRE
                            </CyberText>
                            <Ionicons name="arrow-forward" size={20} color={THEME.colors.background} style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={selectedCode ? 0.8 : 1}
                            onPress={handleValidate}
                            disabled={!selectedCode}
                            style={[
                                styles.actionButton,
                                !selectedCode ? styles.actionButtonDisabled : styles.actionButtonActive
                            ]}
                        >
                            <CyberText
                                variant="caps"
                                style={{ color: selectedCode ? THEME.colors.primary : THEME.colors.text.disabled }}
                            >
                                {selectedCode ? "VALIDER LES COORDONNÉES" : "SÉLECTIONNEZ UNE CIBLE"}
                            </CyberText>
                            {selectedCode && (
                                <Ionicons name="scan-outline" size={20} color={THEME.colors.primary} style={{ marginLeft: 8 }} />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },

    // HUD Header (En-tête)
    headerHud: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 140, // Assez grand pour intégrer le dégradé qui fond dans la carte
        zIndex: 10,
    },
    headerContent: {
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: 20, // Ajustez si vous avez une NavBar ou la barre de statut iOS/Android
    },

    // HUD Footer (Pied de page)
    footerHud: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 180,
        zIndex: 10,
        justifyContent: 'flex-end',
    },
    footerContent: {
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingBottom: THEME.metrics.spacing.xl, // Espace pour la zone de swipe iPhone
    },

    // Feedback
    feedbackBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: THEME.metrics.radius.round,
        borderWidth: 1,
        marginBottom: THEME.metrics.spacing.md,
        alignSelf: 'center',
    },

    // Boutons
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
    },
    actionButtonActive: {
        backgroundColor: THEME.colors.primary + '15',
        borderWidth: 1,
        borderColor: THEME.colors.primary,
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    actionButtonDisabled: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
    }
});