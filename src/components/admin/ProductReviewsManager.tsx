import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface ProductReview {
  id: string;
  product_name: string;
  product_image: string | null;
  video_url: string;
  platform: string | null;
  posted_at: string;
  verdict: string | null;
  score: number | null;
  created_at: string;
}

const emptyForm = {
  product_name: '',
  product_image: '',
  video_url: '',
  platform: '',
  posted_at: new Date().toISOString().slice(0, 16),
  verdict: '',
  score: '',
};

export const ProductReviewsManager = () => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ProductReview | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .order('posted_at', { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openCreateDialog = () => {
    setEditingReview(null);
    setFormData(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (review: ProductReview) => {
    setEditingReview(review);
    setFormData({
      product_name: review.product_name,
      product_image: review.product_image || '',
      video_url: review.video_url,
      platform: review.platform || '',
      posted_at: new Date(review.posted_at).toISOString().slice(0, 16),
      verdict: review.verdict || '',
      score: review.score?.toString() || '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.product_name || !formData.video_url || !formData.posted_at) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    setSaving(true);

    const payload = {
      product_name: formData.product_name,
      product_image: formData.product_image || null,
      video_url: formData.video_url,
      platform: formData.platform || null,
      posted_at: new Date(formData.posted_at).toISOString(),
      verdict: formData.verdict || null,
      score: formData.score ? parseInt(formData.score) : null,
    };

    if (editingReview) {
      const { error } = await supabase
        .from('product_reviews')
        .update(payload)
        .eq('id', editingReview.id);

      if (error) {
        toast.error('فشل في التحديث');
      } else {
        toast.success('تم التحديث بنجاح');
        setDialogOpen(false);
        fetchReviews();
      }
    } else {
      const { error } = await supabase
        .from('product_reviews')
        .insert(payload);

      if (error) {
        toast.error('فشل في الإضافة');
      } else {
        toast.success('تمت الإضافة بنجاح');
        setDialogOpen(false);
        fetchReviews();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    const { error } = await supabase
      .from('product_reviews')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('فشل في الحذف');
    } else {
      toast.success('تم الحذف بنجاح');
      fetchReviews();
    }
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المراجعات</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة مراجعة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingReview ? 'تعديل المراجعة' : 'إضافة مراجعة جديدة'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>اسم المنتج *</Label>
                <Input
                  value={formData.product_name}
                  onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                  placeholder="اسم المنتج"
                />
              </div>

              <div>
                <ImageUpload
                  value={formData.product_image}
                  onChange={(url) => setFormData({ ...formData, product_image: url })}
                  label="صورة المنتج"
                />
              </div>

              <div>
                <Label>رابط الفيديو *</Label>
                <Input
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>

              <div>
                <Label>تاريخ النشر *</Label>
                <Input
                  type="datetime-local"
                  value={formData.posted_at}
                  onChange={(e) => setFormData({ ...formData, posted_at: e.target.value })}
                />
              </div>

              <div>
                <Label>المنصة</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(val) => setFormData({ ...formData, platform: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنصة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>الحكم</Label>
                <Select
                  value={formData.verdict}
                  onValueChange={(val) => setFormData({ ...formData, verdict: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحكم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2astaka">٢ستكا</SelectItem>
                    <SelectItem value="fastaka">فستكا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>التقييم (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="1-10"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الصورة</TableHead>
            <TableHead>اسم المنتج</TableHead>
            <TableHead>المنصة</TableHead>
            <TableHead>الحكم</TableHead>
            <TableHead>التقييم</TableHead>
            <TableHead>تاريخ النشر</TableHead>
            <TableHead>إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                {review.product_image ? (
                  <img
                    src={review.product_image}
                    alt={review.product_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">📦</div>
                )}
              </TableCell>
              <TableCell className="font-medium">{review.product_name}</TableCell>
              <TableCell>{review.platform || '-'}</TableCell>
              <TableCell>
                {review.verdict === '2astaka' && <span className="text-green-600 font-bold">٢ستكا</span>}
                {review.verdict === 'fastaka' && <span className="text-red-600 font-bold">فستكا</span>}
                {!review.verdict && '-'}
              </TableCell>
              <TableCell>{review.score || '-'}</TableCell>
              <TableCell>{new Date(review.posted_at).toLocaleDateString('ar-EG')}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(review)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {reviews.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          لا توجد مراجعات بعد
        </div>
      )}
    </div>
  );
};
