'use client';

import { useState } from 'react';
import Image from 'next/image';

// Define types for our search form
interface SearchFormData {
    propertyType: string;
    purpose: string;
    location: string;
    priceRange: string;
}

const HeroSection = () => {
    // State for search form
    const [searchData, setSearchData] = useState<SearchFormData>({
        propertyType: '',
        purpose: 'buy',
        location: '',
        priceRange: '',
    });

    // Handle form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Search data:', searchData);
    };

    return (
        <div className="relative min-h-[600px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.jpg"
                    alt="Modern home interior"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center text-white space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Find Your Dream Home
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        Discover the perfect property that matches your lifestyle and dreams
                    </p>

                    {/* Search Form */}
                    <div className="mt-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Property Type Select */}
                            <select
                                value={searchData.propertyType}
                                onChange={(e) => setSearchData({
                                    ...searchData,
                                    propertyType: e.target.value
                                })}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Property Type</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="condo">Condo</option>
                                <option value="villa">Villa</option>
                            </select>

                            {/* Purpose Toggle */}
                            <select
                                value={searchData.purpose}
                                onChange={(e) => setSearchData({
                                    ...searchData,
                                    purpose: e.target.value
                                })}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="buy">Buy</option>
                                <option value="rent">Rent</option>
                            </select>

                            {/* Location Input */}
                            <input
                                type="text"
                                placeholder="Location"
                                value={searchData.location}
                                onChange={(e) => setSearchData({
                                    ...searchData,
                                    location: e.target.value
                                })}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            {/* Price Range Select */}
                            <select
                                value={searchData.priceRange}
                                onChange={(e) => setSearchData({
                                    ...searchData,
                                    priceRange: e.target.value
                                })}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Price Range</option>
                                <option value="0-100000">Under $100,000</option>
                                <option value="100000-300000">$100,000 - $300,000</option>
                                <option value="300000-500000">$300,000 - $500,000</option>
                                <option value="500000-1000000">$500,000 - $1,000,000</option>
                                <option value="1000000+">$1,000,000+</option>
                            </select>

                            {/* Search Button - Full width on mobile */}
                            <button
                                type="submit"
                                className="md:col-span-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                            >
                                Search Properties
                            </button>
                        </form>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        {[
                            { label: 'Properties', value: '1000+' },
                            { label: 'Happy Clients', value: '500+' },
                            { label: 'Cities', value: '50+' },
                            { label: 'Agents', value: '100+' },
                        ].map((stat) => (
                            <div key={stat.label} className="space-y-2">
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;