import { CyberText } from '@/components/atoms/CyberText';
import { GlassContainer } from '@/components/atoms/GlassContainer';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions'; // Restauration de votre utilitaire
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Restauration du gradient
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    type: string;
    bonus: string;
    regionId: string;
    onPress: () => void;
}

export default function DailyMissionCard({ title, type, bonus, regionId, onPress }: Props) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);

            const diff = midnight.getTime() - now.getTime();
            if (diff <= 0) return "EXPIRÉ";

            const hours = Math.floor((diff / (1000 * 60 * 60)));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            return `${hours}h${minutes}min`;
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
            {/* Le gradient qui vient donner la teinte dorée "premium" */}
            <LinearGradient
                colors={[THEME.colors.primary + '30', 'rgba(0,0,0,0)']} // Or à 30% d'opacité vers transparent
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
            />

            {/* L'image de fond du continent en filigrane restaurée */}
            <View style={styles.bgIconContainer}>
                <Image
                    source={functions.getImageSource(regionId)}
                    style={styles.bgIcon}
                    resizeMode="contain"
                />
            </View>

            {/* Le GlassContainer vient se poser par-dessus le fond et le gradient */}
            {/* On lui met une intensité faible (15) pour bien voir le gradient en dessous */}
            <GlassContainer intensity={15} borderRadius={THEME.metrics.radius.md}>

                {/* En-tête : Tags et Timer */}
                <View style={styles.badgeRow}>
                    <View style={styles.tagContainer}>
                        <CyberText variant="caps" style={{ color: THEME.colors.background, fontSize: 10 }}>
                            PRIORITÉ HAUTE
                        </CyberText>
                    </View>
                    <CyberText variant="caps" accent="primary" style={{ fontSize: 10 }}>
                        EXPIRE DANS {timeLeft}
                    </CyberText>
                </View>

                {/* Contenu principal */}
                <View style={styles.contentRow}>
                    <View style={{ flex: 1, zIndex: 1 }}>
                        <CyberText variant="caps" colorType="secondary" style={{ marginBottom: 4 }}>
                            CIBLE : {type}
                        </CyberText>
                        <CyberText variant="h2">{title}</CyberText>
                    </View>

                    {/* Pastille Bonus XP */}
                    <View style={styles.bonusPill}>
                        <Ionicons name="flash" size={14} color={THEME.colors.background} />
                        <CyberText variant="caps" style={{ color: THEME.colors.background, fontSize: 12, marginLeft: 4 }}>
                            {bonus}
                        </CyberText>
                    </View>
                </View>

            </GlassContainer>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: THEME.metrics.spacing.xl,
        width: '100%',
        // CORRECTION DE LA BORDURE : La bordure est sur le parent, avec un overflow et le même radius que le GlassContainer !
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        borderColor: THEME.colors.primary,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)', // Fond de base
    },
    // Le conteneur de l'image de fond
    bgIconContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden',
    },
    // L'image du continent
    bgIcon: {
        width: '80%',
        height: '80%',
        opacity: 0.1, // Filigrane
        right: -30,   // Décalé sur la droite comme dans votre original
        top: 10,
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: THEME.metrics.spacing.md
    },
    tagContainer: {
        backgroundColor: THEME.colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bonusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.text.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: THEME.metrics.radius.round,
        shadowColor: THEME.colors.text.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 2,
    },
});