// src/components/molecules/BaseBottomSheet.tsx
import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
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
            onRequestClose={() => {
                feedbackService.light();
                onClose();
            }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 24 : 0}
                style={styles.keyboardRoot}
            >
                <View style={styles.overlay}>
                    <LinearGradient colors={[THEME.colors.backgroundVeryLight, THEME.colors.background]} style={styles.modalContainer}>

                        <View style={styles.dragHandleContainer}>
                            <View style={styles.dragHandle} />
                        </View>

                        <View style={styles.header}>
                            <MyText variant="h2" style={{ color: THEME.colors.text.primary, fontSize: 18 }}>
                                {title.toUpperCase()}
                            </MyText>
                            <TouchableOpacity onPress={() => { feedbackService.error(); onClose(); }} style={styles.closeBtn}>
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
        paddingHorizontal: THEME.paddings.horizontal,
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
        width: 36, height: 36, borderRadius: THEME.metrics.radius.md,
        justifyContent: 'center', alignItems: 'center',
    },
    scrollView: {
        flexShrink: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    }
});