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
      bookings: {
        Row: {
          date: string | null
          email: string | null
          id: number
          message: string | null
          name: string | null
          num_guests: string | null
          phone_number: string | null
          price: number | null
          time: string | null
          vendor_id: number | null
        }
        Insert: {
          date?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          num_guests?: string | null
          phone_number?: string | null
          price?: number | null
          time?: string | null
          vendor_id?: number | null
        }
        Update: {
          date?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          num_guests?: string | null
          phone_number?: string | null
          price?: number | null
          time?: string | null
          vendor_id?: number | null
        }
        Relationships: []
      }
      budget: {
        Row: {
          budget_id: string
          cost: number
          created_at: string | null
          item: string
          profile_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          budget_id?: string
          cost: number
          created_at?: string | null
          item: string
          profile_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          budget_id?: string
          cost?: number
          created_at?: string | null
          item?: string
          profile_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      checklist: {
        Row: {
          category: string | null
          checklist_id: string
          created_at: string | null
          date: string | null
          profile_id: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          checklist_id?: string
          created_at?: string | null
          date?: string | null
          profile_id: string
          status: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          checklist_id?: string
          created_at?: string | null
          date?: string | null
          profile_id?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          location: string | null
          mobile_number: number | null
          profile_id: string
          username: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          location?: string | null
          mobile_number?: number | null
          profile_id: string
          username?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          location?: string | null
          mobile_number?: number | null
          profile_id?: string
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          avatar: string | null
          comments: string | null
          created_at: string | null
          rating: number
          review_count: number | null
          review_id: number
          reviewer_name: string | null
          updated_at: string | null
          vendor_id: number | null
        }
        Insert: {
          avatar?: string | null
          comments?: string | null
          created_at?: string | null
          rating: number
          review_count?: number | null
          review_id?: number
          reviewer_name?: string | null
          updated_at?: string | null
          vendor_id?: number | null
        }
        Update: {
          avatar?: string | null
          comments?: string | null
          created_at?: string | null
          rating?: number
          review_count?: number | null
          review_id?: number
          reviewer_name?: string | null
          updated_at?: string | null
          vendor_id?: number | null
        }
        Relationships: []
      }
      vendor_images: {
        Row: {
          image_id: number
          image_path: string
          title: string
          url: string
          vendor_id: number | null
        }
        Insert: {
          image_id?: number
          image_path: string
          title: string
          url: string
          vendor_id?: number | null
        }
        Update: {
          image_id?: number
          image_path?: string
          title?: string
          url?: string
          vendor_id?: number | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          avatar: string | null
          category: string | null
          created_at: string | null
          description: string | null
          location: string
          price: number
          profile_id: string | null
          rating: number | null
          rating_count: number | null
          updated_at: string | null
          vendor_id: number
          vendor_name: string
        }
        Insert: {
          avatar?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          location: string
          price: number
          profile_id?: string | null
          rating?: number | null
          rating_count?: number | null
          updated_at?: string | null
          vendor_id?: number
          vendor_name: string
        }
        Update: {
          avatar?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          location?: string
          price?: number
          profile_id?: string | null
          rating?: number | null
          rating_count?: number | null
          updated_at?: string | null
          vendor_id?: number
          vendor_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_total_review_count_by_vendor: {
        Args: Record<PropertyKey, never>
        Returns: {
          vendor_id: number
          total_review_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
