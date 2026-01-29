import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// AI换装服务
export async function virtualTryOn(
  personImage: string,
  clothingImage: string,
  clothingDescription: string
): Promise<{ success: boolean; result?: string; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('virtual-try-on', {
      body: {
        personImage,
        clothingImage,
        clothingDescription,
      },
    });

    if (error) {
      throw error;
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return {
      success: true,
      result: data.result,
    };
  } catch (error) {
    console.error('Virtual try-on error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '换装失败',
    };
  }
}
