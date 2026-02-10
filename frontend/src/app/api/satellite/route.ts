import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy for Google Maps Static API satellite images.
 * Fetches images server-side to bypass CORS restrictions,
 * allowing the frontend to load them for both display and AI analysis.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const zoom = searchParams.get('zoom') || '18';
    const width = searchParams.get('width') || '640';
    const height = searchParams.get('height') || '640';

    if (!lat || !lng) {
        return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    const mapsUrl = new URL('https://maps.googleapis.com/maps/api/staticmap');
    mapsUrl.searchParams.set('center', `${lat},${lng}`);
    mapsUrl.searchParams.set('zoom', zoom);
    mapsUrl.searchParams.set('size', `${width}x${height}`);
    mapsUrl.searchParams.set('maptype', 'satellite');
    mapsUrl.searchParams.set('key', apiKey);

    try {
        const response = await fetch(mapsUrl.toString());

        if (!response.ok) {
            return NextResponse.json(
                { error: `Google Maps API returned ${response.status}` },
                { status: response.status }
            );
        }

        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/png';

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('[Satellite Proxy] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch satellite image' }, { status: 500 });
    }
}
