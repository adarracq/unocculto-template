import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface Props {
    visible: boolean;
    title: string;
    children?: React.ReactNode;

    // Actions
    onConfirm: () => void;
    confirmText?: string;
    onCancel?: () => void;
    cancelText?: string;

    // Style
    variant?: 'default' | 'gold' | 'danger';
    color?: string;
    iconName?: keyof typeof Ionicons.glyphMap; // 💡 Nouvelle prop pour customiser l'icône
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
    iconName,
}: Props) {

    // Définition de la couleur d'accentuation
    let accentColor = color || THEME.colors.text.primary;
    if (variant === 'gold') accentColor = THEME.colors.levels?.gold || '#FFD700';
    if (variant === 'danger') accentColor = THEME.colors.danger;

    // Définition de l'icône par défaut si non fournie
    const defaultIcon = variant === 'gold' ? 'trophy' : (variant === 'danger' ? 'warning' : 'cube');
    const finalIconName = iconName || defaultIcon;

    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                tension: 50,
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
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={styles.backgroundTouch} />
                </TouchableWithoutFeedback>

                <Animated.View style={[styles.modalWrapper, { transform: [{ scale: scaleAnim }] }]}>
                    <LinearGradient
                        colors={[THEME.colors.backgroundLight, THEME.colors.background]} // Gris très sombre premium
                        style={[styles.container, { borderColor: accentColor + '20' }]}
                    >
                        {/* EN-TÊTE */}
                        <View style={styles.header}>
                            <View style={[styles.iconContainer, { backgroundColor: accentColor + '15', borderColor: accentColor + '30', borderWidth: 1 }]}>
                                <Ionicons name={finalIconName as any} size={20} color={accentColor} />
                            </View>
                            <CyberText variant="h2" style={{ color: THEME.colors.text.primary, flex: 1 }} numberOfLines={1}>
                                {title}
                            </CyberText>
                        </View>

                        <View style={styles.divider} />

                        {/* CONTENU */}
                        <View style={styles.content}>
                            {children}
                        </View>

                        {/* BOUTONS */}
                        <View style={styles.footer}>
                            {onCancel && (
                                <View style={{ flex: 1 }}>
                                    <MyButton
                                        title={cancelText}
                                        onPress={onCancel}
                                        variant="danger"
                                        style={{ height: 50 }}
                                    />
                                </View>
                            )}

                            <View style={{ flex: 1.5 }}>
                                <MyButton
                                    title={confirmText}
                                    onPress={onConfirm}
                                    iconRight="chevron-forward"
                                    variant="outline"
                                    style={{ height: 50 }}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 24 },
    backgroundTouch: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    modalWrapper: { width: '100%', flexShrink: 1 },
    container: {
        width: '100%', borderRadius: 24, padding: 24,
        borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
    },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
    iconContainer: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', width: '100%', marginBottom: 20 },
    content: { marginBottom: 24, flexShrink: 1 },
    footer: { flexDirection: 'row', gap: 12, marginBottom: 16 },
});