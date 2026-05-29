import { THEME } from '@/theme/theme';
import { Text, TextStyle } from 'react-native';

type BodyTextProps = {
    text: string;
    size?: string; // S || M || L || XL
    nbLines?: number;
    style?: TextStyle;
    color?: string;
    isItalic?: boolean;
    isBold?: boolean;
    isMedium?: boolean;
    centered?: boolean;
}

export default function BodyText(props: BodyTextProps) {
    return (
        <Text numberOfLines={props.nbLines}
            style={[{
                fontSize: props.size === 'S' ? 12 : props.size === 'M' ? 16 :
                    props.size === 'L' ? 20 : props.size === 'XL' ? 24 : 16,
                color: props.color ? props.color : THEME.colors.white,
                textAlign: props.centered ? 'center' : 'left',
                fontFamily: props.isItalic ? 'text-italic' : props.isBold ? 'text-bold' : props.isMedium ? 'text-medium' : 'text-regular',
            }, props.style]}>
            {props.text}
        </Text>
    )
}