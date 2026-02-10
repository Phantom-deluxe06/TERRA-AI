"use client";

export interface SensorData {
    deviceId: string;
    serialNumber: string;
    gps: { lat: number; lng: number };
    co2: number;
    timestamp: number;
    status: 'online' | 'offline' | 'tampered' | 'conflict';
    health: number;
    lastCalibrated: string;
}

export const MOCK_SENSORS: SensorData[] = [
    {
        deviceId: "CC-AMAZON-01",
        serialNumber: "SN-9982-X2",
        gps: { lat: -3.4653, lng: -62.2159 },
        co2: 415.2,
        timestamp: Date.now(),
        status: 'online',
        health: 98,
        lastCalibrated: "2026-01-15"
    },
    {
        deviceId: "CC-AMAZON-02",
        serialNumber: "SN-9982-X5",
        gps: { lat: -3.4660, lng: -62.2170 },
        co2: 418.5,
        timestamp: Date.now(),
        status: 'online',
        health: 95,
        lastCalibrated: "2026-01-20"
    }
];

export function detectTampering(data: SensorData[]): { type: string; message: string } | null {
    // 1. Flatline Detection (Static CO2 over time - simplified for mock)
    // In a real app, we'd check history. Here we simulate a "drift" or "flatline"
    const sensor = data[0];
    if (sensor.co2 < 300) {
        return { type: 'tamper', message: 'CRITICAL: Suspiciously low CO2 detected (Possible sensor masking)' };
    }

    // 2. Redundancy Check
    if (data.length >= 2) {
        const diff = Math.abs(data[0].co2 - data[1].co2);
        if (diff > 50) {
            return { type: 'conflict', message: 'DATA CONFLICT: Nearby sensors show divergent readings' };
        }
    }

    return null;
}

export function getMockStream(callback: (data: SensorData[]) => void) {
    let currentData = [...MOCK_SENSORS];

    const interval = setInterval(() => {
        currentData = currentData.map(s => ({
            ...s,
            co2: s.co2 + (Math.random() - 0.5) * 2, // Slight random fluctuation
            timestamp: Date.now()
        }));
        callback(currentData);
    }, 3000);

    return () => clearInterval(interval);
}
