import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// A veces los usuarios usan nombres distintos para la llave, como VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Verificación básica de que la URL es válida antes de inicializar
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http');

if (!isValidUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase no está configurado correctamente en el cliente. URL:', supabaseUrl, 'Key detectada:', !!supabaseAnonKey);
}

// Inicializamos solo si la URL es válida para evitar el error de "Invalid URL"
export const supabase = createClient(
  isValidUrl ? supabaseUrl : 'https://todo-esto-es-placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);

export const isSupabaseConfigured = () => isValidUrl && !!supabaseAnonKey;


