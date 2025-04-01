'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/types/database.types';
import { propertyService } from '@/services/propertyService';

export default function AddNewProperty() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            // Create property data object with proper type checking
            const propertyData: Partial<Property> = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                location: formData.get('location') as string,
                price: parseFloat(formData.get('price') as string),
                bedrooms: parseInt(formData.get('bedrooms') as string),
                bathrooms: parseInt(formData.get('bathrooms') as string),
                area: parseFloat(formData.get('area') as string),
                purpose: formData.get('purpose') as 'sale' | 'rent',
                property_type: formData.get('property_type') as 'house' | 'apartment' | 'condo' | 'villa',
                featured: false,
                images: [],
                amenities: []
            };

            // Validate required fields
            if (!propertyData.title || !propertyData.location || !propertyData.price) {
                throw new Error('Please fill in all required fields');
            }

            // Create the property
            await propertyService.createProperty(propertyData);
            
            // Redirect to properties list
            router.push('/admin/properties');
            router.refresh(); // Refresh the page to show new data

        } catch (err) {
            console.error('Error creating property:', err);
            setError(err instanceof Error ? err.message : 'Failed to create property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                    </label>
                    <input
                        type="text"
                        name="location"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price *
                        </label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Property Type *
                        </label>
                        <select
                            name="property_type"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                            <option value="villa">Villa</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bedrooms *
                        </label>
                        <input
                            type="number"
                            name="bedrooms"
                            required
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bathrooms *
                        </label>
                        <input
                            type="number"
                            name="bathrooms"
                            required
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Area (sq ft) *
                        </label>
                        <input
                            type="number"
                            name="area"
                            required
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purpose *
                    </label>
                    <select
                        name="purpose"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Property'}
                </button>
            </form>
        </div>
    );
}