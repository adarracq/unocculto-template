// src/utils/geoUtils.ts
import { MICRO_ISLANDS_STATES } from '@/data/Countries';
import WorldGeoJSON from '@/data/countriesM.json';

const SCALE_FACTOR = 3;
const EXTRA_THICKNESS = 0.2;

const scaleRingWithThickness = (coordinates: number[][]) => {
    if (!coordinates || coordinates.length === 0) return coordinates;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    coordinates.forEach(([x, y]) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    return coordinates.map(([x, y]) => {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return [x, y];

        const ux = dx / dist;
        const uy = dy / dist;
        const newDist = (dist * SCALE_FACTOR) + EXTRA_THICKNESS;

        return [
            centerX + ux * newDist,
            centerY + uy * newDist
        ];
    });
};

// Variable pour mettre en cache le résultat
let cachedScaledGeoJSON: any = null;

export const getScaledWorldGeoJSON = () => {
    // Si on a déjà calculé le GeoJSON modifié, on le renvoie immédiatement
    if (cachedScaledGeoJSON) {
        return cachedScaledGeoJSON;
    }

    const modifiedJSON = JSON.parse(JSON.stringify(WorldGeoJSON));

    modifiedJSON.features = modifiedJSON.features.map((feature: any) => {
        const countryCode = feature.properties.iso_a2_eh;

        if (!MICRO_ISLANDS_STATES.includes(countryCode)) {
            return feature;
        }

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

    cachedScaledGeoJSON = modifiedJSON;
    return cachedScaledGeoJSON;
};