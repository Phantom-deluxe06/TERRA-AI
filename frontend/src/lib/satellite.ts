/**
 * TERRA AI - Satellite Image Service
 * Fetches satellite imagery from Google Maps Static API
 */

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export interface SatelliteImageOptions {
    lat: number;
    lng: number;
    zoom?: number;        // 1-21 (default: 18 for detailed view)
    width?: number;       // Image width in pixels (max 640 for free tier)
    height?: number;      // Image height in pixels (max 640 for free tier)
}

export interface SatelliteImageResult {
    imageUrl: string;
    lat: number;
    lng: number;
    zoom: number;
    timestamp: string;
}

/**
 * Generate a satellite image URL for the given coordinates
 */
export function getSatelliteImageUrl(options: SatelliteImageOptions): string {
    const {
        lat,
        lng,
        zoom = 18,
        width = 640,
        height = 640,
    } = options;

    if (!GOOGLE_MAPS_API_KEY) {
        console.error('[Satellite] Google Maps API key not configured');
        throw new Error('Google Maps API key not configured');
    }

    const url = new URL('https://maps.googleapis.com/maps/api/staticmap');
    url.searchParams.set('center', `${lat},${lng}`);
    url.searchParams.set('zoom', zoom.toString());
    url.searchParams.set('size', `${width}x${height}`);
    url.searchParams.set('maptype', 'satellite');
    url.searchParams.set('key', GOOGLE_MAPS_API_KEY);

    return url.toString();
}

/**
 * Fetch satellite image as a blob for processing
 */
export async function fetchSatelliteImage(
    options: SatelliteImageOptions
): Promise<SatelliteImageResult> {
    const imageUrl = getSatelliteImageUrl(options);

    return {
        imageUrl,
        lat: options.lat,
        lng: options.lng,
        zoom: options.zoom ?? 18,
        timestamp: new Date().toISOString(),
    };
}

/**
 * Get satellite image as HTMLImageElement for AI verification
 */
export async function loadSatelliteImageElement(
    options: SatelliteImageOptions
): Promise<HTMLImageElement> {
    const { imageUrl } = await fetchSatelliteImage(options);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load satellite image'));
        img.src = imageUrl;
    });
}

/**
 * Zoom level guide for satellite imagery
 * 
 * Zoom 14: ~1km view - city/region level
 * Zoom 16: ~250m view - neighborhood level
 * Zoom 18: ~50m view - building/lot level (recommended for verification)
 * Zoom 20: ~10m view - detailed structures
 * Zoom 21: ~5m view - maximum detail
 */
export const ZOOM_PRESETS = {
    REGION: 14,
    NEIGHBORHOOD: 16,
    LOT: 18,          // Default - good for tree/solar detection
    DETAILED: 20,
    MAXIMUM: 21,
} as const;

/**
 * Check if Google Maps API is configured
 */
export function isGoogleMapsConfigured(): boolean {
    return !!GOOGLE_MAPS_API_KEY;
}
