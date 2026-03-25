import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMixpanel } from "@/hooks/useMixpanel";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useSEO";
import {
  Phone,
  User,
  Building2,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Megaphone,
  MessageCircle,
  RefreshCw,
  X,
  Mail,
  Users,
  Eye,
  Video,
  Shield,
} from "lucide-react";

type Step = "info" | "verify" | "iframe-verify" | "success";

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 50);
};

const AdRequest = () => {
  const { toast } = useToast();
  const { trackFormSubmission, trackButtonClick, track } = useMixpanel();
  const [currentStep, setCurrentStep] = useState<Step>("info");
  const [isLoading, setIsLoading] = useState(false);

  useSEO({
    title: "أعلن مع أحمد مانجو",
    description: "عايز تعلن مع أحمد مانجو؟ تواصل معانا لعرض منتجك على أكثر من 2 مليون متابع. إعلانات سناكس، منتجات غذائية، مشروبات وأكتر.",
    canonical: "/advertise",
  });

  // OTP state
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isPollingForVerification, setIsPollingForVerification] = useState(false);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Form state - single page with all fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    brandTitle: "",
    brandLink: "",
    message: "",
  });

  // Inline validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const getError = (field: string) => {
    if (!touched[field]) return null;
    if (field === "name" && !formData.name.trim()) return "الاسم مطلوب";
    if (field === "email") {
      if (!formData.email.trim()) return "الإيميل مطلوب";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "إيميل غير صالح";
    }
    if (field === "brandName" && !formData.brandName.trim()) return "اسم البراند مطلوب";
    if (field === "message" && !formData.message.trim()) return "الرسالة مطلوبة";
    return null;
  };
  const handleBlur = (field: string) => setTouched((p) => ({ ...p, [field]: true }));

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.brandName.trim() &&
    formData.message.trim();

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => setCooldownSeconds((p) => p - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  // PostMessage listener for iframe verification
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes("akedly.io")) return;
      if (event.data?.type === "akedly-verification-success" || event.data?.status === "success") {
        handleVerificationSuccess();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const formatPhoneNumber = (phoneNumber: string): string => {
    let cleaned = phoneNumber.replace(/[^\d+]/g, "");
    if (cleaned.startsWith("0")) cleaned = "+20" + cleaned.substring(1);
    else if (cleaned.startsWith("20") && !cleaned.startsWith("+")) cleaned = "+" + cleaned;
    else if (!cleaned.startsWith("+")) cleaned = "+20" + cleaned;
    return cleaned;
  };

  const handleVerificationSuccess = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingForVerification(false);
    setShowIframeModal(false);
    // Now submit the form
    submitForm(true);
    scrollToTop();
  };

  const startPollingForVerification = (txnId: string) => {
    setIsPollingForVerification(true);
    let pollCount = 0;
    const maxPolls = 150;

    pollingIntervalRef.current = setInterval(async () => {
      pollCount++;
      if (pollCount >= maxPolls) {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        setIsPollingForVerification(false);
        toast({ title: "انتهى الوقت", description: "جرب تبعت الكود تاني", variant: "destructive" });
        return;
      }
      try {
        const response = await supabase.functions.invoke("akedly-get-token", { body: { transactionID: txnId } });
        if (response.data?.success && response.data?.verified) handleVerificationSuccess();
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 2000);
  };

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast({ title: "رقم غلط", description: "اكتب رقم موبايلك صح", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = formatPhoneNumber(formData.phone);
    try {
      const response = await supabase.functions.invoke("akedly-widget-otp", {
        body: { phoneNumber: formattedPhone },
      });
      if (response.error) throw new Error(response.error.message || "جرب تاني");
      if (response.data?.retryAfterSeconds) {
        setCooldownSeconds(response.data.retryAfterSeconds);
        throw new Error(`استنى ${response.data.retryAfterSeconds} ثانية وجرب تاني`);
      }
      if (!response.data?.success) throw new Error(response.data?.error || "جرب تاني");

      const { attemptId: newAttemptId, iframeUrl: newIframeUrl, phoneNumber: verifiedPhone } = response.data.data;
      if (!newAttemptId || !newIframeUrl) throw new Error("حصل مشكلة في الاتصال");

      setAttemptId(newAttemptId);
      setIframeUrl(newIframeUrl);
      setFormData((p) => ({ ...p, phone: verifiedPhone || formattedPhone }));
      setShowIframeModal(true);
      setCurrentStep("iframe-verify");
      startPollingForVerification(newAttemptId);
      toast({ title: "تم إرسال الكود", description: "أكمل التحقق في النافذة" });
    } catch (error: any) {
      toast({ title: "حصل مشكلة", description: error.message || "جرب تاني", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (cooldownSeconds > 0) return;
    setShowIframeModal(false);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingForVerification(false);
    await handleSendOTP();
  };

  const handleCancelVerification = () => {
    setShowIframeModal(false);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingForVerification(false);
    setCurrentStep("info");
    setAttemptId(null);
    setIframeUrl(null);
  };

  const submitForm = async (verified: boolean = false) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("ad_requests").insert({
        name: formData.name,
        phone: formData.phone || "N/A",
        brand_title: formData.brandTitle || formData.brandName,
        brand_name: formData.brandName,
        brand_link: formData.brandLink || null,
        message: `${formData.message}${formData.email ? `\n\nEmail: ${formData.email}` : ""}${verified ? "\n\n✅ Phone verified via WhatsApp" : ""}`,
      });
      if (error) throw error;

      supabase.functions
        .invoke("send-ad-notification", {
          body: {
            name: formData.name,
            phone: formData.phone || "N/A",
            brandTitle: formData.brandTitle || formData.brandName,
            brandName: formData.brandName,
            brandLink: formData.brandLink || null,
            message: formData.message,
          },
        })
        .catch((err) => console.error("Notification error:", err));

      trackFormSubmission("Ad Request", { brand_name: formData.brandName, verified });
      track("Form Step Viewed", { step_name: "success", step_number: 3 });
      setCurrentStep("success");
    } catch (error: any) {
      toast({ title: "حصل مشكلة", description: "جرب تاني أو تواصل معانا", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Mark all as touched for validation
    setTouched({ name: true, email: true, brandName: true, message: true });
    if (!isFormValid) return;

    track("Form Step Viewed", { step_name: "info_complete", step_number: 1 });

    // Submit directly without OTP
    await submitForm(false);
  };

  const handleSubmitWithVerify = async () => {
    setTouched({ name: true, email: true, brandName: true, message: true });
    if (!isFormValid) return;

    track("Form Step Viewed", { step_name: "verify_start", step_number: 2 });
    setCurrentStep("verify");
  };

  const trustStats = [
    { icon: Users, value: "2M+", label: "متابع" },
    { icon: Eye, value: "50M+", label: "مشاهدة" },
    { icon: Video, value: "500+", label: "فيديو" },
  ];

  const renderInfoStep = () => (
    <div className="space-y-5">
      {/* Trust signals */}
      <div className="flex justify-center gap-6 mb-2">
        {trustStats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-lg sm:text-xl font-black font-lalezar text-primary">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground font-bold">{stat.label}</div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground font-bold mb-4">
        هنرد عليك خلال 48 ساعة ⚡
      </p>

      {/* All fields in one view */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-right block mb-1.5">
            <User className="w-3.5 h-3.5 inline ml-1" />
            الاسم *
          </Label>
          <Input
            id="name"
            placeholder="اكتب اسمك"
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            onBlur={() => handleBlur("name")}
            className="text-right"
          />
          {getError("name") && <p className="text-destructive text-xs mt-1 text-right">{getError("name")}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-right block mb-1.5">
            <Mail className="w-3.5 h-3.5 inline ml-1" />
            الإيميل *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            onBlur={() => handleBlur("email")}
            className="text-left"
            dir="ltr"
          />
          {getError("email") && <p className="text-destructive text-xs mt-1 text-right">{getError("email")}</p>}
        </div>

        <div>
          <Label htmlFor="brandName" className="text-right block mb-1.5">
            <Building2 className="w-3.5 h-3.5 inline ml-1" />
            اسم البراند *
          </Label>
          <Input
            id="brandName"
            placeholder="اسم الشركة أو البراند"
            value={formData.brandName}
            onChange={(e) => setFormData((p) => ({ ...p, brandName: e.target.value }))}
            onBlur={() => handleBlur("brandName")}
            className="text-right"
          />
          {getError("brandName") && <p className="text-destructive text-xs mt-1 text-right">{getError("brandName")}</p>}
        </div>

        <div>
          <Label htmlFor="brandLink" className="text-right block mb-1.5">
            لينك الموقع أو السوشيال (اختياري)
          </Label>
          <Input
            id="brandLink"
            placeholder="https://..."
            value={formData.brandLink}
            onChange={(e) => setFormData((p) => ({ ...p, brandLink: e.target.value }))}
            className="text-left"
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-right block mb-1.5">
            <MessageSquare className="w-3.5 h-3.5 inline ml-1" />
            إيه اللي محتاجه؟ *
          </Label>
          <Textarea
            id="message"
            placeholder="اكتب تفاصيل الإعلان... نوع المحتوى، الميزانية، التوقيت..."
            value={formData.message}
            onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
            onBlur={() => handleBlur("message")}
            className="text-right min-h-[100px]"
          />
          {getError("message") && <p className="text-destructive text-xs mt-1 text-right">{getError("message")}</p>}
        </div>
      </div>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-accent hover:bg-accent/90 shadow-bold hover:-translate-y-0.5 transition-transform h-12 text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin ml-2" />
        ) : (
          <Megaphone className="w-5 h-5 ml-2" />
        )}
        ابعت الطلب
      </Button>

      {/* Optional verify for faster response */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmitWithVerify}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          disabled={isLoading}
        >
          <MessageCircle className="w-3 h-3 inline ml-1" />
          عايز رد أسرع؟ أكد رقمك على واتساب
        </button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/60 flex items-center justify-center gap-1">
        <Shield className="w-3 h-3" />
        مفيش التزام. هنتواصل معاك لمناقشة التفاصيل.
      </p>
    </div>
  );

  const renderVerifyStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">تأكيد رقم الواتساب (اختياري)</h2>
        <p className="text-muted-foreground text-sm">
          أكد رقمك وهنرد عليك أسرع! أو{" "}
          <button
            type="button"
            onClick={() => submitForm(false)}
            className="text-accent underline font-bold"
          >
            ابعت من غير تأكيد
          </button>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="phone" className="text-right block mb-2">رقم الموبايل</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="01xxxxxxxxx"
            value={formData.phone}
            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
            className="text-right text-lg"
            dir="ltr"
          />
          <p className="text-xs text-muted-foreground mt-2 text-right flex items-center justify-end gap-1">
            <MessageCircle className="w-3 h-3" />
            هيوصلك كود على واتساب
          </p>
        </div>

        <Button
          onClick={handleSendOTP}
          className="w-full bg-green-500 hover:bg-green-600 shadow-bold hover:-translate-y-0.5 transition-transform"
          disabled={isLoading || cooldownSeconds > 0}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin ml-2" />
          ) : cooldownSeconds > 0 ? (
            <span>استنى {cooldownSeconds} ثانية</span>
          ) : (
            <>
              <MessageCircle className="w-4 h-4 ml-2" />
              ابعتلي الكود على واتساب
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">وصلنا طلبك! 🎉</h2>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        شكراً ليك! هنراجع طلبك ونتواصل معاك على {formData.email} في أقرب وقت.
      </p>
      <Button
        onClick={() => (window.location.href = "/")}
        className="shadow-bold hover:-translate-y-0.5 transition-transform"
      >
        رجوع للصفحة الرئيسية
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <Navbar />

      <main className="flex-1 flex items-start justify-center px-4 py-8 pt-24 md:pt-8 md:items-center">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">تواصل للإعلانات</h1>
            <p className="text-muted-foreground">
              عايز تعلن معانا؟ ابعتلنا طلبك وهنرد عليك
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-bold">
            {currentStep === "info" && renderInfoStep()}
            {(currentStep === "verify" || currentStep === "iframe-verify") && renderVerifyStep()}
            {currentStep === "success" && renderSuccessStep()}
          </div>
        </div>
      </main>

      {/* Akedly Verification Iframe Modal */}
      <Dialog
        open={showIframeModal}
        onOpenChange={(open) => {
          if (!open) handleCancelVerification();
        }}
      >
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2 border-b">
            <DialogTitle className="text-right flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={handleCancelVerification} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
              <span>تأكيد رقم الموبايل</span>
            </DialogTitle>
          </DialogHeader>

          <div className="relative">
            {isPollingForVerification && (
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري التحقق...</span>
              </div>
            )}
            {iframeUrl && (
              <iframe
                src={iframeUrl}
                className="w-full h-[450px] border-0"
                allow="clipboard-write"
                title="Akedly Verification"
              />
            )}
          </div>

          <div className="p-4 pt-2 border-t flex gap-3">
            <Button variant="outline" onClick={handleCancelVerification} className="flex-1">
              إلغاء
            </Button>
            <Button onClick={handleResendOTP} disabled={cooldownSeconds > 0 || isLoading} className="flex-1">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : cooldownSeconds > 0 ? (
                <span>استنى {cooldownSeconds} ثانية</span>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 ml-2" />
                  ابعت الكود تاني
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdRequest;
