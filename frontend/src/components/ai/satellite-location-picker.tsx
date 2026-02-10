"use client";

import { useState, useCallback } from "react";
import { MapPin, Search, Satellite, Loader2, AlertCircle, ArrowRight, Trees, Zap, Car, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSatelliteImageUrl, fetchBeforeAfterImages, ZOOM_PRESETS, type BeforeAfterImages } from "@/lib/satellite";
import { cn } from "@/lib/utils";

interface LocationPickerProps {
    onComparisonReady: (
        beforeAfter: BeforeAfterImages,
        activityType: string
    ) => void;
    onError?: (error: string) => void;
    isProcessing?: boolean;
}

interface GeocodingResult {
    lat: number;
    lng: number;
    address: string;
}

const ACTIVITY_TYPES = [
    { id: "reforestation", label: "Reforestation", icon: Trees, color: "bg-neo-lime" },
    { id: "solar_farm", label: "Solar Farm", icon: Zap, color: "bg-neo-yellow" },
    { id: "ev_infrastructure", label: "EV Charging", icon: Car, color: "bg-neo-purple" },
    { id: "urban_green", label: "Urban Green", icon: Recycle, color: "bg-neo-mint" },
];

export function SatelliteLocationPicker({ onComparisonReady, onError, isProcessing }: LocationPickerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<GeocodingResult | null>(null);
    const [beforeAfter, setBeforeAfter] = useState<BeforeAfterImages | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<string>("reforestation");

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

    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const geo = await geocodeAddress(searchQuery);
            setLocation(geo);
            const images = fetchBeforeAfterImages(geo.lat, geo.lng, geo.address);
            setBeforeAfter(images);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to find location";
            setError(message);
            onError?.(message);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, onError]);

    const handleUseCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            return;
        }
        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                const address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                setLocation({ lat, lng, address });
                const images = fetchBeforeAfterImages(lat, lng, address);
                setBeforeAfter(images);
                setIsLoading(false);
            },
            () => {
                setError("Failed to get location. Enable location access.");
                setIsLoading(false);
            }
        );
    }, []);

    const handleCompare = () => {
        if (beforeAfter) {
            onComparisonReady(beforeAfter, selectedActivity);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Card */}
            <Card className="w-full bg-white border-4 border-black shadow-brutal">
                <CardHeader className="bg-neo-purple border-b-4 border-black">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase text-white tracking-tighter">
                        <Satellite className="h-8 w-8 text-white" />
                        Satellite Change Detection
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    {/* Search */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter address, city, or coordinates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            disabled={isLoading || isProcessing}
                        />
                        <Button onClick={handleSearch} disabled={isLoading || isProcessing}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleUseCurrentLocation}
                        disabled={isLoading || isProcessing}
                        className="w-full border-3 border-black font-black uppercase tracking-tight shadow-[4px_4px_0_#000] hover:bg-neo-lime transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        <MapPin className="h-5 w-5 mr-2" />
                        GPS Geo-Locate
                    </Button>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm font-bold">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    {/* Location Info */}
                    {location && (
                        <div className="p-4 border-3 border-black bg-neo-yellow/20 font-bold text-black">
                            <p className="uppercase text-xs font-black text-black/40 mb-1">Target Location</p>
                            <p className="text-lg leading-tight uppercase tracking-tight">{location.address}</p>
                            <div className="mt-2 flex gap-4 text-xs font-black uppercase">
                                <span>LAT: {location.lat.toFixed(6)}</span>
                                <span>LNG: {location.lng.toFixed(6)}</span>
                            </div>
                        </div>
                    )}

                    {/* Activity Type Selector */}
                    {location && (
                        <div>
                            <p className="text-sm font-black uppercase text-black mb-3">Activity Being Verified</p>
                            <div className="grid grid-cols-2 gap-3">
                                {ACTIVITY_TYPES.map((activity) => (
                                    <button
                                        key={activity.id}
                                        onClick={() => setSelectedActivity(activity.id)}
                                        className={cn(
                                            "flex items-center gap-2 p-3 border-3 border-black font-black uppercase text-sm tracking-tight transition-all",
                                            selectedActivity === activity.id
                                                ? `${activity.color} shadow-brutal text-black`
                                                : "bg-white hover:bg-gray-50 text-black"
                                        )}
                                    >
                                        <activity.icon className="h-5 w-5" />
                                        {activity.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Before/After Preview */}
            {beforeAfter && (
                <Card className="w-full bg-white border-4 border-black shadow-brutal">
                    <CardHeader className="bg-neo-yellow border-b-4 border-black">
                        <CardTitle className="text-xl font-black uppercase text-black tracking-tighter">
                            📡 Satellite Imagery Preview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Before Image */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-700 text-white text-xs font-black uppercase px-3 py-1 border-2 border-black">
                                        Before
                                    </span>
                                    <span className="text-xs text-black/50 font-bold">Wide Area View</span>
                                </div>
                                <div className="relative border-4 border-black shadow-brutal overflow-hidden">
                                    <img
                                        src={beforeAfter.before.imageUrl}
                                        alt="Before - Wide area view"
                                        className="w-full h-auto grayscale sepia contrast-[0.9] brightness-[0.85]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-2 left-2 text-white text-xs font-black uppercase bg-black/60 px-2 py-1">
                                        Zoom {beforeAfter.before.zoom} • Area Baseline
                                    </div>
                                </div>
                            </div>

                            {/* After Image */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-neo-lime text-black text-xs font-black uppercase px-3 py-1 border-2 border-black">
                                        After
                                    </span>
                                    <span className="text-xs text-black/50 font-bold">Current Detail</span>
                                </div>
                                <div className="relative border-4 border-black shadow-brutal overflow-hidden">
                                    <img
                                        src={beforeAfter.after.imageUrl}
                                        alt="After - Current detail view"
                                        className="w-full h-auto contrast-[1.1]"
                                    />
                                    <div className="absolute top-2 right-2 bg-neo-lime border-2 border-black text-black text-xs font-black px-2 py-1 shadow-[2px_2px_0_#000]">
                                        Live 🛰️
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-white text-xs font-black uppercase bg-black/60 px-2 py-1">
                                        Zoom {beforeAfter.after.zoom} • Current State
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow between images */}
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-3 bg-neo-pink border-3 border-black px-6 py-2 shadow-brutal text-white font-black uppercase text-sm">
                                <span>Analyze Change</span>
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Compare Button */}
                        <Button
                            onClick={handleCompare}
                            disabled={isProcessing}
                            className="w-full bg-neo-lime text-black border-4 border-black shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase text-lg h-14"
                            size="lg"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    AI Analyzing Satellite Data...
                                </>
                            ) : (
                                <>
                                    <Satellite className="h-5 w-5 mr-2" />
                                    Run AI Comparison
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
