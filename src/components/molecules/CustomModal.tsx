import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { CyberText } from '../atoms/CyberText';
import MyButton from '../atoms/MyButton';

interface Props {
    visible: boolean;
    title: string;

    // On accepte maintenant des composants React pour un contenu riche
    children?: React.ReactNode;

    // Actions
    onConfirm: () => void;
    confirmText?: string;
    onCancel?: () => void;
    cancelText?: string;

    // Style
    variant?: 'default' | 'gold'; // default = Main color (Orange), gold = Fin de jeu
    color?: string;
}

export default function CustomModal({
    visible,
    title,
    children,
    onConfirm,
    confirmText = "Valider",
    onCancel,
    cancelText = "Annuler",
    variant = 'default',
    color,
}: Props) {
    const accentColor = variant === 'gold' ? THEME.colors.levels.gold : (color || THEME.colors.primary);
    const scaleAnim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        if (visible) {
            // Animation d'apparition "Pop"
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <Animated.View style={[styles.overlay, { transform: [{ scale: scaleAnim }] }]}>
                {/* On ferme si on clique dehors (optionnel) */}
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={styles.backgroundTouch} />
                </TouchableWithoutFeedback>

                {/* --- LA CARTE --- */}
                <LinearGradient
                    colors={[accentColor + '20', THEME.colors.background]} // Dégradé très sombre
                    start={{ x: 0, y: 0 }}
                    end={{ x: .5, y: .5 }}
                    style={[styles.container, { borderColor: accentColor + '30', backgroundColor: THEME.colors.background }]}
                >
                    {/* Header avec Logo + Titre */}
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, { backgroundColor: accentColor + '20' }]}>
                            <Image
                                source={functions.getIconSource('logo_white')}
                                style={{ width: 32, height: 32 }}
                                resizeMode="contain"
                            />
                        </View>
                        <CyberText
                            variant="h2"
                            style={{ color: accentColor }}
                        >
                            {title}
                        </CyberText>
                    </View>

                    {/* Ligne de séparation subtile */}
                    <View style={styles.divider} />

                    {/* Contenu Riche (Aligné à gauche par défaut via le children) */}
                    <View style={styles.content}>
                        {children}
                    </View>

                    {/* Boutons */}
                    <View style={styles.footer}>
                        {onCancel && (
                            <View style={{ flex: 1 }}>
                                <MyButton
                                    title={cancelText}
                                    onPress={onCancel}
                                    variant="outline"
                                    style={{ height: 50, borderColor: THEME.colors.backgroundLight }}
                                />
                            </View>
                        )}

                        <View style={{ flex: 1.3 }}>
                            <MyButton
                                title={confirmText}
                                onPress={onConfirm}
                                variant="glass"
                                rightIcon={'arrow-right'}
                                bump
                            />
                        </View>
                    </View>

                </LinearGradient>
            </Animated.View >
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)', // Fond très noir pour focus total
        justifyContent: 'center',
        padding: 24,
    },
    backgroundTouch: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
    },
    container: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        padding: 24,
        // Shadow pour le relief
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
        maxHeight: '95%',
        flexShrink: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        marginBottom: 20,
    },
    content: {
        marginBottom: 30,
        flexShrink: 1,
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
    }
});