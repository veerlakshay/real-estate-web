import Image from 'next/image';
import Link from 'next/link';

// Define the property interface
export interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    imageUrl: string;
    purpose: 'sale' | 'rent';
}

interface PropertyCardProps {
    property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    // Format price with commas and handle both sale and rent
    const formatPrice = (price: number, purpose: 'sale' | 'rent') => {
        const formattedPrice = price.toLocaleString('en-US');
        return purpose === 'sale' ? `$${formattedPrice}` : `$${formattedPrice}/mo`;
    };

    return (
        <Link href={`/properties/${property.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Property Image */}
                <div className="relative h-48 w-full">
                    <Image
                        src={property.imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover"
                    />
                    {/* Purpose Tag (Sale/Rent) */}
                    <div className={`
                        absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold
                        ${property.purpose === 'sale' ? 'bg-blue-500' : 'bg-green-500'} 
                        text-white
                    `}>
                        {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
                    </div>
                </div>

                {/* Property Details */}
                <div className="p-4 space-y-3">
                    {/* Price */}
                    <div className="text-xl font-bold text-blue-600">
                        {formatPrice(property.price, property.purpose)}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                        {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm line-clamp-1">{property.location}</span>
                    </div>

                    {/* Property Features */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-sm">{property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="text-sm">{property.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-sm">{property.area} sqft</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;