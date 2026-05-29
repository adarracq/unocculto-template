// src/screens/arena/geogames/components/SingleCountryMap.tsx
import WorldGeoJSON from '@/data/countriesM.json'; // Vérifiez le chemin de votre JSON
import { THEME } from '@/theme/theme';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const calculateBounds = (coordinates: any[], type: string): [number, number, number, number] | null => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    const traverse = (coords: any[]) => {
        if (typeof coords[0] === 'number') {
            const x = coords[0];
            const y = coords[1];
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        } else {
            coords.forEach(sub => traverse(sub));
        }
    };

    traverse(coordinates);
    if (minX === Infinity) return null;

    const paddingX = (maxX - minX) * 0.1;
    const paddingY = (maxY - minY) * 0.1;
    return [minX - paddingX, minY - paddingY, maxX + paddingX, maxY + paddingY];
};

interface Props {
    countryCode: string;
    status?: 'playing' | 'success' | 'error';
}

export default function SingleCountryMap({ countryCode, status = 'playing' }: Props) {
    const cameraRef = useRef<MapLibreGL.Camera>(null);

    const countryFeature = useMemo(() => {
        const feature = (WorldGeoJSON as any).features.find(
            (f: any) => f.properties.iso_a2_eh === countryCode
        );
        if (!feature) return null;
        return { type: "FeatureCollection", features: [feature] };
    }, [countryCode]);

    const bounds = useMemo(() => {
        if (!countryFeature || !countryFeature.features[0]) return null;
        const feature = countryFeature.features[0];
        return calculateBounds(feature.geometry.coordinates, feature.geometry.type);
    }, [countryFeature]);

    // Couleur dynamique du tracé selon l'état du jeu
    const contourColor =
        status === 'success' ? THEME.colors.success :
            status === 'error' ? THEME.colors.danger :
                THEME.colors.primary;

    if (!countryFeature) return <View style={styles.container} />;

    return (
        <View style={styles.container}>
            <MapLibreGL.MapView
                style={styles.map}
                mapStyle={JSON.stringify({
                    version: 8,
                    name: "Void",
                    sources: {},
                    layers: [{
                        id: 'background',
                        type: 'background',
                        paint: { 'background-color': THEME.colors.background } // Noir pur (OLED)
                    }]
                })}
                logoEnabled={false}
                attributionEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
            >
                <MapLibreGL.Camera
                    ref={cameraRef}
                    bounds={bounds ? {
                        ne: [bounds[2], bounds[3]],
                        sw: [bounds[0], bounds[1]],
                        paddingBottom: 50, paddingTop: 50, paddingLeft: 50, paddingRight: 50
                    } : undefined}
                    animationDuration={1000}
                />

                <MapLibreGL.ShapeSource id="singleCountrySource" shape={countryFeature}>
                    <MapLibreGL.FillLayer
                        id="singleCountryFill"
                        style={{ fillColor: contourColor, fillOpacity: 0.15 }}
                    />
                    <MapLibreGL.LineLayer
                        id="singleCountryLine"
                        style={{
                            lineColor: contourColor,
                            lineWidth: 3,
                            lineOpacity: 1,
                            lineBlur: 2 // Effet néon
                        }}
                    />
                </MapLibreGL.ShapeSource>
            </MapLibreGL.MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },
    map: { flex: 1 }
});