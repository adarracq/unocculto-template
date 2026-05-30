// src/components/organisms/CountryFocusMap.tsx
import { MICRO_STATES } from '@/data/Countries';
import WorldGeoJSON from '@/data/countriesM.json';
import { THEME } from '@/theme/theme';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    countryCode: string;
    centerCoordinate: [number, number];
    zoom?: number;
}

export default function CountryFocusMap({ countryCode, centerCoordinate, zoom = 3 }: Props) {
    const cameraRef = useRef<MapLibreGL.Camera>(null);

    if (MICRO_STATES.includes(countryCode)) {
        zoom = zoom * 2; // Zoom plus serré pour les micro-états
    }

    // Préparation des calques GeoJSON
    const baseWorld = useMemo(() => WorldGeoJSON, []);

    const focusedWorld = useMemo(() => {
        const features = (WorldGeoJSON as any).features.filter(
            (f: any) => f.properties.iso_a2_eh === countryCode
        );
        return { type: "FeatureCollection", features };
    }, [countryCode]);

    // Animation fluide lors du changement de pays
    useEffect(() => {
        if (cameraRef.current && centerCoordinate) {
            cameraRef.current.setCamera({
                centerCoordinate,
                zoomLevel: zoom,
                animationDuration: 1500, // Déplacement cinématique
            });
        }
    }, [centerCoordinate, zoom]);

    return (
        <View style={styles.container}>
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
                <MapLibreGL.Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate,
                        zoomLevel: zoom,
                    }}
                />

                {/* LAYER 1 : LE RESTE DU MONDE */}
                <MapLibreGL.ShapeSource id="baseSource" shape={baseWorld}>
                    <MapLibreGL.FillLayer id="baseFill" style={{ fillColor: '#121212' }} />
                    <MapLibreGL.LineLayer id="baseLine" style={{ lineColor: 'rgba(255,255,255,0.05)', lineWidth: 1 }} />
                </MapLibreGL.ShapeSource>

                {/* LAYER 2 : LE PAYS CIBLE (Illuminé) */}
                {focusedWorld.features.length > 0 && (
                    <MapLibreGL.ShapeSource id="focusedSource" shape={focusedWorld}>
                        <MapLibreGL.FillLayer id="focusedFill" style={{ fillColor: THEME.colors.primary, fillOpacity: 0.25 }} />
                        <MapLibreGL.LineLayer id="focusedLine" style={{ lineColor: THEME.colors.primary, lineWidth: 2, lineBlur: 2 }} />
                    </MapLibreGL.ShapeSource>
                )}
            </MapLibreGL.MapView>

            {/* DÉGRADÉS POUR LISIBILITÉ DE L'INTERFACE FLOTTANTE */}
            <LinearGradient
                colors={['transparent', THEME.colors.background]}
                locations={[0, 0.8]}
                style={styles.gradientBottom}
                pointerEvents="none"
            />
            <LinearGradient
                colors={[THEME.colors.background, 'transparent']}
                style={styles.gradientTop}
                pointerEvents="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        height: '75%',
    },
    map: { flex: 1 },
    gradientBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%' },
    gradientTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 140 },
});