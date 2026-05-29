import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// Types (à déplacer dans vos models plus tard si besoin)
export interface QuizStep {
    title: string;
    content: string;
    choices: string[];
    correctAnswerIndex: number;
    answerType: 'text' | 'image';
    imageUri?: string; // Si la question a une image d'illustration
}

interface Props {
    step: QuizStep;
    onValid: () => void;
}

export default function QuizGameView({ step, onValid }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const isImageMode = step.answerType === 'image';

    useEffect(() => {
        // Reset l'état quand la question change
        setSelectedIndex(null);
        setIsSuccess(null);
    }, [step]);

    const handleChoicePress = (index: number) => {
        if (isSuccess || selectedIndex !== null) return; // Bloque si déjà répondu ou en cours de vérif

        setSelectedIndex(index);

        if (index === step.correctAnswerIndex) {
            setIsSuccess(true);
            // functions.vibrate('success'); // À réactiver si vous avez haptics
        } else {
            setIsSuccess(false);
            // functions.vibrate('error');

            // Remise à zéro après une erreur pour le laisser réessayer
            setTimeout(() => {
                setSelectedIndex(null);
                setIsSuccess(null);
            }, 1000);
        }
    };

    const getStatusColor = (index: number) => {
        if (selectedIndex !== index) return THEME.colors.glass.border;
        if (isSuccess === true) return THEME.colors.success;
        if (isSuccess === false) return THEME.colors.danger;
        return THEME.colors.primary; // Sélectionné (transition)
    };

    // --- RENDERER : MODE TEXTE ---
    const renderTextChoice = (choice: string, index: number) => {
        const isSelected = selectedIndex === index;
        const color = getStatusColor(index);
        const showOpacity = selectedIndex !== null && !isSelected;

        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleChoicePress(index)}
                style={[
                    styles.textChoiceBtn,
                    { borderColor: color },
                    isSelected && { backgroundColor: color + '20' }, // Léger fond de couleur si sélectionné
                    showOpacity && { opacity: 0.4 }
                ]}
            >
                <CyberText
                    variant="h2"
                    style={{
                        color: isSelected && isSuccess === true ? THEME.colors.success : THEME.colors.text.primary,
                        fontSize: 18
                    }}
                >
                    {choice}
                </CyberText>

                {/* Icône de résultat */}
                {isSelected && isSuccess === true && <Ionicons name="checkmark-circle" size={24} color={color} />}
                {isSelected && isSuccess === false && <Ionicons name="close-circle" size={24} color={color} />}
            </TouchableOpacity>
        );
    };

    // --- RENDERER : MODE IMAGE (Drapeaux) ---
    const renderImageChoice = (choiceUri: string, index: number) => {
        const isSelected = selectedIndex === index;
        const color = getStatusColor(index);
        const showOpacity = selectedIndex !== null && !isSelected;

        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleChoicePress(index)}
                style={[
                    styles.imageChoiceBtn,
                    { borderColor: color },
                    isSelected && { borderWidth: 3 },
                    showOpacity && { opacity: 0.4 }
                ]}
            >
                <Image source={{ uri: choiceUri }} style={styles.imageContent} resizeMode="cover" />

                {isSelected && (
                    <View style={[styles.imageOverlay, { backgroundColor: color }]} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            {/* --- EN-TÊTE DE LA QUESTION --- */}
            <View style={styles.header}>
                <CyberText variant="caps" colorType="secondary" style={{ letterSpacing: 2, marginBottom: 8 }}>
                    {step.title}
                </CyberText>
                <CyberText variant="h1" style={{ fontSize: 28, lineHeight: 34 }}>
                    {step.content}
                </CyberText>

                {step.imageUri && (
                    <View style={styles.questionImageContainer}>
                        <Image source={{ uri: step.imageUri }} style={styles.questionImage} resizeMode="cover" />
                    </View>
                )}
            </View>

            {/* --- CONTENEUR DES CHOIX --- */}
            <View style={[styles.choicesContainer, isImageMode && styles.gridContainer]}>
                {step.choices?.map((choice, index) =>
                    isImageMode ? renderImageChoice(choice, index) : renderTextChoice(choice, index)
                )}
            </View>

            {/* --- BOUTON SUIVANT (Apparaît si succès) --- */}
            <View style={styles.footer}>
                {isSuccess && (
                    <TouchableOpacity activeOpacity={0.8} onPress={onValid} style={styles.nextButton}>
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
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: THEME.metrics.spacing.lg,
    },
    header: {
        marginTop: 20,
        marginBottom: 40,
    },
    questionImageContainer: {
        width: '100%',
        height: 180,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
        marginTop: 20,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
    },
    questionImage: {
        width: '100%',
        height: '100%',
    },
    choicesContainer: {
        width: '100%',
        gap: THEME.metrics.spacing.md,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    // Mode Texte
    textChoiceBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1.5,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },

    // Mode Image
    imageChoiceBtn: {
        width: '47%', // Pour faire 2 colonnes
        aspectRatio: 1.5,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
        borderWidth: 1.5,
        marginBottom: THEME.metrics.spacing.md,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    imageContent: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFill,
        opacity: 0.2,
    },

    // Footer
    footer: {
        minHeight: 80, // Garde l'espace pour éviter que le layout saute
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    nextButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    }
});