import { supabase } from '@/lib/supabase';
import type { User, EcoAction, NewEcoAction, Database } from '@/types/supabase';

/**
 * User API helpers
 */
export async function getUserByWallet(walletAddress: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data;
}

export async function createUser(walletAddress: string, displayName?: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('Users')
        .insert({ wallet_address: walletAddress, display_name: displayName })
        .select()
        .single();

    if (error) {
        console.error('Error creating user:', error);
        return null;
    }
    return data;
}

export async function updateUserProfile(
    userId: string,
    updates: { display_name?: string }
): Promise<User | null> {
    const { data, error } = await supabase
        .from('Users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('Error updating user:', error);
        return null;
    }
    return data;
}

/**
 * EcoAction API helpers
 */
export async function getUserActions(userId: string): Promise<EcoAction[]> {
    const { data, error } = await supabase
        .from('EcoActions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching actions:', error);
        return [];
    }
    return data ?? [];
}

export async function createEcoAction(action: NewEcoAction): Promise<EcoAction | null> {
    const { data, error } = await supabase
        .from('EcoActions')
        .insert(action)
        .select()
        .single();

    if (error) {
        console.error('Error creating action:', error);
        return null;
    }
    return data;
}

export async function updateActionVerification(
    actionId: string,
    verificationData: {
        ai_verification_score: number;
        ai_detected_objects: { label: string; confidence: number }[];
        verification_status: 'verified' | 'rejected';
        tokens_earned: number;
    }
): Promise<EcoAction | null> {
    const { data, error } = await supabase
        .from('EcoActions')
        .update(verificationData)
        .eq('id', actionId)
        .select()
        .single();

    if (error) {
        console.error('Error updating action verification:', error);
        return null;
    }
    return data;
}

export async function updateActionBlockchainTx(
    actionId: string,
    txHash: string
): Promise<EcoAction | null> {
    const { data, error } = await supabase
        .from('EcoActions')
        .update({ blockchain_tx_hash: txHash })
        .eq('id', actionId)
        .select()
        .single();

    if (error) {
        console.error('Error updating tx hash:', error);
        return null;
    }
    return data;
}

/**
 * Storage helpers
 */
export async function uploadEcoActionImage(
    userId: string,
    file: File
): Promise<string | null> {
    const fileName = `${userId}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
        .from('eco-actions')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }

    const { data: urlData } = supabase.storage
        .from('eco-actions')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

export async function uploadProfileAvatar(
    userId: string,
    file: File
): Promise<string | null> {
    const fileName = `${userId}/avatar-${Date.now()}`;

    const { data, error } = await supabase.storage
        .from('profiles')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true, // Allow overwriting avatar
        });

    if (error) {
        console.error('Error uploading avatar:', error);
        return null;
    }

    const { data: urlData } = supabase.storage
        .from('profiles')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}
