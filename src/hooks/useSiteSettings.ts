import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSettings = (key: string) => {
  return useQuery({
    queryKey: ['site-settings', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();
      
      if (error) {
        console.error('Error fetching site setting:', error);
        return false;
      }
      
      return data?.value ?? false;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
