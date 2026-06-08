import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a client that will fall back gracefully if variables are placeholders or not set
export const supabase = (supabaseUrl && supabaseUrl.includes('supabase.co') && supabaseAnonKey && supabaseAnonKey !== 'your-supabase-anon-key-here')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
