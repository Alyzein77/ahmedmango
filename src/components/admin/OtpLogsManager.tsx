import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Search, Phone, CheckCircle, XCircle, Clock, Webhook } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface OtpLog {
  id: string;
  phone_number: string;
  attempt_id: string | null;
  transaction_id: string | null;
  event_type: string;
  status: string;
  error_message: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const OtpLogsManager = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: logs, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['otp-logs', eventFilter, statusFilter, searchPhone],
    queryFn: async () => {
      let query = supabase
        .from('otp_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (eventFilter !== "all") {
        query = query.eq('event_type', eventFilter);
      }
      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter);
      }
      if (searchPhone) {
        query = query.ilike('phone_number', `%${searchPhone}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as OtpLog[];
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  // Calculate statistics
  const stats = {
    total: logs?.length || 0,
    initiated: logs?.filter(l => l.event_type === 'otp_initiated').length || 0,
    webhooks: logs?.filter(l => l.event_type === 'webhook_received').length || 0,
    retrieved: logs?.filter(l => l.event_type === 'token_retrieved').length || 0,
    success: logs?.filter(l => l.status === 'success').length || 0,
    failed: logs?.filter(l => l.status === 'failed').length || 0,
    pending: logs?.filter(l => l.status === 'pending').length || 0,
  };

  const getEventBadge = (eventType: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      'otp_initiated': { label: 'بدء OTP', className: 'bg-blue-500 text-white' },
      'webhook_received': { label: 'Webhook', className: 'bg-purple-500 text-white' },
      'token_retrieved': { label: 'استرجاع توكن', className: 'bg-orange-500 text-white' },
      'verification_complete': { label: 'تم التحقق', className: 'bg-green-500 text-white' },
    };
    const variant = variants[eventType] || { label: eventType, className: 'bg-gray-500 text-white' };
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      'success': { label: 'نجح', className: 'bg-green-500 text-white' },
      'failed': { label: 'فشل', className: 'bg-red-500 text-white' },
      'pending': { label: 'قيد الانتظار', className: 'bg-yellow-500 text-white' },
    };
    const variant = variants[status] || { label: status, className: 'bg-gray-500 text-white' };
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="border-2 border-foreground shadow-bold-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70">الإجمالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground shadow-bold-sm bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              بدء OTP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar text-blue-600">{stats.initiated}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground shadow-bold-sm bg-purple-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70 flex items-center gap-1">
              <Webhook className="w-4 h-4" />
              Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar text-purple-600">{stats.webhooks}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground shadow-bold-sm bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              استرجاع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar text-orange-600">{stats.retrieved}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground shadow-bold-sm bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              نجح
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar text-green-600">{stats.success}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground shadow-bold-sm bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70 flex items-center gap-1">
              <XCircle className="w-4 h-4" />
              فشل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground shadow-bold-sm bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-tajawal text-foreground/70 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              انتظار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-lalezar text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-foreground/50" />
          <Input
            placeholder="بحث برقم الموبايل..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="border-2 border-foreground font-tajawal"
          />
        </div>
        <Select value={eventFilter} onValueChange={setEventFilter}>
          <SelectTrigger className="w-[180px] border-2 border-foreground font-tajawal">
            <SelectValue placeholder="نوع الحدث" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأحداث</SelectItem>
            <SelectItem value="otp_initiated">بدء OTP</SelectItem>
            <SelectItem value="webhook_received">Webhook</SelectItem>
            <SelectItem value="token_retrieved">استرجاع توكن</SelectItem>
            <SelectItem value="verification_complete">تم التحقق</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] border-2 border-foreground font-tajawal">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            <SelectItem value="success">نجح</SelectItem>
            <SelectItem value="failed">فشل</SelectItem>
            <SelectItem value="pending">انتظار</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="border-2 border-foreground font-tajawal"
        >
          <RefreshCw className={`w-4 h-4 ml-2 ${isFetching ? 'animate-spin' : ''}`} />
          تحديث
        </Button>
      </div>

      {/* Logs Table */}
      <div className="border-2 border-foreground rounded-xl overflow-hidden shadow-bold">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow className="border-b-2 border-foreground">
              <TableHead className="font-tajawal font-bold text-foreground">الوقت</TableHead>
              <TableHead className="font-tajawal font-bold text-foreground">رقم الموبايل</TableHead>
              <TableHead className="font-tajawal font-bold text-foreground">نوع الحدث</TableHead>
              <TableHead className="font-tajawal font-bold text-foreground">الحالة</TableHead>
              <TableHead className="font-tajawal font-bold text-foreground">Attempt ID</TableHead>
              <TableHead className="font-tajawal font-bold text-foreground">الخطأ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : logs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 font-tajawal text-foreground/50">
                  لا توجد سجلات
                </TableCell>
              </TableRow>
            ) : (
              logs?.map((log) => (
                <TableRow key={log.id} className="border-b border-foreground/20 hover:bg-secondary/50">
                  <TableCell className="font-tajawal text-sm">
                    <div className="flex flex-col">
                      <span>{format(new Date(log.created_at), 'HH:mm:ss', { locale: ar })}</span>
                      <span className="text-xs text-foreground/50">
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: ar })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm" dir="ltr">
                    {log.phone_number}
                  </TableCell>
                  <TableCell>{getEventBadge(log.event_type)}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="font-mono text-xs max-w-[150px] truncate" dir="ltr" title={log.attempt_id || log.transaction_id || '-'}>
                    {log.attempt_id?.substring(0, 20) || log.transaction_id?.substring(0, 20) || '-'}...
                  </TableCell>
                  <TableCell className="text-sm text-red-600 max-w-[200px] truncate" title={log.error_message || ''}>
                    {log.error_message || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Auto-refresh indicator */}
      <div className="text-center text-sm text-foreground/50 font-tajawal">
        يتم التحديث تلقائياً كل 30 ثانية
      </div>
    </div>
  );
};

export default OtpLogsManager;
