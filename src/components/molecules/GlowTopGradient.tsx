import { THEME } from '@/theme/theme';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

type Props = {
    color?: string;
};

export default function GlowTopGradient({ color }: Props) {
    const base = color ?? THEME.colors.primary;

    return (
        <Svg
            pointerEvents="none"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 220,
                height: 220,
            }}
            viewBox="0 0 220 220"
        >
            <Defs>
                <RadialGradient id="cornerGlow" cx="0%" cy="0%" r="90%">
                    <Stop offset="0%" stopColor={base} stopOpacity={0.4} />
                    <Stop offset="45%" stopColor={base} stopOpacity={0.18} />
                    <Stop offset="100%" stopColor={base} stopOpacity={0} />
                </RadialGradient>
            </Defs>

            <Rect x="0" y="0" width="220" height="220" fill="url(#cornerGlow)" />
        </Svg>
    );
}