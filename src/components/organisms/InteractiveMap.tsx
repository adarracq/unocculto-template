import { THEME } from '@/theme/theme';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

// 💡 Import de l'utilitaire global
import { getScaledWorldGeoJSON } from '@/utils/geoUtils';

// Pour éviter les warnings
MapLibreGL.setAccessToken(null);

// STYLE VIDE ABSOLU (Noir, sans sources)
const VOID_STYLE = {
    version: 8,
    name: "Void",
    sources: {},
    layers: [
        {
            id: 'background',
            type: 'background',
            paint: {
                'background-color': THEME.colors.background
            }
        }
    ]
};

interface Props {
    countryColors?: Record<string, string>;
    onCountryPress?: (countryCode: string) => void;
    selectedCountry?: string | null;
    focusCoordinates?: [number, number] | null;
    isFullHeight?: boolean;
    zoomLevel?: number;
    defaultCenter?: [number, number];
    defaultZoom?: number;
}

export default function InteractiveMap({
    countryColors = {},
    onCountryPress,
    selectedCountry,
    focusCoordinates,
    isFullHeight,
    zoomLevel = 3,
    defaultCenter = [2.35, 48.85],
    defaultZoom = 1
}: Props) {
    const cameraRef = useRef<MapLibreGL.Camera>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (cameraRef.current && focusCoordinates) {
                cameraRef.current.setCamera({
                    centerCoordinate: focusCoordinates,
                    zoomLevel: zoomLevel,
                    animationDuration: 2000,
                    animationMode: 'flyTo'
                });
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [focusCoordinates, zoomLevel]);

    // --- LOGIQUE COULEURS ---
    const fillColorExpression = useMemo(() => {
        const cases: any[] = [];

        Object.entries(countryColors).forEach(([code, color]) => {
            cases.push(code, color);
        });

        if (selectedCountry && !countryColors[selectedCountry]) {
            cases.push(selectedCountry, THEME.colors.primary);
        }

        if (cases.length === 0) {
            return '#2A2A2A';
        }

        return ['match', ['get', 'iso_a2_eh'], ...cases, '#2A2A2A'];
    }, [countryColors, selectedCountry]);

    const handleShapePress = (e: any) => {
        const feature = e.features[0];
        const countryCode = feature?.properties?.iso_a2_eh;

        if (countryCode && onCountryPress) {
            onCountryPress(countryCode);
        }
    };

    // 💡 RÉCUPÉRATION DU GEOJSON (Mis en cache et déjà calculé !)
    const scaledGeoJSON = useMemo(() => {
        return getScaledWorldGeoJSON();
    }, []);

    return (
        <View style={[styles.container, { height: isFullHeight ? Dimensions.get('window').height + 100 : 450 }]}>
            <MapLibreGL.MapView
                key="map-void"
                style={styles.map}
                mapStyle={JSON.stringify(VOID_STYLE)}
                logoEnabled={false}
                attributionEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
            >
                <MapLibreGL.Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: defaultCenter,
                        zoomLevel: defaultZoom,
                    }}
                />

                <MapLibreGL.ShapeSource
                    id="countriesSource"
                    shape={scaledGeoJSON}
                    onPress={handleShapePress}
                    hitbox={{ width: 50, height: 50 }}
                >
                    <MapLibreGL.FillLayer
                        id="countriesFill"
                        style={{
                            fillColor: fillColorExpression,
                            fillOpacity: 1
                        }}
                    />
                    <MapLibreGL.LineLayer
                        id="countriesLine"
                        style={{
                            lineColor: THEME.colors.glass.border,
                            lineWidth: 0.5,
                            lineOpacity: 0.5
                        }}
                    />
                </MapLibreGL.ShapeSource>
            </MapLibreGL.MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: THEME.colors.background,
    },
    map: {
        flex: 1
    }
});