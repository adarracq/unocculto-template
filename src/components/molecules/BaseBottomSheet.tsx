// src/components/molecules/BaseBottomSheet.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface BottomSheetModalProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const BaseBottomSheet = ({ isVisible, onClose, title, children }: BottomSheetModalProps) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            statusBarTranslucent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 24 : 0}
                style={styles.keyboardRoot}
            >
                <View style={styles.overlay}>
                    <LinearGradient colors={[THEME.colors.backgroundLight, THEME.colors.background]} style={styles.modalContainer}>

                        <View style={styles.dragHandleContainer}>
                            <View style={styles.dragHandle} />
                        </View>

                        <View style={styles.header}>
                            <CyberText variant="h2" style={{ color: THEME.colors.text.primary, fontSize: 18 }}>
                                {title.toUpperCase()}
                            </CyberText>
                            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                                <Ionicons name="close" color={THEME.colors.text.secondary} size={20} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            bounces={false}
                        >
                            {children}
                        </ScrollView>

                    </LinearGradient>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    keyboardRoot: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: THEME.colors.backgroundLight,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderTopWidth: 1,
        borderColor: THEME.colors.glass.border,
        maxHeight: '90%',
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        width: '100%',
    },
    dragHandleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    dragHandle: {
        width: 40, height: 4, borderRadius: 2,
        backgroundColor: THEME.colors.glass.borderHighlight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.glass.border,
    },
    closeBtn: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        width: 36, height: 36, borderRadius: 18,
        justifyContent: 'center', alignItems: 'center',
    },
    scrollView: {
        flexShrink: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    }
});