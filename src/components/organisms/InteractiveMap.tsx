import { THEME } from '@/theme/theme';
import MapLibreGL from '@maplibre/maplibre-react-native';
// 💡 1. Import de memo
import { memo, useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { feedbackService } from '@/utils/feedbackService';
import { getScaledWorldGeoJSON } from '@/utils/geoUtils';
import { LinearGradient } from 'expo-linear-gradient';

MapLibreGL.setAccessToken(null);

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
    defaultFillColor?: string;
    hideUncoloredBorders?: boolean;
}

// 💡 2. Transformation en fonction fléchée pour utiliser memo()
const InteractiveMap = ({
    countryColors = {},
    onCountryPress,
    selectedCountry,
    focusCoordinates,
    isFullHeight,
    zoomLevel = 3,
    defaultCenter = [2.35, 48.85],
    defaultZoom = 1,
    defaultFillColor = '#2A2A2A',
    hideUncoloredBorders = false
}: Props) => {
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

    const fillColorExpression = useMemo(() => {
        const cases: any[] = [];
        Object.entries(countryColors).forEach(([code, color]) => {
            cases.push(code, color);
        });

        if (selectedCountry && !countryColors[selectedCountry]) {
            cases.push(selectedCountry, THEME.colors.primary);
        }

        if (cases.length === 0) return defaultFillColor;
        return ['match', ['get', 'iso_a2_eh'], ...cases, defaultFillColor];
    }, [countryColors, selectedCountry, defaultFillColor]);

    const lineColorExpression = useMemo(() => {
        if (!hideUncoloredBorders) return THEME.colors.glass.border;

        const cases: any[] = [];
        Object.keys(countryColors).forEach(code => {
            cases.push(code, THEME.colors.glass.borderHighlight);
        });

        if (cases.length === 0) return 'transparent';
        return ['match', ['get', 'iso_a2_eh'], ...cases, 'transparent'];
    }, [countryColors, hideUncoloredBorders]);

    const handleShapePress = (e: any) => {
        if (!onCountryPress) return;

        const feature = e.features[0];
        const countryCode = feature?.properties?.iso_a2_eh;

        if (countryCode) {
            // Le retour haptique se déclenche instantanément
            feedbackService.light();

            // 💡 3. ASTUCE DE PERFORMANCE : On décale l'appel de mise à jour d'état
            requestAnimationFrame(() => {
                onCountryPress(countryCode);
            });
        }
    };

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
                    // 💡 4. Évite d'attacher l'écouteur côté natif si aucun callback n'est fourni
                    onPress={onCountryPress ? handleShapePress : undefined}
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
                            lineColor: lineColorExpression as any,
                            lineWidth: hideUncoloredBorders ? 1 : 0.5,
                            lineOpacity: hideUncoloredBorders ? 1 : 0.5
                        }}
                    />
                </MapLibreGL.ShapeSource>
            </MapLibreGL.MapView>
            <>
                <LinearGradient
                    colors={['transparent', THEME.colors.background,]}
                    style={styles.gradientOverlay}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={[THEME.colors.background, 'transparent']}
                    style={styles.gradientOverlayTop}
                    pointerEvents="none"
                />
            </>
        </View>
    );
};

// 💡 6. Export du composant mémorisé
export default memo(InteractiveMap);

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%', backgroundColor: THEME.colors.background },
    map: { flex: 1 },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20%'
    },
    gradientOverlayTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '20%'
    },
});