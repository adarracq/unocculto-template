import { REGION_CAMERAS } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { getScaledWorldGeoJSON } from '@/utils/geoUtils';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// 💡 1. Importez 'memo' depuis react
import { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    validCountries?: string[];
    urgentCountries: string[];
    consolidatedCountries: string[];
    masteredCountries: string[];

    regionId?: string;
    onCountryPress?: (code: string) => void;
    isBackground?: boolean;
}

// 💡 2. Transformez la fonction en constante pour pouvoir utiliser memo()
const WorldProgressMap = ({
    validCountries,
    urgentCountries,
    consolidatedCountries,
    masteredCountries,
    regionId = 'WLD',
    onCountryPress,
    isBackground = false
}: Props) => {
    const cameraRef = useRef<MapLibreGL.Camera>(null);

    useEffect(() => {
        const config = REGION_CAMERAS[regionId] || REGION_CAMERAS['WLD'];
        cameraRef.current?.setCamera({
            centerCoordinate: config.center,
            zoomLevel: config.zoom,
            animationDuration: 1200
        });
    }, [regionId]);

    const { base, mastered, consolidated, urgent } = useMemo(() => {
        const ScaledGeoJSON = getScaledWorldGeoJSON();
        let features = ScaledGeoJSON.features;

        features = features.filter((f: any) => f.properties.iso_a2_eh !== 'AQ');

        const regionFeatures = validCountries
            ? features.filter((f: any) => validCountries.includes(f.properties.iso_a2_eh))
            : features;

        return {
            base: { type: "FeatureCollection", features: regionFeatures },
            mastered: { type: "FeatureCollection", features: regionFeatures.filter((f: any) => masteredCountries.includes(f.properties.iso_a2_eh)) },
            consolidated: { type: "FeatureCollection", features: regionFeatures.filter((f: any) => consolidatedCountries.includes(f.properties.iso_a2_eh)) },
            urgent: { type: "FeatureCollection", features: regionFeatures.filter((f: any) => urgentCountries.includes(f.properties.iso_a2_eh)) }
        };
    }, [validCountries, masteredCountries, consolidatedCountries, urgentCountries]);

    const handlePress = (event: any) => {
        if (!onCountryPress) return;
        const feature = event?.features?.[0];
        if (feature?.properties?.iso_a2_eh) {

            // Le retour haptique se déclenche instantanément
            feedbackService.light();

            // 💡 3. ASTUCE DE PERFORMANCE : On attend la frame suivante pour mettre à jour l'état
            // Cela libère le thread UI et supprime la sensation de lag au moment du clic
            requestAnimationFrame(() => {
                onCountryPress(feature.properties.iso_a2_eh);
            });
        }
    };

    return (
        <View style={isBackground ? styles.backgroundContainer : styles.cardContainer}>
            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}
                attributionEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={true}
                zoomEnabled={true}
                compassEnabled={false}
                mapStyle={JSON.stringify({
                    version: 8,
                    name: "DarkHUD",
                    sources: {},
                    layers: [{
                        id: 'background',
                        type: 'background',
                        paint: { 'background-color': THEME.colors.background }
                    }]
                })}
            >
                <MapLibreGL.Camera
                    ref={cameraRef}
                    defaultSettings={{ centerCoordinate: [10, 20], zoomLevel: 0.5 }}
                    maxBounds={{
                        ne: [180, 85],
                        sw: [-180, -60]
                    }}
                />

                <MapLibreGL.ShapeSource id="baseSource" shape={base} onPress={onCountryPress ? handlePress : undefined} >
                    <MapLibreGL.FillLayer id="baseFill" style={{ fillColor: validCountries ? THEME.colors.backgroundVeryLight : THEME.colors.backgroundLight }} />
                    <MapLibreGL.LineLayer id="baseLine" style={{ lineColor: validCountries ? 'rgba(200,200,200,0.1)' : THEME.colors.backgroundVeryLight, lineWidth: 0.2 }} />
                </MapLibreGL.ShapeSource>

                {mastered.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="masteredSource" shape={mastered}>
                        <MapLibreGL.FillLayer id="masteredFill" style={{ fillColor: THEME.colors.success, fillOpacity: 0.15 }} />
                        <MapLibreGL.LineLayer id="masteredLine" style={{ lineColor: THEME.colors.success, lineWidth: .5 }} />
                    </MapLibreGL.ShapeSource>
                )}

                {consolidated.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="consolidatedSource" shape={consolidated}>
                        <MapLibreGL.FillLayer id="consolidatedFill" style={{ fillColor: THEME.colors.inProgress, fillOpacity: 0.2 }} />
                        <MapLibreGL.LineLayer id="consolidatedLine" style={{ lineColor: THEME.colors.inProgress, lineWidth: 0.5 }} />
                    </MapLibreGL.ShapeSource>
                )}

                {urgent.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="urgentSource" shape={urgent}>
                        <MapLibreGL.FillLayer id="urgentFill" style={{ fillColor: THEME.colors.danger, fillOpacity: 0.25 }} />
                        <MapLibreGL.LineLayer id="urgentLine" style={{ lineColor: THEME.colors.danger, lineWidth: .5 }} />
                    </MapLibreGL.ShapeSource>
                )}
            </MapLibreGL.MapView>

            {isBackground && (
                <>
                    <LinearGradient
                        colors={['transparent', THEME.colors.background, THEME.colors.background]}
                        locations={[0, 0.6, 1]}
                        style={styles.gradientOverlay}
                        pointerEvents="none"
                    />
                    <LinearGradient
                        colors={[THEME.colors.background, 'transparent']}
                        style={styles.gradientOverlayTop}
                        pointerEvents="none"
                    />
                </>
            )}
        </View>
    );
};

// 💡 4. Exportez le composant protégé
export default memo(WorldProgressMap);

const styles = StyleSheet.create({
    backgroundContainer: {
        ...StyleSheet.absoluteFill
    },
    cardContainer: {
        flex: 1,
        backgroundColor: THEME.colors.background,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
    },
    map: {
        flex: 1
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%'
    },
    gradientOverlayTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100
    },
});