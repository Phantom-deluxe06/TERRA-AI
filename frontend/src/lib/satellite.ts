/**
 * TERRA AI - Satellite Image Service
 * Fetches satellite imagery via local API proxy (bypasses CORS)
 */

export interface SatelliteImageOptions {
    lat: number;
    lng: number;
    zoom?: number;
    width?: number;
    height?: number;
}

export interface SatelliteImageResult {
    imageUrl: string;
    lat: number;
    lng: number;
    zoom: number;
    timestamp: string;
}

export interface BeforeAfterImages {
    before: SatelliteImageResult;
    after: SatelliteImageResult;
    location: { lat: number; lng: number; address?: string };
}

/**
 * Generate a satellite image URL via the local proxy (CORS-safe)
 */
export function getSatelliteImageUrl(options: SatelliteImageOptions): string {
    const {
        lat,
        lng,
        zoom = 18,
        width = 640,
        height = 640,
    } = options;

    // Use local proxy to avoid CORS issues with Google Maps
    const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        zoom: zoom.toString(),
        width: width.toString(),
        height: height.toString(),
    });

    return `/api/satellite?${params.toString()}`;
}

/**
 * Fetch before/after satellite images for comparison
 * "Before" = wider zoom (area context), "After" = detailed zoom (current state)
 */
export function fetchBeforeAfterImages(
    lat: number,
    lng: number,
    address?: string
): BeforeAfterImages {
    const beforeUrl = getSatelliteImageUrl({
        lat,
        lng,
        zoom: ZOOM_PRESETS.BEFORE,
        width: 640,
        height: 640,
    });

    const afterUrl = getSatelliteImageUrl({
        lat,
        lng,
        zoom: ZOOM_PRESETS.AFTER,
        width: 640,
        height: 640,
    });

    const now = new Date().toISOString();

    return {
        before: {
            imageUrl: beforeUrl,
            lat,
            lng,
            zoom: ZOOM_PRESETS.BEFORE,
            timestamp: now,
        },
        after: {
            imageUrl: afterUrl,
            lat,
            lng,
            zoom: ZOOM_PRESETS.AFTER,
            timestamp: now,
        },
        location: { lat, lng, address },
    };
}

/**
 * Load a satellite image as HTMLImageElement for AI processing
 */
export async function loadSatelliteImageElement(
    options: SatelliteImageOptions
): Promise<HTMLImageElement> {
    const imageUrl = getSatelliteImageUrl(options);
    return loadImageFromUrl(imageUrl);
}

/**
 * Load an image from URL as HTMLImageElement (CORS-safe via proxy)
 */
export async function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
    });
}

/**
 * Zoom level presets
 */
export const ZOOM_PRESETS = {
    BEFORE: 15,
    NEIGHBORHOOD: 16,
    LOT: 18,
    AFTER: 18,
    DETAILED: 20,
    MAXIMUM: 21,
} as const;

/**
 * Check if Google Maps API is configured
 */
export function isGoogleMapsConfigured(): boolean {
    return !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
}
