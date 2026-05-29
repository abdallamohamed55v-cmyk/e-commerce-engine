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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      course_translations: {
        Row: {
          course_id: string
          created_at: string
          description: string
          id: string
          lang_code: string
          learning_outcomes: Json
          prerequisites: Json
          seo_description: string | null
          seo_title: string | null
          tagline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description: string
          id?: string
          lang_code: string
          learning_outcomes?: Json
          prerequisites?: Json
          seo_description?: string | null
          seo_title?: string | null
          tagline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string
          id?: string
          lang_code?: string
          learning_outcomes?: Json
          prerequisites?: Json
          seo_description?: string | null
          seo_title?: string | null
          tagline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_translations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      courses: {
        Row: {
          accent_color: string | null
          cover_image_url: string | null
          created_at: string
          duration_minutes: number
          id: string
          is_published: boolean
          level: string
          slug: string
          sort_order: number
          topic_key: string
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          cover_image_url?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          is_published?: boolean
          level?: string
          slug: string
          sort_order?: number
          topic_key: string
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          cover_image_url?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          is_published?: boolean
          level?: string
          slug?: string
          sort_order?: number
          topic_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          code: string
          created_at: string
          direction: string
          is_active: boolean
          name: string
          native_name: string
          sort_order: number
        }
        Insert: {
          code: string
          created_at?: string
          direction?: string
          is_active?: boolean
          name: string
          native_name: string
          sort_order?: number
        }
        Update: {
          code?: string
          created_at?: string
          direction?: string
          is_active?: boolean
          name?: string
          native_name?: string
          sort_order?: number
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string
          course_slug: string
          id: string
          lesson_slug: string
          quiz_score: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          course_slug: string
          id?: string
          lesson_slug: string
          quiz_score?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string
          course_slug?: string
          id?: string
          lesson_slug?: string
          quiz_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      lesson_translations: {
        Row: {
          content_markdown: string
          created_at: string
          id: string
          lang_code: string
          lesson_id: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content_markdown: string
          created_at?: string
          id?: string
          lang_code: string
          lesson_id: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content_markdown?: string
          created_at?: string
          id?: string
          lang_code?: string
          lesson_id?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "lesson_translations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          course_id: string
          created_at: string
          duration_minutes: number
          id: string
          slug: string
          sort_order: number
          thumbnail_url: string | null
          video_id: string | null
          video_provider: string | null
          video_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          duration_minutes?: number
          id?: string
          slug: string
          sort_order?: number
          thumbnail_url?: string | null
          video_id?: string | null
          video_provider?: string | null
          video_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          slug?: string
          sort_order?: number
          thumbnail_url?: string | null
          video_id?: string | null
          video_provider?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          platform_fee: number
          price: number
          product_id: string
          seller_earnings: number
          seller_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          platform_fee?: number
          price: number
          product_id: string
          seller_earnings?: number
          seller_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          platform_fee?: number
          price?: number
          product_id?: string
          seller_earnings?: number
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string
          currency: string
          dodo_payment_id: string | null
          id: string
          referral_code: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          currency?: string
          dodo_payment_id?: string | null
          id?: string
          referral_code?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          currency?: string
          dodo_payment_id?: string | null
          id?: string
          referral_code?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_files: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          product_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          product_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_files_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          product_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          product_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_official: boolean
          price: number
          published_at: string | null
          rejection_reason: string | null
          seller_id: string
          short_description: string | null
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_official?: boolean
          price?: number
          published_at?: string | null
          rejection_reason?: string | null
          seller_id: string
          short_description?: string | null
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_official?: boolean
          price?: number
          published_at?: string | null
          rejection_reason?: string | null
          seller_id?: string
          short_description?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          referral_code: string | null
          referred_by: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          referral_code?: string | null
          referred_by?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          referral_code?: string | null
          referred_by?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_translations: {
        Row: {
          brief: string
          created_at: string
          deliverables: Json
          id: string
          lang_code: string
          project_id: string
          requirements: Json
          title: string
        }
        Insert: {
          brief: string
          created_at?: string
          deliverables?: Json
          id?: string
          lang_code: string
          project_id: string
          requirements?: Json
          title: string
        }
        Update: {
          brief?: string
          created_at?: string
          deliverables?: Json
          id?: string
          lang_code?: string
          project_id?: string
          requirements?: Json
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "project_translations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          course_id: string
          created_at: string
          difficulty: string
          estimated_hours: number
          id: string
          slug: string
          sort_order: number
        }
        Insert: {
          course_id: string
          created_at?: string
          difficulty?: string
          estimated_hours?: number
          id?: string
          slug: string
          sort_order?: number
        }
        Update: {
          course_id?: string
          created_at?: string
          difficulty?: string
          estimated_hours?: number
          id?: string
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "projects_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_translations: {
        Row: {
          created_at: string
          explanation: string | null
          id: string
          lang_code: string
          options: Json
          question: string
          quiz_id: string
        }
        Insert: {
          created_at?: string
          explanation?: string | null
          id?: string
          lang_code: string
          options: Json
          question: string
          quiz_id: string
        }
        Update: {
          created_at?: string
          explanation?: string | null
          id?: string
          lang_code?: string
          options?: Json
          question?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "quiz_translations_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          correct_option_index: number
          created_at: string
          id: string
          lesson_id: string
          sort_order: number
        }
        Insert: {
          correct_option_index: number
          created_at?: string
          id?: string
          lesson_id: string
          sort_order?: number
        }
        Update: {
          correct_option_index?: number
          created_at?: string
          id?: string
          lesson_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_earnings: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          referrer_id: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          order_id: string
          referrer_id: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          referrer_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_earnings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_profiles: {
        Row: {
          created_at: string
          id: string
          kyc_session_id: string | null
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          kyc_verified_at: string | null
          payout_email: string | null
          store_description: string | null
          store_logo_url: string | null
          store_name: string
          store_slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kyc_session_id?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          kyc_verified_at?: string | null
          payout_email?: string | null
          store_description?: string | null
          store_logo_url?: string | null
          store_name: string
          store_slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kyc_session_id?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          kyc_verified_at?: string | null
          payout_email?: string | null
          store_description?: string | null
          store_logo_url?: string | null
          store_name?: string
          store_slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          description_ar: string | null
          dodo_product_id: string | null
          features: Json
          features_ar: Json
          id: string
          interval: string
          is_active: boolean
          is_popular: boolean
          name: string
          name_ar: string
          price_usd: number
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          dodo_product_id?: string | null
          features?: Json
          features_ar?: Json
          id?: string
          interval: string
          is_active?: boolean
          is_popular?: boolean
          name: string
          name_ar: string
          price_usd: number
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          dodo_product_id?: string | null
          features?: Json
          features_ar?: Json
          id?: string
          interval?: string
          is_active?: boolean
          is_popular?: boolean
          name?: string
          name_ar?: string
          price_usd?: number
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string
          current_period_start: string
          dodo_customer_id: string | null
          dodo_subscription_id: string | null
          id: string
          plan_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end: string
          current_period_start?: string
          dodo_customer_id?: string | null
          dodo_subscription_id?: string | null
          id?: string
          plan_id: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          dodo_customer_id?: string | null
          dodo_subscription_id?: string | null
          id?: string
          plan_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      public_sellers: {
        Row: {
          created_at: string | null
          id: string | null
          store_description: string | null
          store_logo_url: string | null
          store_name: string | null
          store_slug: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          store_description?: string | null
          store_logo_url?: string | null
          store_name?: string | null
          store_slug?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          store_description?: string | null
          store_logo_url?: string | null
          store_name?: string | null
          store_slug?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_my_profile: {
        Args: never
        Returns: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          referral_code: string | null
          referred_by: string | null
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_my_seller_profile: {
        Args: never
        Returns: {
          created_at: string
          id: string
          kyc_session_id: string | null
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          kyc_verified_at: string | null
          payout_email: string | null
          store_description: string | null
          store_logo_url: string | null
          store_name: string
          store_slug: string
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "seller_profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_active_subscription: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "seller" | "buyer"
      kyc_status: "not_started" | "pending" | "approved" | "rejected"
      order_status: "pending" | "paid" | "failed" | "refunded"
      product_status: "draft" | "pending" | "approved" | "rejected"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "expired"
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
      app_role: ["admin", "seller", "buyer"],
      kyc_status: ["not_started", "pending", "approved", "rejected"],
      order_status: ["pending", "paid", "failed", "refunded"],
      product_status: ["draft", "pending", "approved", "rejected"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "expired",
      ],
    },
  },
} as const
