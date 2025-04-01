'use client';

import { useState } from 'react';
import { imageService } from '@/services/imageService';

interface ImageUploadProps {
    onImageUploaded: (imageUrl: string) => void;
    className?: string;
}

const ImageUpload = ({ onImageUploaded, className = '' }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            setError(null);
            const imageUrl = await imageService.uploadPropertyImage(file);
            onImageUploaded(imageUrl);
        } catch (error) {
            setError('Failed to upload image');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={className}>
            <label className="block">
                <span className="sr-only">Choose photo</span>
                <input
                    type="file"
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </label>
            
            {uploading && (
                <div className="mt-2 text-sm text-gray-600">
                    Uploading...
                </div>
            )}
            
            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;