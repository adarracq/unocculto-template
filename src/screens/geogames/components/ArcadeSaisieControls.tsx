// src/screens/arena/geogames/components/ArcadeSaisieControls.tsx
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    status: 'playing' | 'success' | 'error';
    onSubmit: (text: string) => void;
    placeholder?: string;
}

export default function ArcadeSaisieControls({ status, onSubmit, placeholder = "ENTREZ LA RÉPONSE..." }: Props) {
    const [text, setText] = useState('');

    // On efface le champ de texte dès que le hook passe à la question suivante
    useEffect(() => {
        if (status === 'playing') {
            setText('');
        }
    }, [status]);

    const handleSend = () => {
        if (!text.trim() || status !== 'playing') return;
        onSubmit(text.trim());
    };

    // Style de la bordure du champ selon le statut de correction
    const getInputColor = () => {
        if (status === 'success') return THEME.colors.success;
        if (status === 'error') return THEME.colors.danger;
        return text.trim() ? THEME.colors.primary : THEME.colors.glass.border;
    };

    const border = getInputColor();

    return (
        <View style={styles.container}>
            <View style={[styles.terminalInput, { borderColor: border }]}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder={placeholder}
                    placeholderTextColor={THEME.colors.text.disabled}
                    editable={status === 'playing'}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onSubmitEditing={handleSend}
                    style={styles.inputField}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleSend}
                    disabled={!text.trim() || status !== 'playing'}
                    style={[styles.sendButton, { backgroundColor: text.trim() && status === 'playing' ? THEME.colors.primary : 'transparent' }]}
                >
                    <Ionicons
                        name={status === 'success' ? "checkmark" : status === 'error' ? "close" : "arrow-forward"}
                        size={20}
                        color={text.trim() && status === 'playing' ? THEME.colors.background : THEME.colors.text.disabled}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%' },
    terminalInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 58,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1.5,
        paddingLeft: 16,
        overflow: 'hidden'
    },
    inputField: {
        flex: 1,
        color: THEME.colors.text.primary,
        fontSize: 16,
        fontFamily: 'Courier New', // Style console
        fontWeight: 'bold',
        height: '100%'
    },
    sendButton: {
        width: 58,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,0.05)'
    }
});