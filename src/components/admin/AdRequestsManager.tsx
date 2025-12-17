import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Eye, Phone, Loader2, Trash2, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface AdRequest {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  brand_title: string;
  brand_name: string;
  brand_link: string | null;
  message: string;
  status: string;
}

const statusOptions = [
  { value: "pending", label: "قيد الانتظار", color: "bg-yellow-500" },
  { value: "contacted", label: "تم التواصل", color: "bg-blue-500" },
  { value: "approved", label: "تمت الموافقة", color: "bg-green-500" },
  { value: "rejected", label: "مرفوض", color: "bg-red-500" },
];

const AdRequestsManager = () => {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<AdRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data: requests, isLoading, refetch } = useQuery({
    queryKey: ["ad-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ad_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as AdRequest[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("ad_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-requests"] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة الطلب بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة الطلب",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ad_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-requests"] });
      toast({
        title: "تم الحذف",
        description: "تم حذف الطلب بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في حذف الطلب",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find((s) => s.value === status) || statusOptions[0];
    return (
      <Badge className={`${statusConfig.color} text-white font-tajawal`}>
        {statusConfig.label}
      </Badge>
    );
  };

  const openDetails = (request: AdRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-lalezar text-foreground">
            طلبات الإعلانات
          </h2>
          <p className="text-sm text-foreground/70 font-tajawal">
            {requests?.length || 0} طلب
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="font-tajawal border-2 border-foreground shadow-bold-sm hover:shadow-none"
        >
          <RefreshCw className="w-4 h-4 ml-2" />
          تحديث
        </Button>
      </div>

      {/* Table */}
      {requests && requests.length > 0 ? (
        <div className="bg-background rounded-xl border-4 border-foreground shadow-bold overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange border-b-4 border-foreground">
                <TableHead className="font-bold font-tajawal text-foreground">الاسم</TableHead>
                <TableHead className="font-bold font-tajawal text-foreground">البراند</TableHead>
                <TableHead className="font-bold font-tajawal text-foreground">التاريخ</TableHead>
                <TableHead className="font-bold font-tajawal text-foreground">الحالة</TableHead>
                <TableHead className="font-bold font-tajawal text-foreground text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="border-b-2 border-foreground/20">
                  <TableCell className="font-tajawal font-bold">{request.name}</TableCell>
                  <TableCell className="font-tajawal">{request.brand_name}</TableCell>
                  <TableCell className="font-tajawal text-sm">
                    {format(new Date(request.created_at), "d MMMM yyyy", { locale: ar })}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={request.status}
                      onValueChange={(value) =>
                        updateStatusMutation.mutate({ id: request.id, status: value })
                      }
                    >
                      <SelectTrigger className="w-36 border-2 border-foreground font-tajawal">
                        <SelectValue>{getStatusBadge(request.status)}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <Badge className={`${option.color} text-white font-tajawal`}>
                              {option.label}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetails(request)}
                        className="border-2 border-foreground shadow-bold-sm hover:shadow-none"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${request.phone}`, "_blank")}
                        className="border-2 border-foreground shadow-bold-sm hover:shadow-none"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(request.id)}
                        className="border-2 border-destructive text-destructive shadow-bold-sm hover:shadow-none hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-background rounded-xl border-4 border-foreground shadow-bold p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-foreground">
            <span className="text-3xl">📭</span>
          </div>
          <h3 className="text-lg font-bold font-lalezar text-foreground mb-2">
            لا توجد طلبات
          </h3>
          <p className="text-foreground/70 font-tajawal">
            لم يتم استلام أي طلبات إعلانية حتى الآن
          </p>
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg border-4 border-foreground shadow-bold">
          <DialogHeader>
            <DialogTitle className="font-lalezar text-xl">تفاصيل الطلب</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 font-tajawal">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-foreground/70 font-bold">الاسم</label>
                  <p className="font-bold">{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="text-sm text-foreground/70 font-bold">الهاتف</label>
                  <p className="font-bold" dir="ltr">{selectedRequest.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-foreground/70 font-bold">عنوان الإعلان</label>
                <p className="font-bold">{selectedRequest.brand_title}</p>
              </div>
              
              <div>
                <label className="text-sm text-foreground/70 font-bold">اسم البراند</label>
                <p className="font-bold">{selectedRequest.brand_name}</p>
              </div>
              
              {selectedRequest.brand_link && (
                <div>
                  <label className="text-sm text-foreground/70 font-bold">رابط البراند</label>
                  <a
                    href={selectedRequest.brand_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange hover:underline"
                  >
                    {selectedRequest.brand_link}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
              
              <div>
                <label className="text-sm text-foreground/70 font-bold">الرسالة</label>
                <p className="bg-muted p-3 rounded-lg border-2 border-foreground/20">
                  {selectedRequest.message}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t-2 border-foreground/20">
                <div>
                  <label className="text-sm text-foreground/70 font-bold">تاريخ الإرسال</label>
                  <p className="text-sm">
                    {format(new Date(selectedRequest.created_at), "d MMMM yyyy - h:mm a", { locale: ar })}
                  </p>
                </div>
                {getStatusBadge(selectedRequest.status)}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-orange text-foreground font-bold border-2 border-foreground shadow-bold hover:shadow-none"
                  onClick={() => window.open(`tel:${selectedRequest.phone}`, "_blank")}
                >
                  <Phone className="w-4 h-4 ml-2" />
                  اتصال
                </Button>
                <Button
                  className="flex-1 bg-green-500 text-white font-bold border-2 border-foreground shadow-bold hover:shadow-none"
                  onClick={() => window.open(`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}`, "_blank")}
                >
                  واتساب
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdRequestsManager;
