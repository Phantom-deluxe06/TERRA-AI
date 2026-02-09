"use client";

import { useState, useCallback } from "react";
import { MapPin, Search, Satellite, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSatelliteImageUrl, ZOOM_PRESETS } from "@/lib/satellite";

interface LocationPickerProps {
    onImageReady: (imageUrl: string, location: { lat: number; lng: number }) => void;
    onError?: (error: string) => void;
}

interface GeocodingResult {
    lat: number;
    lng: number;
    address: string;
}

export function SatelliteLocationPicker({ onImageReady, onError }: LocationPickerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [location, setLocation] = useState<GeocodingResult | null>(null);
    const [zoom, setZoom] = useState<number>(ZOOM_PRESETS.LOT);

    // Geocode address to coordinates using Google Geocoding API
    const geocodeAddress = async (address: string): Promise<GeocodingResult> => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "OK" || !data.results?.length) {
            throw new Error("Location not found. Try a more specific address.");
        }

        const result = data.results[0];
        return {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            address: result.formatted_address,
        };
    };

    // Search for location and show preview
    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const geo = await geocodeAddress(searchQuery);
            setLocation(geo);

            const imageUrl = getSatelliteImageUrl({
                lat: geo.lat,
                lng: geo.lng,
                zoom,
            });
            setPreviewUrl(imageUrl);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to find location";
            setError(message);
            onError?.(message);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, zoom, onError]);

    // Use current GPS location
    const handleUseCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                setLocation({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });

                const imageUrl = getSatelliteImageUrl({ lat, lng, zoom });
                setPreviewUrl(imageUrl);
                setIsLoading(false);
            },
            (err) => {
                setError("Failed to get your location. Please enable location access.");
                setIsLoading(false);
            }
        );
    }, [zoom]);

    // Confirm and proceed with verification
    const handleConfirm = () => {
        if (previewUrl && location) {
            onImageReady(previewUrl, { lat: location.lat, lng: location.lng });
        }
    };

    // Update preview when zoom changes
    const handleZoomChange = (newZoom: number) => {
        setZoom(newZoom);
        if (location) {
            const imageUrl = getSatelliteImageUrl({
                lat: location.lat,
                lng: location.lng,
                zoom: newZoom,
            });
            setPreviewUrl(imageUrl);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto bg-white border-4 border-black shadow-brutal">
            <CardHeader className="bg-neo-purple border-b-4 border-black">
                <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase text-white tracking-tighter">
                    <Satellite className="h-8 w-8 text-white" />
                    Satellite AI Scan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Search Input */}
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter address or place name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Current Location Button */}
                <Button
                    variant="outline"
                    onClick={handleUseCurrentLocation}
                    disabled={isLoading}
                    className="w-full border-3 border-black font-black uppercase tracking-tight shadow-[4px_4px_0_#000] hover:bg-neo-lime transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                    <MapPin className="h-5 w-5 mr-2" />
                    GPS Geo-Locate
                </Button>

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {/* Location Info */}
                {location && (
                    <div className="p-4 border-3 border-black bg-neo-yellow/20 font-bold text-black">
                        <p className="uppercase text-xs font-black text-black/40 mb-1">Target Address</p>
                        <p className="text-lg leading-tight uppercase tracking-tight">{location.address}</p>
                        <div className="mt-2 flex gap-4 text-xs font-black uppercase">
                            <span>LAT: {location.lat.toFixed(6)}</span>
                            <span>LNG: {location.lng.toFixed(6)}</span>
                        </div>
                    </div>
                )}

                {/* Zoom Control */}
                {previewUrl && (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Zoom Level:</span>
                        <div className="flex gap-2">
                            {[
                                { label: "Wide", value: ZOOM_PRESETS.NEIGHBORHOOD },
                                { label: "Normal", value: ZOOM_PRESETS.LOT },
                                { label: "Close", value: ZOOM_PRESETS.DETAILED },
                            ].map((option) => (
                                <Button
                                    key={option.value}
                                    size="sm"
                                    variant={zoom === option.value ? 'primary' : 'outline'}
                                    onClick={() => handleZoomChange(option.value)}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Satellite Image Preview */}
                {previewUrl && (
                    <div className="relative rounded-none overflow-hidden border-4 border-black shadow-brutal">
                        <img
                            src={previewUrl}
                            alt="Satellite view"
                            className="w-full h-auto grayscale-[0.2] contrast-[1.2]"
                        />
                        <div className="absolute top-4 right-4 bg-neo-lime border-3 border-black text-black text-xs font-black px-3 py-1 uppercase shadow-[4px_4px_0_#000]">
                            Live Feed 🛰️
                        </div>
                    </div>
                )}

                {/* Confirm Button */}
                {previewUrl && location && (
                    <Button onClick={handleConfirm} className="w-full" size="lg">
                        <Satellite className="h-4 w-4 mr-2" />
                        Verify This Location with AI
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
