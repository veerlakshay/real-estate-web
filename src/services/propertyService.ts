import { supabase } from '@/lib/supabase';
import { Property } from '@/types/database.types';

export const propertyService = {
    // Get all properties
    async getAllProperties(): Promise<Property[]> {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Error in getAllProperties:', error);
            return [];
        }
    },

    // Create new property
    async createProperty(propertyData: Partial<Property>): Promise<Property> {
        try {
            // Validate required fields
            if (!propertyData.title || !propertyData.location || !propertyData.price) {
                throw new Error('Missing required fields');
            }

            // Insert the property into the database
            const { data, error } = await supabase
                .from('properties')
                .insert([propertyData])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            if (!data) {
                throw new Error('No data returned from insert');
            }

            return data;
        } catch (error) {
            console.error('Error in createProperty:', error);
            throw error;
        }
    },

    // Get featured properties
    async getFeaturedProperties(): Promise<Property[]> {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('featured', true)
                .limit(4);

            if (error) {
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Error in getFeaturedProperties:', error);
            return [];
        }
    },

    // Get single property
    async getPropertyById(id: string): Promise<Property | null> {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error in getPropertyById:', error);
            return null;
        }
    }
};