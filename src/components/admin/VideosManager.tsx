import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Pencil, Trash2, Youtube, Music2, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VideoFormDialog from "./VideoFormDialog";
import { Database } from "@/integrations/supabase/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Video = Database["public"]["Tables"]["videos"]["Row"];
type VideoInsert = Database["public"]["Tables"]["videos"]["Insert"];
type VideoUpdate = Database["public"]["Tables"]["videos"]["Update"];
type Platform = Database["public"]["Enums"]["video_platform"];

const platformIcons: Record<Platform, typeof Youtube> = {
  YouTube: Youtube,
  TikTok: Music2,
  Instagram: Instagram,
  Facebook: Facebook,
};

const VideosManager = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const { toast } = useToast();

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
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

  const handleAddVideo = async (videoData: VideoInsert) => {
    try {
      const { error } = await supabase.from("videos").insert([videoData]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تمت إضافة الفيديو بنجاح",
      });
      fetchVideos();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding video:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة الفيديو",
        variant: "destructive",
      });
    }
  };

  const handleUpdateVideo = async (id: string, videoData: VideoUpdate) => {
    try {
      const { error } = await supabase
        .from("videos")
        .update(videoData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم تحديث الفيديو بنجاح",
      });
      fetchVideos();
      setDialogOpen(false);
      setEditingVideo(null);
    } catch (error) {
      console.error("Error updating video:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الفيديو",
        variant: "destructive",
      });
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الفيديو؟")) return;

    try {
      const { error } = await supabase.from("videos").delete().eq("id", id);

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

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingVideo(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-tajawal">
            لوحة الفيديوهات
          </h1>
          <p className="text-muted-foreground font-tajawal">
            إدارة جميع الفيديوهات
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-tajawal"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة فيديو جديد
        </Button>
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
                <TableHead className="text-right font-tajawal">العنوان</TableHead>
                <TableHead className="text-right font-tajawal">المنصة</TableHead>
                <TableHead className="text-right font-tajawal">الفئة</TableHead>
                <TableHead className="text-right font-tajawal">المدة</TableHead>
                <TableHead className="text-right font-tajawal">مميز</TableHead>
                <TableHead className="text-right font-tajawal">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8 font-tajawal">
                    لا توجد فيديوهات
                  </TableCell>
                </TableRow>
              ) : (
                videos.map((video) => {
                  const PlatformIcon = platformIcons[video.platform];
                  return (
                    <TableRow key={video.id}>
                      <TableCell className="font-tajawal font-medium">{video.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PlatformIcon className="w-4 h-4" />
                          <span className="font-tajawal">{video.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-tajawal">{video.category}</TableCell>
                      <TableCell className="font-tajawal">{video.duration || "-"}</TableCell>
                      <TableCell>
                        {video.is_featured ? (
                          <span className="text-primary">✨ نعم</span>
                        ) : (
                          <span className="text-muted-foreground">لا</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(video)}
                            className="h-8 w-8"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Video Form Dialog */}
      <VideoFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        video={editingVideo}
        onSubmit={editingVideo
          ? (data) => handleUpdateVideo(editingVideo.id, data)
          : handleAddVideo
        }
      />
    </div>
  );
};

export default VideosManager;
