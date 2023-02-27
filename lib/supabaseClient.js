// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from '@supabase/supabase-js';

// eslint-disable-next-line import/prefer-default-export
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
