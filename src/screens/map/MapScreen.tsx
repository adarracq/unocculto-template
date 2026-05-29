import InteractiveMap from '@/components/organisms/InteractiveMap';
import { StyleSheet, View } from 'react-native';
import { THEME } from '../../theme/theme';

export const MapScreen = () => {
    return (
        <View style={styles.container}>
            {/*<WorldMap
                selectedCountry="FR"
                onCountryPress={(countryCode: string) => console.log("Pays sélectionné :", countryCode)}
            />*/}
            <InteractiveMap
                selectedCountry="FR"
                onCountryPress={(countryCode: string) => console.log("Pays sélectionné :", countryCode)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
});