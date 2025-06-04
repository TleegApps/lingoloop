import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export const initSupabase = async (): Promise<void> => {
  if (supabase) return;

  const url = process.env.SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  if (!url || !serviceKey) {
    throw new Error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in environment variables');
  }

  supabase = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log('✅ Supabase initialized');
};

export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase has not been initialized');
  }
  return supabase;
};
