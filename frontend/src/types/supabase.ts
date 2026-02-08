/**
 * TERRA AI Database Types
 * Compatible with supabase-js v2
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            Users: {
                Row: {
                    id: string;
                    wallet_address: string;
                    display_name: string | null;
                    total_tokens: number;
                    total_co2_offset: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    wallet_address: string;
                    display_name?: string | null;
                    total_tokens?: number;
                    total_co2_offset?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    wallet_address?: string;
                    display_name?: string | null;
                    total_tokens?: number;
                    total_co2_offset?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            EcoActions: {
                Row: {
                    id: string;
                    user_id: string;
                    action_type: string;
                    image_url: string;
                    location: Json | null;
                    ai_verification_score: number | null;
                    ai_detected_objects: Json | null;
                    verification_status: string;
                    blockchain_tx_hash: string | null;
                    tokens_earned: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    action_type: string;
                    image_url: string;
                    location?: Json | null;
                    ai_verification_score?: number | null;
                    ai_detected_objects?: Json | null;
                    verification_status?: string;
                    blockchain_tx_hash?: string | null;
                    tokens_earned?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    action_type?: string;
                    image_url?: string;
                    location?: Json | null;
                    ai_verification_score?: number | null;
                    ai_detected_objects?: Json | null;
                    verification_status?: string;
                    blockchain_tx_hash?: string | null;
                    tokens_earned?: number;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "EcoActions_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "Users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            TokenRewards: {
                Row: {
                    id: string;
                    user_id: string;
                    action_id: string;
                    amount: number;
                    tx_hash: string;
                    minted_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    action_id: string;
                    amount: number;
                    tx_hash: string;
                    minted_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    action_id?: string;
                    amount?: number;
                    tx_hash?: string;
                    minted_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "TokenRewards_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "Users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "TokenRewards_action_id_fkey";
                        columns: ["action_id"];
                        isOneToOne: false;
                        referencedRelation: "EcoActions";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {};
        Functions: {};
        Enums: {};
        CompositeTypes: {};
    };
};

// Convenience types
export type User = Database['public']['Tables']['Users']['Row'];
export type EcoAction = Database['public']['Tables']['EcoActions']['Row'];
export type TokenReward = Database['public']['Tables']['TokenRewards']['Row'];

export type NewUser = Database['public']['Tables']['Users']['Insert'];
export type NewEcoAction = Database['public']['Tables']['EcoActions']['Insert'];
export type NewTokenReward = Database['public']['Tables']['TokenRewards']['Insert'];

// Action type enum for frontend use
export type ActionType = 'tree' | 'solar_panel' | 'ev_charger' | 'recycling_bin' | 'bicycle' | 'reusable_bag';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

// Location type for JSONB field
export interface Location {
    lat: number;
    lng: number;
    address?: string;
}

// Detection result from AI
export interface DetectedObject {
    label: string;
    confidence: number;
}
