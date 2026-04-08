// ===========================================================================
// Supabase Database type definitions
// Auto-generate with `supabase gen types typescript` for production use.
// This hand-written version keeps the project running before codegen is set up.
// ===========================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          x_id: string;
          username: string;
          email: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          x_id: string;
          username: string;
          email?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          x_id?: string;
          username?: string;
          email?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      posts_generated: {
        Row: {
          id: string;
          user_id: string;
          input_theme: string;
          input_tone: string;
          output_texts: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          input_theme: string;
          input_tone: string;
          output_texts?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          input_theme?: string;
          input_tone?: string;
          output_texts?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_generated_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_settings: {
        Row: {
          user_id: string;
          tone_preference: string;
          api_key_encrypted: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          tone_preference?: string;
          api_key_encrypted?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          tone_preference?: string;
          api_key_encrypted?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// ===========================================================================
// Convenience type aliases
// ===========================================================================
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type PostGenerated =
  Database["public"]["Tables"]["posts_generated"]["Row"];
export type PostGeneratedInsert =
  Database["public"]["Tables"]["posts_generated"]["Insert"];
export type PostGeneratedUpdate =
  Database["public"]["Tables"]["posts_generated"]["Update"];

export type UserSettings =
  Database["public"]["Tables"]["user_settings"]["Row"];
export type UserSettingsInsert =
  Database["public"]["Tables"]["user_settings"]["Insert"];
export type UserSettingsUpdate =
  Database["public"]["Tables"]["user_settings"]["Update"];
