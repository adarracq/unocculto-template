import { StyleSheet, View } from 'react-native';
import { THEME } from '../../theme/theme';

export const PassportScreen = () => {
    return (
        <View style={styles.container}>
            {/* Contenu du passeport à venir */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
});