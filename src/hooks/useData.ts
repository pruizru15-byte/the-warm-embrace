import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Hook para el Perfil (Hero)
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) throw new Error('Supabase no configurado');
      const { data, error } = await supabase.from('perfil').select('*').single();
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
  });
};

// Hook para Experiencia (Timeline)
export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { data, error } = await supabase
        .from('experiencia')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
  });
};

// Hook para Metas
export const useGoals = () => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { data, error } = await supabase
        .from('metas')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
  });
};

// Hook para Habilidades
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { data, error } = await supabase
        .from('habilidades')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
  });
};

// Hook para Redes Sociales
export const useSocials = () => {
  return useQuery({
    queryKey: ['socials'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { data, error } = await supabase
        .from('redes_sociales')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
  });
};

// Hook para Proyectos
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { data, error } = await supabase
        .from('proyectos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
  });
};

// Hook para Poemas
export const usePoems = () => {
  return useQuery({
    queryKey: ['poems'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { data, error } = await supabase
        .from('poemas')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      // Convertir content (\n) a array para que el componente funcione igual
      return data.map((poem: any) => ({
        ...poem,
        lines: poem.content.split('\n'),
      }));
    },
    enabled: isSupabaseConfigured(),
  });
};
