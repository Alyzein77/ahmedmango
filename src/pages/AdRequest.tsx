import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
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
  ExternalLink
} from "lucide-react";

type Step = "otp" | "otp-verify" | "about-you" | "about-brand" | "message" | "success";

const AdRequest = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("otp");
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP state
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    brandTitle: "",
    brandName: "",
    brandLink: "",
    message: "",
  });

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove any non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // If starts with 0, replace with +20 (Egypt)
    if (cleaned.startsWith('0')) {
      cleaned = '+20' + cleaned.substring(1);
    }
    // If doesn't start with +, assume Egypt
    else if (!cleaned.startsWith('+')) {
      cleaned = '+20' + cleaned;
    }
    
    return cleaned;
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
      const response = await supabase.functions.invoke('akedly-otp', {
        body: { action: 'send', phone: formattedPhone },
      });

      const backendError = response.data?.error;
      const backendCode = response.data?.code;

      if (response.error || !response.data?.success) {
        const message =
          backendCode === 'USER_NOT_FOUND'
            ? 'الرقم ده مش متسجل عند خدمة التحقق. جرّب رقم تاني أو تواصل معانا.'
            : backendError || response.error?.message || 'جرب تاني';
        throw new Error(message);
      }

      setTransactionId(response.data.transactionId);
      setRequestId(response.data.requestId);
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
      setCurrentStep("otp-verify");
      toast({
        title: "تم إرسال الكود",
        description: "افتح واتساب عشان تاخد الكود",
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

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      toast({
        title: "الكود غلط",
        description: "لازم تكتب 6 أرقام",
        variant: "destructive",
      });
      return;
    }

    if (!transactionId) {
      toast({
        title: "حصل مشكلة",
        description: "جرب تبعت الكود تاني",
        variant: "destructive",
      });
      setCurrentStep("otp");
      return;
    }

    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('akedly-otp', {
        body: { action: 'verify', code: otpCode, transactionId, requestId },
      });

      const backendError = response.data?.error;

      if (response.error || !response.data?.verified) {
        throw new Error(backendError || response.error?.message || 'Invalid OTP');
      }

      setCurrentStep("about-you");
      toast({
        title: "تم التأكيد",
        description: "كمّل بياناتك دلوقتي",
      });
    } catch (error: any) {
      toast({
        title: "الكود غلط",
        description: error.message || "جرب تكتب الكود تاني",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    if (step === "otp" || step === "otp-verify") return 0;
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
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin ml-2" />
          ) : (
            <MessageCircle className="w-4 h-4 ml-2" />
          )}
          ابعتلي الكود على واتساب
        </Button>
      </div>
    </div>
  );

  const renderOTPVerifyStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">اكتب الكود</h2>
        <p className="text-muted-foreground mb-2">
          بعتنالك كود على {phone}
        </p>
        <div className="inline-flex items-center gap-2 text-green-600 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>تم الإرسال عن طريق واتساب</span>
        </div>
      </div>

      {/* WhatsApp Card */}
      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <MessageCircle className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="font-bold text-foreground mb-2">افتح واتساب علشان تاخد الكود</h3>
        <p className="text-sm text-muted-foreground mb-4">
          شوف الرسايل من Akedly علشان تلاقي الكود المكون من 6 أرقام
        </p>
        <Button 
          asChild
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <a 
            href="https://api.whatsapp.com/send/?phone=201508717690&text&type=phone_number&app_absent=0" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4 ml-2" />
            افتح واتساب
            <ExternalLink className="w-3 h-3 mr-2" />
          </a>
        </Button>
      </div>

      <div>
        <Label className="text-right block mb-2">كود التأكيد</Label>
        <div className="flex justify-center mb-4">
          <InputOTP 
            maxLength={6} 
            value={otpCode}
            onChange={setOtpCode}
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index} 
                  className="w-12 h-14 text-xl border-2 rounded-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleVerifyOTP} 
          className="w-full bg-gradient-to-r from-primary to-accent shadow-bold hover:-translate-y-0.5 transition-transform"
          disabled={isLoading || otpCode.length !== 6}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin ml-2" />
          ) : (
            <CheckCircle2 className="w-4 h-4 ml-2" />
          )}
          تأكيد
        </Button>

        <Button 
          variant="outline"
          onClick={() => {
            setCurrentStep("otp");
            setOtpCode("");
            setTransactionId(null);
            setRequestId(null);
          }}
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          غيّر رقم الموبايل
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
      case "otp-verify":
        return renderOTPVerifyStep();
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
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
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

      <Footer />
    </div>
  );
};

export default AdRequest;
