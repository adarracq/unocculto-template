// src/components/organisms/WorldProgressMap.tsx
import { THEME } from '@/theme/theme';
import { getScaledWorldGeoJSON } from '@/utils/geoUtils'; // 💡 Import du nouvel utilitaire
import MapLibreGL from '@maplibre/maplibre-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    validCountries?: string[]; // 💡 Rendu optionnel pour la rétrocompatibilité (ex: Accueil)
    urgentCountries: string[];
    consolidatedCountries: string[];
    masteredCountries: string[];

    regionId?: string;
    onCountryPress?: (code: string) => void;
    isBackground?: boolean;
}

const REGION_CAMERAS: Record<string, { center: [number, number], zoom: number }> = {
    WLD: { center: [10, 20], zoom: 0.5 },
    EUR: { center: [15, 50], zoom: 2.2 },
    ASI: { center: [90, 30], zoom: 1.2 },
    AFR: { center: [20, 0], zoom: 1.5 },
    AME: { center: [-80, 10], zoom: 0.8 },
    OCE: { center: [160, -25], zoom: 1 }
};

export default function WorldProgressMap({
    validCountries,
    urgentCountries,
    consolidatedCountries,
    masteredCountries,
    regionId = 'WLD',
    onCountryPress,
    isBackground = false
}: Props) {
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
        // 💡 1. On récupère le GeoJSON avec les micro-états déjà grossis !
        const ScaledGeoJSON = getScaledWorldGeoJSON();
        const features = ScaledGeoJSON.features;

        // 2. Si validCountries est fourni (ProfileScreen), on filtre. Sinon (HomeScreen), on prend tout.
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
            onCountryPress(feature.properties.iso_a2_eh);
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
                <MapLibreGL.Camera ref={cameraRef} defaultSettings={{ centerCoordinate: [10, 20], zoomLevel: 0.5 }} />

                <MapLibreGL.ShapeSource id="baseSource" shape={base} onPress={onCountryPress ? handlePress : undefined}>
                    {/* La couleur de fond change si on est sur la carte globale ou sur une région spécifique */}
                    <MapLibreGL.FillLayer id="baseFill" style={{ fillColor: validCountries ? '#2A2A2C' : '#121212' }} />
                    <MapLibreGL.LineLayer id="baseLine" style={{ lineColor: 'rgba(255,255,255,0.08)', lineWidth: 1 }} />
                </MapLibreGL.ShapeSource>

                {mastered.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="masteredSource" shape={mastered}>
                        <MapLibreGL.FillLayer id="masteredFill" style={{ fillColor: THEME.colors.success, fillOpacity: 0.3 }} />
                    </MapLibreGL.ShapeSource>
                )}

                {consolidated.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="consolidatedSource" shape={consolidated}>
                        <MapLibreGL.FillLayer id="consolidatedFill" style={{ fillColor: THEME.colors.primary, fillOpacity: 0.4 }} />
                    </MapLibreGL.ShapeSource>
                )}

                {urgent.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="urgentSource" shape={urgent}>
                        <MapLibreGL.FillLayer id="urgentFill" style={{ fillColor: THEME.colors.danger, fillOpacity: 0.5 }} />
                        <MapLibreGL.LineLayer id="urgentLine" style={{ lineColor: THEME.colors.danger, lineWidth: 2, lineBlur: 2 }} />
                    </MapLibreGL.ShapeSource>
                )}
            </MapLibreGL.MapView>

            {isBackground && (
                <>
                    <LinearGradient colors={['transparent', THEME.colors.background, THEME.colors.background]} locations={[0, 0.4, 1]} style={styles.gradientOverlay} pointerEvents="none" />
                    <LinearGradient colors={[THEME.colors.background, 'transparent']} style={styles.gradientOverlayTop} pointerEvents="none" />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: { ...StyleSheet.absoluteFill },
    cardContainer: { flex: 1, backgroundColor: THEME.colors.background, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: THEME.colors.glass.border },
    map: { flex: 1 },
    gradientOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%' },
    gradientOverlayTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 80 },
});