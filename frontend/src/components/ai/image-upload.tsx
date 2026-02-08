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
                        "flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200",
                        isDragging
                            ? "border-earth-green bg-earth-green/10"
                            : "border-slate-gray/30 hover:border-earth-green/50 hover:bg-white/5"
                    )}
                >
                    <div className="p-4 rounded-full bg-earth-green/10">
                        <Upload className="w-8 h-8 text-earth-green" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-medium">Drop your image here</p>
                        <p className="text-sm text-slate-gray mt-1">or click to browse</p>
                    </div>
                    <p className="text-xs text-slate-gray/70">
                        Supports: JPEG, PNG, WebP (max 10MB)
                    </p>
                </div>
            ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <img
                        ref={imageRef}
                        src={preview}
                        alt="Uploaded preview"
                        className="w-full h-auto max-h-[400px] object-contain bg-black/50"
                    />

                    {isProcessing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-10 h-10 text-earth-green animate-spin" />
                                <p className="text-white font-medium">Analyzing image...</p>
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
