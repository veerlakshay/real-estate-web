export interface Property {
    id: string;
    created_at: string;
    title: string;
    description: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    purpose: 'sale' | 'rent';
    property_type: 'house' | 'apartment' | 'condo' | 'villa';
    featured: boolean;
    images: string[];
    amenities: string[];
    agent_id: string;
}

export interface Agent {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    photo_url: string | null;
    bio: string;
}