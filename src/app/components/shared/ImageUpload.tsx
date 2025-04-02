'use client';

import { useState } from 'react';
import { imageService } from '@/services/imageService';

interface ImageUploadProps {
    onImageUploaded: (imageUrl: string) => void;
    onError?: (error: string) => void;
}

export default function ImageUpload({ onImageUploaded, onError }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            onError?.('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            onError?.('Image size should be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            const imageUrl = await imageService.uploadPropertyImage(file);
            onImageUploaded(imageUrl);
        } catch (error) {
            console.error('Upload error:', error);
            onError?.('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                disabled={uploading}
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {uploading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                    <div className="text-sm text-gray-600">Uploading...</div>
                </div>
            )}
        </div>
    );
}