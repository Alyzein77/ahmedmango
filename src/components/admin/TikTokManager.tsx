import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, ExternalLink, Music2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TikTokVideo {
  id: string;
  tiktok_id: string;
  caption: string | null;
  author_name: string | null;
  author_username: string | null;
  video_url: string;
  thumbnail_url: string | null;
  hashtags: string[] | null;
  posted_at: string;
  created_at: string;
}

const TikTokManager = () => {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tiktok-webhook`;
  const rssUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tiktok-rss`;

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tiktok_tagged_videos")
        .select("*")
        .order("posted_at", { ascending: false });

      if (error) throw error;
      setVideos((data as TikTokVideo[]) || []);
    } catch (error) {
      console.error("Error fetching TikTok videos:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الفيديوهات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الفيديو؟")) return;

    try {
      const { error } = await supabase
        .from("tiktok_tagged_videos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم حذف الفيديو بنجاح",
      });
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الفيديو",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: `تم نسخ ${label}`,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text) return "-";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-tajawal flex items-center gap-2">
            <Music2 className="w-6 h-6" />
            TikTok – 2astaka / Fastaka
          </h1>
          <p className="text-muted-foreground font-tajawal">
            فيديوهات تيك توك بهاشتاج 2استكا / فاستكا
          </p>
        </div>
      </div>

      {/* Endpoint Info */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6 space-y-3">
        <h3 className="font-bold text-foreground font-tajawal">روابط الـ API</h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground font-tajawal">Webhook URL:</span>
          <code className="text-xs bg-background px-2 py-1 rounded border flex-1 min-w-0 truncate" dir="ltr">
            {webhookUrl}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground font-tajawal">RSS Feed:</span>
          <code className="text-xs bg-background px-2 py-1 rounded border flex-1 min-w-0 truncate" dir="ltr">
            {rssUrl}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => copyToClipboard(rssUrl, "RSS URL")}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="font-tajawal"
            onClick={() => window.open(rssUrl, "_blank")}
          >
            <ExternalLink className="w-4 h-4 ml-1" />
            فتح RSS
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-tajawal">
          استخدم Webhook URL في Zapier أو Make لإرسال فيديوهات TikTok الجديدة تلقائياً
        </p>
      </div>

      {/* Videos Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-tajawal">التاريخ</TableHead>
                <TableHead className="text-right font-tajawal">المستخدم</TableHead>
                <TableHead className="text-right font-tajawal">الوصف</TableHead>
                <TableHead className="text-right font-tajawal">الرابط</TableHead>
                <TableHead className="text-right font-tajawal">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8 font-tajawal">
                    لا توجد فيديوهات بعد
                  </TableCell>
                </TableRow>
              ) : (
                videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-tajawal text-sm">
                      {formatDate(video.posted_at)}
                    </TableCell>
                    <TableCell className="font-tajawal">
                      {video.author_username ? `@${video.author_username}` : "-"}
                    </TableCell>
                    <TableCell className="font-tajawal max-w-[200px]">
                      {truncateText(video.caption, 50)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={() => window.open(video.video_url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 ml-1" />
                        فتح
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(video.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TikTokManager;
