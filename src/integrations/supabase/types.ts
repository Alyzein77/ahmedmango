export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      latest_content: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"]
          engagements: number | null
          id: string
          link_url: string
          platform: Database["public"]["Enums"]["video_platform"]
          posted_at: string
          preview_url: string
          ranking: number | null
          short_note: string | null
          title: string
          views: number | null
        }
        Insert: {
          content_type: Database["public"]["Enums"]["content_type"]
          engagements?: number | null
          id?: string
          link_url: string
          platform: Database["public"]["Enums"]["video_platform"]
          posted_at?: string
          preview_url: string
          ranking?: number | null
          short_note?: string | null
          title: string
          views?: number | null
        }
        Update: {
          content_type?: Database["public"]["Enums"]["content_type"]
          engagements?: number | null
          id?: string
          link_url?: string
          platform?: Database["public"]["Enums"]["video_platform"]
          posted_at?: string
          preview_url?: string
          ranking?: number | null
          short_note?: string | null
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string | null
          category: Database["public"]["Enums"]["product_category"]
          created_at: string
          id: string
          is_featured: boolean | null
          name: string
          platforms: string[] | null
          ranking: number
          rating: number
          review_url: string | null
          short_note: string | null
          thumbnail_url: string | null
          updated_at: string
          verdict: Database["public"]["Enums"]["product_verdict"]
        }
        Insert: {
          brand?: string | null
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string
          id?: string
          is_featured?: boolean | null
          name: string
          platforms?: string[] | null
          ranking?: number
          rating: number
          review_url?: string | null
          short_note?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          verdict: Database["public"]["Enums"]["product_verdict"]
        }
        Update: {
          brand?: string | null
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string
          id?: string
          is_featured?: boolean | null
          name?: string
          platforms?: string[] | null
          ranking?: number
          rating?: number
          review_url?: string | null
          short_note?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          verdict?: Database["public"]["Enums"]["product_verdict"]
        }
        Relationships: []
      }
      site_stats: {
        Row: {
          color: string
          created_at: string
          display_order: number | null
          icon: string
          id: string
          is_active: boolean | null
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          color?: string
          created_at?: string
          display_order?: number | null
          icon: string
          id?: string
          is_active?: boolean | null
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          color?: string
          created_at?: string
          display_order?: number | null
          icon?: string
          id?: string
          is_active?: boolean | null
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          tier: string
          updated_at: string | null
          website: string
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          tier: string
          updated_at?: string | null
          website: string
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          tier?: string
          updated_at?: string | null
          website?: string
        }
        Relationships: []
      }
      tiktok_tagged_videos: {
        Row: {
          author_name: string | null
          author_username: string | null
          caption: string | null
          created_at: string
          hashtags: string[] | null
          id: string
          posted_at: string
          thumbnail_url: string | null
          tiktok_id: string
          updated_at: string
          video_url: string
        }
        Insert: {
          author_name?: string | null
          author_username?: string | null
          caption?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          posted_at: string
          thumbnail_url?: string | null
          tiktok_id: string
          updated_at?: string
          video_url: string
        }
        Update: {
          author_name?: string | null
          author_username?: string | null
          caption?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          posted_at?: string
          thumbnail_url?: string | null
          tiktok_id?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          category: Database["public"]["Enums"]["video_category"]
          created_at: string
          description: string | null
          duration: string | null
          id: string
          is_featured: boolean | null
          platform: Database["public"]["Enums"]["video_platform"]
          thumbnail_url: string
          title: string
          video_url: string
        }
        Insert: {
          category: Database["public"]["Enums"]["video_category"]
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          platform: Database["public"]["Enums"]["video_platform"]
          thumbnail_url: string
          title: string
          video_url: string
        }
        Update: {
          category?: Database["public"]["Enums"]["video_category"]
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          platform?: Database["public"]["Enums"]["video_platform"]
          thumbnail_url?: string
          title?: string
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      content_type: "Video" | "Post" | "Story" | "Reel" | "TikTok"
      product_category:
        | "Chips"
        | "Chocolate"
        | "Drinks"
        | "Noodles"
        | "Biscuits"
        | "Other"
      product_verdict: "2استكا" | "فاستكا"
      video_category: "Review" | "Challenge" | "Announcement" | "Collaboration"
      video_platform: "YouTube" | "TikTok" | "Instagram" | "Facebook"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      content_type: ["Video", "Post", "Story", "Reel", "TikTok"],
      product_category: [
        "Chips",
        "Chocolate",
        "Drinks",
        "Noodles",
        "Biscuits",
        "Other",
      ],
      product_verdict: ["2استكا", "فاستكا"],
      video_category: ["Review", "Challenge", "Announcement", "Collaboration"],
      video_platform: ["YouTube", "TikTok", "Instagram", "Facebook"],
    },
  },
} as const
