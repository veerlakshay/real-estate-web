export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          location: string
          price: number
          bedrooms: number
          bathrooms: number
          area: number
          purpose: 'sale' | 'rent'
          property_type: 'house' | 'apartment' | 'condo' | 'villa'
          featured: boolean
          images: string[]
          amenities: string[]
          agent_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          location: string
          price: number
          bedrooms: number
          bathrooms: number
          area: number
          purpose: 'sale' | 'rent'
          property_type: 'house' | 'apartment' | 'condo' | 'villa'
          featured?: boolean
          images?: string[]
          amenities?: string[]
          agent_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          location?: string
          price?: number
          bedrooms?: number
          bathrooms?: number
          area?: number
          purpose?: 'sale' | 'rent'
          property_type?: 'house' | 'apartment' | 'condo' | 'villa'
          featured?: boolean
          images?: string[]
          amenities?: string[]
          agent_id?: string | null
        }
      }
      agents: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          photo_url: string | null
          bio: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          photo_url?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          photo_url?: string | null
          bio?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 