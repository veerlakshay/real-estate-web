'use client';

import { useState } from 'react';
import { Property } from '@/types/database.types';
import ImageUpload from './ImageUpload';
import { propertyService } from '@/services/propertyService';

interface PropertyFormProps {
    onSubmit: (property: Partial<Property>) => Promise<void>;
    initialData?: Partial<Property>;
}

const PropertyForm = ({ onSubmit, initialData = {} }: PropertyFormProps) => {
    const [formData, setFormData] = useState<Partial<Property>>({
        title: '',
        description: '',
        location: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        purpose: 'sale',
        property_type: 'house',
        featured: false,
        images: [],
        amenities: [],
        ...initialData
    });

    const [images, setImages] = useState<string[]>(initialData.images || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleImageUploaded = (imageUrl: string) => {
        setImages(prev => [...prev, imageUrl]);
        setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), imageUrl]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSubmit({ ...formData, images });
        } catch (error) {
            setError('Failed to save property');
            console.error('Submit error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                {/* Add more form fields for other property attributes */}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Images
                    </label>
                    <div className="mt-1 space-y-2">
                        <ImageUpload onImageUploaded={handleImageUploaded} />
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {images.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
                                        alt={`Property image ${index + 1}`}
                                        className="w-full h-24 object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-600 text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save Property'}
            </button>
        </form>
    );
};

export default PropertyForm;