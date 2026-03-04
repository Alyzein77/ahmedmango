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
  ArrowRight,
  ArrowLeft,
  Loader2,
  Megaphone,
  MessageCircle,
  RefreshCw,
  X
} from "lucide-react";

type Step = "otp" | "iframe-verify" | "about-you" | "about-brand" | "message" | "success";

// Utility to scroll to top (especially for mobile after OTP verification)
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // Fallback for mobile browsers
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 50);
};

const AdRequest = () => {
  const { toast } = useToast();
  const { trackFormSubmission, trackButtonClick } = useMixpanel();
  const [currentStep, setCurrentStep] = useState<Step>("otp");
  const [isLoading, setIsLoading] = useState(false);

  useSEO({
    title: "أعلن مع أحمد مانجو",
    description: "عايز تعلن مع أحمد مانجو؟ تواصل معانا لعرض منتجك على أكثر من 2 مليون متابع. إعلانات سناكس، منتجات غذائية، مشروبات وأكتر.",
    canonical: "/advertise",
  });
  
  // OTP state
  const [phone, setPhone] = useState("");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isPollingForVerification, setIsPollingForVerification] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brandTitle: "",
    brandName: "",
    brandLink: "",
    message: "",
  });

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => {
        setCooldownSeconds(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  // PostMessage listener for iframe verification (fallback)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from Akedly
      if (!event.origin.includes('akedly.io')) return;

      console.log('Received postMessage from iframe:', event.data);

      if (event.data?.type === 'akedly-verification-success' || 
          event.data?.status === 'success') {
        handleVerificationSuccess();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove any non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // If starts with 0, replace with +20 (Egypt)
    if (cleaned.startsWith('0')) {
      cleaned = '+20' + cleaned.substring(1);
    }
    // If starts with 20 but no +, add +
    else if (cleaned.startsWith('20') && !cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    // If doesn't start with +, assume Egypt
    else if (!cleaned.startsWith('+')) {
      cleaned = '+20' + cleaned;
    }
    
    return cleaned;
  };

  const handleVerificationSuccess = () => {
    console.log('Verification successful!');
    
    // Stop polling
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingForVerification(false);
    setShowIframeModal(false);
    setCurrentStep("about-you");
    
    // Scroll to top after verification (important for mobile)
    scrollToTop();
    
    toast({
      title: "تم التأكيد!",
      description: "كمّل بياناتك دلوقتي",
    });
  };

  const startPollingForVerification = (txnId: string) => {
    setIsPollingForVerification(true);
    let pollCount = 0;
    const maxPolls = 150; // 5 minutes at 2 second intervals

    pollingIntervalRef.current = setInterval(async () => {
      pollCount++;
      
      if (pollCount >= maxPolls) {
        console.log('Polling timeout reached');
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setIsPollingForVerification(false);
        toast({
          title: "انتهى الوقت",
          description: "جرب تبعت الكود تاني",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await supabase.functions.invoke('akedly-get-token', {
          body: { transactionID: txnId },
        });

        console.log('Polling response:', response.data);

        if (response.data?.success && response.data?.verified) {
          handleVerificationSuccess();
        }
      } catch (error) {
        console.error('Polling error:', error);
        // Continue polling unless it's a fatal error
      }
    }, 2000); // Poll every 2 seconds
  };

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "رقم غلط",
        description: "اكتب رقم موبايلك صح",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const formattedPhone = formatPhoneNumber(phone);

    try {
      const response = await supabase.functions.invoke('akedly-widget-otp', {
        body: { phoneNumber: formattedPhone },
      });

      console.log('Widget OTP response:', response.data);

      if (response.error) {
        throw new Error(response.error.message || 'جرب تاني');
      }

      // Handle rate limiting
      if (response.data?.retryAfterSeconds) {
        setCooldownSeconds(response.data.retryAfterSeconds);
        throw new Error(`استنى ${response.data.retryAfterSeconds} ثانية وجرب تاني`);
      }

      if (!response.data?.success) {
        throw new Error(response.data?.error || 'جرب تاني');
      }

      const { attemptId: newAttemptId, iframeUrl: newIframeUrl, phoneNumber: verifiedPhone } = response.data.data;

      if (!newAttemptId || !newIframeUrl) {
        throw new Error('حصل مشكلة في الاتصال');
      }

      setAttemptId(newAttemptId);
      setIframeUrl(newIframeUrl);
      setFormData(prev => ({ ...prev, phone: verifiedPhone || formattedPhone }));
      setShowIframeModal(true);
      setCurrentStep("iframe-verify");
      
      // Start polling for verification
      startPollingForVerification(newAttemptId);

      toast({
        title: "تم إرسال الكود",
        description: "أكمل التحقق في النافذة المنبثقة",
      });
    } catch (error: any) {
      toast({
        title: "حصل مشكلة",
        description: error.message || "جرب تاني",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (cooldownSeconds > 0) return;
    
    // Close modal and reset
    setShowIframeModal(false);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingForVerification(false);
    
    // Resend OTP
    await handleSendOTP();
  };

  const handleCancelVerification = () => {
    setShowIframeModal(false);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingForVerification(false);
    setCurrentStep("otp");
    setAttemptId(null);
    setIframeUrl(null);
  };

  const handleSubmit = async () => {
    if (!formData.message.trim()) {
      toast({
        title: "اكتب رسالتك",
        description: "لازم تكتب رسالة علشان نعرف تفاصيل أكتر",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("ad_requests").insert({
        name: formData.name,
        phone: formData.phone,
        brand_title: formData.brandTitle,
        brand_name: formData.brandName,
        brand_link: formData.brandLink || null,
        message: formData.message,
      });

      if (error) throw error;

      // Send email notification (fire and forget - don't block submission)
      supabase.functions.invoke('send-ad-notification', {
        body: {
          name: formData.name,
          phone: formData.phone,
          brandTitle: formData.brandTitle,
          brandName: formData.brandName,
          brandLink: formData.brandLink || null,
          message: formData.message,
        },
      }).then((res) => {
        if (res.error) {
          console.error("Error sending notification email:", res.error);
        } else {
          console.log("Notification email sent successfully");
        }
      }).catch((err) => {
        console.error("Error invoking send-ad-notification:", err);
      });

      trackFormSubmission('Ad Request', { 
        brand_name: formData.brandName,
        brand_title: formData.brandTitle 
      });
      setCurrentStep("success");
    } catch (error: any) {
      toast({
        title: "حصل مشكلة",
        description: "جرب تاني أو تواصل معانا",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "otp", label: "تأكيد الموبايل", icon: <Phone className="w-4 h-4" /> },
    { key: "about-you", label: "عنك", icon: <User className="w-4 h-4" /> },
    { key: "about-brand", label: "البراند", icon: <Building2 className="w-4 h-4" /> },
    { key: "message", label: "الرسالة", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const getStepIndex = (step: Step) => {
    if (step === "otp" || step === "iframe-verify") return 0;
    if (step === "about-you") return 1;
    if (step === "about-brand") return 2;
    if (step === "message") return 3;
    return 4;
  };

  const renderStepIndicator = () => {
    if (currentStep === "success") return null;
    
    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => {
          const currentIndex = getStepIndex(currentStep);
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex items-center">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${isCompleted 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : isActive 
                      ? "bg-primary/20 border-primary text-primary" 
                      : "bg-muted border-border text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`w-8 h-0.5 mx-1 ${
                    isCompleted ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">تأكيد رقم الموبايل</h2>
        <p className="text-muted-foreground mb-3">
          علشان نتأكد إنك مش سبام، هنبعتلك كود على الواتساب
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
          <MessageCircle className="w-4 h-4" />
          <span>OTP عن طريق واتساب</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="phone" className="text-right block mb-2">رقم الموبايل</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-right text-lg"
            dir="ltr"
          />
          <p className="text-xs text-muted-foreground mt-2 text-right flex items-center justify-end gap-1">
            <MessageCircle className="w-3 h-3" />
            هيوصلك كود 6 أرقام على واتساب
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

  const renderAboutYouStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-sky/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-sky" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">عرّفنا بنفسك</h2>
        <p className="text-muted-foreground">قولنا اسمك إيه</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-right block mb-2">الاسم</Label>
          <Input
            id="name"
            placeholder="اكتب اسمك هنا"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="text-right"
          />
        </div>

        <div>
          <Label className="text-right block mb-2">رقم الموبايل</Label>
          <Input
            value={formData.phone}
            disabled
            className="text-right bg-muted"
            dir="ltr"
          />
        </div>

        <Button 
          onClick={() => setCurrentStep("about-brand")} 
          className="w-full shadow-bold hover:-translate-y-0.5 transition-transform"
          disabled={!formData.name.trim()}
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          كمّل
        </Button>
      </div>
    </div>
  );

  const renderAboutBrandStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">عن البراند</h2>
        <p className="text-muted-foreground">قولنا عن البراند بتاعك</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="brandTitle" className="text-right block mb-2">عنوان الإعلان</Label>
          <Input
            id="brandTitle"
            placeholder="مثلاً: إعلان منتج جديد"
            value={formData.brandTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, brandTitle: e.target.value }))}
            className="text-right"
          />
        </div>

        <div>
          <Label htmlFor="brandName" className="text-right block mb-2">اسم البراند</Label>
          <Input
            id="brandName"
            placeholder="اسم الشركة أو البراند"
            value={formData.brandName}
            onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
            className="text-right"
          />
        </div>

        <div>
          <Label htmlFor="brandLink" className="text-right block mb-2">
            لينك الموقع أو السوشيال (اختياري)
          </Label>
          <Input
            id="brandLink"
            placeholder="https://..."
            value={formData.brandLink}
            onChange={(e) => setFormData(prev => ({ ...prev, brandLink: e.target.value }))}
            className="text-left"
            dir="ltr"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep("about-you")} 
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            رجوع
          </Button>
          <Button 
            onClick={() => setCurrentStep("message")} 
            className="flex-1 shadow-bold hover:-translate-y-0.5 transition-transform"
            disabled={!formData.brandTitle.trim() || !formData.brandName.trim()}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            كمّل
          </Button>
        </div>
      </div>
    </div>
  );

  const renderMessageStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-orange" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">رسالتك</h2>
        <p className="text-muted-foreground">اكتب تفاصيل الإعلان اللي عايزه</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="message" className="text-right block mb-2">الرسالة</Label>
          <Textarea
            id="message"
            placeholder="اكتب هنا كل التفاصيل... نوع الإعلان، الميزانية، الوقت، أي حاجة تانية..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="text-right min-h-[150px]"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep("about-brand")} 
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            رجوع
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1 bg-accent hover:bg-accent/90 shadow-bold hover:-translate-y-0.5 transition-transform"
            disabled={isLoading || !formData.message.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            ) : (
              <Megaphone className="w-4 h-4 ml-2" />
            )}
            ابعت الطلب
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">وصلنا طلبك!</h2>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        شكراً ليك! هنراجع طلبك ونتواصل معاك في أقرب وقت على رقم {formData.phone}
      </p>
      <Button 
        onClick={() => window.location.href = "/"}
        className="shadow-bold hover:-translate-y-0.5 transition-transform"
      >
        رجوع للصفحة الرئيسية
      </Button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "otp":
        return renderOTPStep();
      case "iframe-verify":
        return renderOTPStep(); // Show OTP step in background while modal is open
      case "about-you":
        return renderAboutYouStep();
      case "about-brand":
        return renderAboutBrandStep();
      case "message":
        return renderMessageStep();
      case "success":
        return renderSuccessStep();
      default:
        return renderOTPStep();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <Navbar />
      
      <main className="flex-1 flex items-start justify-center px-4 py-8 pt-24 md:pt-8 md:items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              تواصل للإعلانات
            </h1>
            <p className="text-muted-foreground">
              عايز تعلن معانا؟ ابعتلنا طلبك وهنرد عليك
            </p>
          </div>

          {renderStepIndicator()}

          <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-bold">
            {renderCurrentStep()}
          </div>
        </div>
      </main>

      {/* Akedly Verification Iframe Modal */}
      <Dialog open={showIframeModal} onOpenChange={(open) => {
        if (!open) handleCancelVerification();
      }}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2 border-b">
            <DialogTitle className="text-right flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelVerification}
                className="h-8 w-8"
              >
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
            <Button
              variant="outline"
              onClick={handleCancelVerification}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleResendOTP}
              disabled={cooldownSeconds > 0 || isLoading}
              className="flex-1"
            >
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
