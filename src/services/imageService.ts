import { supabase } from '@/lib/supabase';

export const imageService = {
    async uploadPropertyImage(file: File): Promise<string> {
        try {
            // Create a unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload the file to Supabase storage
            const { error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading file:', uploadError);
                throw uploadError;
            }

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('property-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error in uploadPropertyImage:', error);
            throw error;
        }
    }
};