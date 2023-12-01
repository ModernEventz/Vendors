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
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          comments: string | null
          created_at: string | null
          rating: number
          review_id: number
          reviewer_name: string | null
          updated_at: string | null
          venue_id: number | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          rating: number
          review_id?: number
          reviewer_name?: string | null
          updated_at?: string | null
          venue_id?: number | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          rating?: number
          review_id?: number
          reviewer_name?: string | null
          updated_at?: string | null
          venue_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "wedding_venues"
            referencedColumns: ["venue_id"]
          }
        ]
      }
      vendors: {
        Row: {
          created_at: string | null
          images: string[]
          location: string
          price: number
          reviews: Json | null
          updated_at: string | null
          venue_id: number
          venue_name: string
        }
        Insert: {
          created_at?: string | null
          images: string[]
          location: string
          price: number
          reviews?: Json | null
          updated_at?: string | null
          venue_id?: number
          venue_name: string
        }
        Update: {
          created_at?: string | null
          images?: string[]
          location?: string
          price?: number
          reviews?: Json | null
          updated_at?: string | null
          venue_id?: number
          venue_name?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
