import { MyText } from '@/components/atoms/MyText';
import { getFlagImage } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface CountryListItemProps {
    country: any; // Type de ALL_COUNTRIES[0]
    memoryData?: { box: number; nextReviewDate: number };
    onPress: () => void;
}

export default function CountryListItem({ country, memoryData, onPress }: CountryListItemProps) {
    const isMastered = memoryData?.box === 5;
    const isUrgent = memoryData && memoryData.box > 0 && memoryData.box < 5 && memoryData.nextReviewDate <= Date.now();
    const isLearning = memoryData && memoryData.box > 0 && memoryData.box < 5 && !isUrgent;
    const isUnexplored = !memoryData || memoryData.box === 0;

    // Configuration par défaut
    let titleColor: string = THEME.colors.text.primary;
    let subtitleText: string = 'Non exploré';
    let subtitleColor: string = THEME.colors.text.disabled;
    let borderColor: string = THEME.colors.glass.border;
    let backgroundColor: string = THEME.colors.glass.background;

    // Configurations du badge
    let badgeIcon = null;
    let badgeColor = '#FFF';
    let badgeBg = 'transparent';

    if (isMastered) {
        titleColor = THEME.colors.success;
        subtitleText = 'Maîtrisé';
        subtitleColor = THEME.colors.success;
        borderColor = THEME.colors.success + '25';
        badgeIcon = 'checkmark-sharp';
        badgeBg = THEME.colors.success;
    } else if (isUrgent) {
        subtitleText = 'À réviser';
        subtitleColor = THEME.colors.danger;
        borderColor = THEME.colors.danger + '25';
        badgeIcon = 'warning';
        badgeBg = THEME.colors.danger;
    } else if (isLearning) {
        subtitleText = `Apprentissage (Niv ${memoryData.box})`;
        subtitleColor = THEME.colors.inProgress;
        borderColor = THEME.colors.inProgress + '25';
        badgeIcon = 'sync';
        badgeBg = THEME.colors.inProgress;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={[styles.container, { borderColor, backgroundColor }]}
        >
            {/* 1. Avatar (Drapeau + Badge de statut) */}
            <View style={styles.avatarContainer}>
                <Image source={getFlagImage(country.code)} style={styles.flag} resizeMode="cover" />

                {/* La pastille vient se poser sur le drapeau uniquement si exploré */}
                {!isUnexplored && badgeIcon && (
                    <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
                        <Ionicons name={badgeIcon as any} size={10} color={badgeColor} />
                    </View>
                )}
            </View>

            {/* 2. Textes alignés proprement */}
            <View style={styles.textContainer}>
                <MyText variant="body" style={{ fontFamily: 'Jakarta-Bold', color: titleColor, fontSize: 15, letterSpacing: 0.5 }}>
                    {country.name_fr.toUpperCase()}
                </MyText>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <MyText variant="bodySmall" colorType="secondary">
                        {country.capital || 'Capitale inconnue'}  •
                    </MyText>
                    <MyText variant="bodySmall" style={{ color: subtitleColor }}>
                        {subtitleText}
                    </MyText>
                </View>
            </View>

            {/* 3. Chevrons */}
            <Ionicons name="chevron-forward" size={20} color={THEME.colors.text.disabled} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
    },
    avatarContainer: {
        position: 'relative',
        width: 46,
        height: 46,
    },
    flag: {
        width: 46,
        height: 46,
        borderRadius: THEME.metrics.radius.round,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
    },
    statusBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: THEME.metrics.radius.round,
        justifyContent: 'center',
        alignItems: 'center',
        // Contour de la couleur du fond (pour créer l'effet de "découpe" sur le drapeau, style Apple)
        borderWidth: 2,
        borderColor: THEME.colors.background,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});