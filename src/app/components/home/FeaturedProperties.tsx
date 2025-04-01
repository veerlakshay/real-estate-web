import PropertyCard, { Property } from '../shared/PropertyCard';

// Mock data for featured properties
const featuredProperties: Property[] = [
    {
        id: '1',
        title: 'Modern Luxury Villa',
        location: 'Beverly Hills, CA',
        price: 2500000,
        bedrooms: 5,
        bathrooms: 4,
        area: 4200,
        imageUrl: '/properties/property1.jpg',
        purpose: 'sale'
    },
    {
        id: '2',
        title: 'Downtown Apartment',
        location: 'Manhattan, NY',
        price: 4500,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        imageUrl: '/properties/property2.jpg',
        purpose: 'rent'
    },
    {
        id: '3',
        title: 'Seaside Condo',
        location: 'Miami Beach, FL',
        price: 850000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        imageUrl: '/properties/property3.jpg',
        purpose: 'sale'
    },
    {
        id: '4',
        title: 'Mountain View House',
        location: 'Denver, CO',
        price: 1200000,
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        imageUrl: '/properties/property4.jpg',
        purpose: 'sale'
    }
];

const FeaturedProperties = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our hand-picked selection of premium properties. 
                        Each one chosen for its unique character and exceptional value.
                    </p>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <a
                        href="/properties"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                        View All Properties
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;