import { supabase } from '@/lib/supabase';
import { Property } from '@/types/database.types';

export const propertyService = {
    // Get featured properties
    async getFeaturedProperties(): Promise<Property[]> {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('featured', true)
                .limit(4);

            if (error) {
                console.error('Error fetching featured properties:', error);
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Error in getFeaturedProperties:', error);
            return [];
        }
    },

    // Get single property by ID
    async getPropertyById(id: string): Promise<Property | null> {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching property:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error in getPropertyById:', error);
            return null;
        }
    }
};