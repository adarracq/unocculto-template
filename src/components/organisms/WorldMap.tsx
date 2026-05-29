// src/components/organisms/WorldMap.tsx

import { Camera, GeoJSONSource, Layer, Map } from '@maplibre/maplibre-react-native';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { THEME } from '../../theme/theme';

import { MICRO_ISLANDS_STATES } from '@/data/Countries';
import WorldGeoJSON from '../../data/countriesM.json';

// STYLE VIDE ABSOLU
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

const SCALE_FACTOR = 3;
const EXTRA_THICKNESS = 0.2;

export const WorldMap = ({
    countryColors = {},
    onCountryPress,
    selectedCountry,
    focusCoordinates,
    zoomLevel = 3,
    defaultCenter = [2.35, 48.85],
    defaultZoom = 1
}: any) => {

    const cameraRef = useRef<any>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (cameraRef.current && focusCoordinates) {
                try {
                    if (cameraRef.current.flyTo) {
                        cameraRef.current.flyTo(focusCoordinates, 2000);
                    } else if (cameraRef.current.setCamera) {
                        cameraRef.current.setCamera({
                            centerCoordinate: focusCoordinates,
                            zoomLevel: zoomLevel,
                            animationDuration: 2000,
                            animationMode: 'fly'
                        });
                    }
                } catch (e) {
                    console.log("Erreur caméra:", e);
                }
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

        if (cases.length === 0) {
            return THEME.colors.glass.background;
        }

        return ['match', ['get', 'iso_a2_eh'], ...cases, THEME.colors.glass.background];
    }, [countryColors, selectedCountry]);

    const handleShapePress = (e: any) => {
        const feature = e?.features?.[0] || e?.nativeEvent?.payload?.features?.[0];
        const countryCode = feature?.properties?.iso_a2_eh;

        if (countryCode && onCountryPress) {
            onCountryPress(countryCode);
        }
    };

    const scaleRingWithThickness = (coordinates: number[][]) => {
        if (!coordinates || coordinates.length === 0) return coordinates;

        // 1. Trouver le centre géométrique
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        coordinates.forEach(([x, y]) => {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        });
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // 2. Déplacer les points
        return coordinates.map(([x, y]) => {
            // Vecteur du centre vers le point
            const dx = x - centerX;
            const dy = y - centerY;

            // Distance actuelle
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Si le point est confondu avec le centre (bug rare), on ne touche pas
            if (dist === 0) return [x, y];

            // Vecteur Unitaire (Direction pure, longueur 1)
            const ux = dx / dist;
            const uy = dy / dist;

            // NOUVELLE FORMULE :
            // On garde la proportion (dist * factor) 
            // ET on ajoute une épaisseur fixe (EXTRA_THICKNESS) qui gonfle les formes fines
            const newDist = (dist * SCALE_FACTOR) + EXTRA_THICKNESS;

            return [
                centerX + ux * newDist,
                centerY + uy * newDist
            ];
        });
    };

    const scaledGeoJSON = useMemo(() => {
        const modifiedJSON = JSON.parse(JSON.stringify(WorldGeoJSON));

        modifiedJSON.features = modifiedJSON.features.map((feature: any) => {
            const countryCode = feature.properties.iso_a2_eh;

            if (!MICRO_ISLANDS_STATES.includes(countryCode)) {
                return feature;
            }

            // On applique la nouvelle fonction qui gonfle ET agrandit
            if (feature.geometry.type === 'Polygon') {
                feature.geometry.coordinates = feature.geometry.coordinates.map((ring: any) =>
                    scaleRingWithThickness(ring)
                );
            }
            else if (feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates = feature.geometry.coordinates.map((polygon: any) =>
                    polygon.map((ring: any) => scaleRingWithThickness(ring))
                );
            }

            return feature;
        });

        return modifiedJSON;
    }, []);


    return (
        <View style={styles.container}>
            <Map
                style={styles.map}
                mapStyle={JSON.stringify(VOID_STYLE)}
                logoEnabled={false}
                attributionEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
            >
                <Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: defaultCenter,
                        zoomLevel: defaultZoom,
                    }}
                />

                {/* 3. BOUCLIER ANTI-CRASH : On ne rend la source que si la donnée est valide */}
                {scaledGeoJSON && (
                    <GeoJSONSource
                        id="countriesSource"
                        data={scaledGeoJSON}
                        onPress={handleShapePress}
                        hitbox={{ top: 25, bottom: 25, left: 25, right: 25 }}
                    >
                        <Layer
                            id="countriesFill"
                            type="fill"
                            // CORRECTION DU WARNING : on utilise `paint` au lieu de `style`
                            paint={{
                                fillColor: fillColorExpression as any,
                                fillOpacity: 1
                            }}
                        />
                        <Layer
                            id="countriesLine"
                            type="line"
                            paint={{
                                lineColor: THEME.colors.glass.border,
                                lineWidth: 0.8,
                            }}
                        />
                    </GeoJSONSource>
                )}
            </Map>
        </View>
    );
};

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