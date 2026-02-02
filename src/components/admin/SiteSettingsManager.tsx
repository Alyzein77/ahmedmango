import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, Gamepad2, Settings } from "lucide-react";

interface SiteSetting {
  id: string;
  key: string;
  value: boolean;
  label: string;
  description: string | null;
}

const settingIcons: Record<string, React.ReactNode> = {
  game_section_visible: <Gamepad2 className="w-5 h-5" />,
};

const SiteSettingsManager = () => {
  const queryClient = useQueryClient();
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as SiteSetting[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: boolean }) => {
      const { error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings', variables.key] });
      toast({
        title: "تم الحفظ",
        description: "تم تحديث الإعداد بنجاح",
      });
    },
    onError: (error) => {
      console.error('Error updating setting:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الإعداد",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setUpdatingKey(null);
    },
  });

  const handleToggle = (key: string, currentValue: boolean) => {
    setUpdatingKey(key);
    updateMutation.mutate({ key, value: !currentValue });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center border-2 border-foreground shadow-bold">
          <Settings className="w-6 h-6 text-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-lalezar text-foreground">إعدادات الموقع</h2>
          <p className="text-sm text-muted-foreground font-tajawal">تحكم في إظهار وإخفاء أقسام الموقع</p>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="grid gap-4">
        {settings?.map((setting) => (
          <Card key={setting.id} className="bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center border-2 border-foreground">
                    {settingIcons[setting.key] || <Settings className="w-5 h-5" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-lalezar">{setting.label}</CardTitle>
                    {setting.description && (
                      <CardDescription className="font-tajawal mt-1">
                        {setting.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {updatingKey === setting.key && (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                  <div className="flex items-center gap-2">
                    <Label 
                      htmlFor={setting.key} 
                      className={`text-sm font-tajawal font-bold ${setting.value ? 'text-green-600' : 'text-muted-foreground'}`}
                    >
                      {setting.value ? 'مفعّل' : 'معطّل'}
                    </Label>
                    <Switch
                      id={setting.key}
                      checked={setting.value}
                      onCheckedChange={() => handleToggle(setting.key, setting.value)}
                      disabled={updatingKey === setting.key}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {settings?.length === 0 && (
          <Card className="bg-card">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground font-tajawal">لا توجد إعدادات متاحة</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SiteSettingsManager;
