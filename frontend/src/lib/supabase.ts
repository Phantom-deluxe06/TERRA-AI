import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper for server-side usage (requires SERVICE_ROLE_KEY in .env)
export const createServerClient = () => {
    if (typeof window !== 'undefined') {
        throw new Error('Server client cannot be used in the browser');
    }

    return createClient(
        supabaseUrl,
        process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
    );
};
