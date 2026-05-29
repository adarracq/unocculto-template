import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

// On garde 3 variantes claires
type ButtonVariant = 'solid' | 'glass' | 'outline';

interface MyButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;

  leftIcon?: string;
  rightIcon?: string;

  disabled?: boolean;
  style?: ViewStyle;
  bump?: boolean; // Animation de flèche

  // Surcharges manuelles (si besoin)
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function MyButton({
  title,
  onPress,
  variant = 'glass',
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  bump = false,
  backgroundColor,
  textColor,
  borderColor,
}: MyButtonProps) {

  // --- Animations ---
  const scaleValue = useRef(new Animated.Value(1)).current;
  const bumpValue = useRef(new Animated.Value(0)).current; // On part de 0 (position initiale)

  const handlePressIn = () => {
    if (disabled) return;
    functions.vibrate('click');
    Animated.spring(scaleValue, { toValue: 0.96, useNativeDriver: true, speed: 20 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
  };

  // Animation du Bump corrigée (Translation X)
  useEffect(() => {
    if (bump && !disabled) {
      const anim = Animated.loop(
        Animated.sequence([
          // Mouvement vers la droite (5px)
          Animated.timing(bumpValue, {
            toValue: 6,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          // Retour position 0
          Animated.timing(bumpValue, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      );
      anim.start();
      return () => anim.stop();
    } else {
      bumpValue.setValue(0);
    }
  }, [bump, disabled]);

  // --- Configuration des Styles ---
  const getStyles = () => {
    if (disabled) return {
      container: styles.disabledContainer,
      bg: THEME.colors.accent,
      text: THEME.colors.backgroundLight,
      iconTint: THEME.colors.backgroundLight,
      border: THEME.colors.backgroundLight,
    };

    switch (variant) {
      case 'glass':
        return {
          container: styles.glassContainer,
          // Blanc semi-transparent par défaut
          bg: backgroundColor || 'rgba(255, 255, 255, 0.2)',
          text: textColor || THEME.colors.accent,
          iconTint: textColor || THEME.colors.accent,
          border: borderColor || 'rgba(255, 255, 255, 0.3)',
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          bg: backgroundColor || 'transparent',
          text: textColor || THEME.colors.text.primary,
          iconTint: textColor || THEME.colors.accent,
          border: borderColor || THEME.colors.accent
        };
      case 'solid':
      default:
        return {
          container: styles.solidContainer,
          // Fond Blanc, Texte Couleur Principale (Plus doux que noir)
          bg: backgroundColor || THEME.colors.accent,
          text: textColor || THEME.colors.primary,
          iconTint: textColor || THEME.colors.primary,
          border: borderColor || 'transparent'
        };
    }
  };

  const config = getStyles();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }], width: '100%' }, style]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.baseContainer,
          config.container,
          {
            backgroundColor: config.bg,
            borderColor: config.border
          }
        ]}
      >
        {/* Groupe Gauche (Icone + Texte) */}
        <View style={styles.leftGroup}>
          {leftIcon && (
            <Image
              source={functions.getIconSource(leftIcon)}
              style={[styles.icon, { tintColor: config.iconTint }]}
            />
          )}
          <Text style={[styles.text, { color: config.text }]}>
            {title}
          </Text>
        </View>

        {/* Icone Droite (Animée) */}
        {rightIcon && (
          <Animated.View style={{
            transform: [{ translateX: bumpValue }] // On bouge en X
          }}>
            <Image
              source={functions.getIconSource(rightIcon)}
              style={[styles.icon, { tintColor: config.iconTint }]}
            />
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    height: 58, // Hauteur confortable
    width: '100%',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderCurve: 'continuous',
  },

  // --- Styles spécifiques ---
  solidContainer: {
    // Ombre douce colorée (glow)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  glassContainer: {
    borderWidth: 1,
    // Pas d'ombre portée sur le verre pour garder la transparence clean
  },
  outlineContainer: {
    borderWidth: 1,
  },
  disabledContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // --- Texte & Icones ---
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  text: {
    fontFamily: 'title-bold',
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }
});