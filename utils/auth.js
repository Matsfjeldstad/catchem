// eslint-disable-next-line import/no-unresolved, import/extensions
import { supabase } from '@/lib/supabaseClient';

// eslint-disable-next-line import/prefer-default-export
export async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data.session && !error) {
    return true;
  }
  return false;
}
