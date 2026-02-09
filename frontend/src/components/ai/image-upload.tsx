"use client";

import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
    onImageLoad: (image: HTMLImageElement) => void;
    isProcessing?: boolean;
    className?: string;
}

export function ImageUpload({ onImageLoad, isProcessing, className }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            setPreview(dataUrl);

            // Create image element for AI processing
            const img = new Image();
            img.onload = () => onImageLoad(img);
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    }, [onImageLoad]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const clearImage = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className={cn("relative", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleInputChange}
                className="hidden"
            />

            {!preview ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center gap-6 p-12 rounded-none border-4 border-dashed cursor-pointer transition-all duration-300 bg-white",
                        isDragging
                            ? "border-neo-pink bg-neo-pink/10 shadow-brutal translate-x-[-2px] translate-y-[-2px]"
                            : "border-black hover:border-neo-lime hover:bg-neo-lime/5"
                    )}
                >
                    <div className="p-6 border-3 border-black bg-neo-lime shadow-brutal">
                        <Upload className="w-10 h-10 text-black" />
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-black uppercase text-black tracking-tighter">Capture Action</p>
                        <p className="text-lg font-bold text-black/60 mt-1 uppercase">Drop file or click to browse</p>
                    </div>
                    <div className="flex gap-2">
                        {['JPG', 'PNG', 'WEBP'].map(ext => (
                            <span key={ext} className="px-2 py-0.5 border-2 border-black bg-neo-yellow text-[10px] font-black">{ext}</span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative rounded-none border-4 border-black bg-white shadow-brutal overflow-hidden">
                    <img
                        ref={imageRef}
                        src={preview}
                        alt="Uploaded preview"
                        className="w-full h-auto max-h-[450px] object-contain"
                    />

                    {isProcessing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-neo-lime/80 backdrop-blur-none border-4 border-black border-inset animate-pulse">
                            <div className="flex flex-col items-center gap-4 bg-white p-6 border-4 border-black shadow-brutal">
                                <Loader2 className="w-12 h-12 text-black animate-spin" />
                                <p className="text-2xl font-black uppercase text-black tracking-tighter">AI Scanning...</p>
                            </div>
                        </div>
                    )}

                    {!isProcessing && (
                        <Button
                            onClick={clearImage}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
