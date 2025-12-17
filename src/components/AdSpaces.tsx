import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface AdSpace {
  id: string;
  card_type: string;
  title: string | null;
  tag_text: string | null;
  tag_color: string | null;
  sub_text: string | null;
  image_url: string | null;
  background_color: string | null;
  background_image_url: string | null;
  overlay_image_url: string | null;
  redirect_url: string | null;
  button_text: string | null;
  button_color: string | null;
  button_link: string | null;
  display_order: number | null;
}

export const AdSpaces = () => {
  const [adSpaces, setAdSpaces] = useState<AdSpace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdSpaces = async () => {
      const { data, error } = await supabase
        .from("ad_spaces")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: false });

      if (!error && data) {
        setAdSpaces(data);
      }
      setLoading(false);
    };

    fetchAdSpaces();
  }, []);

  const largeAds = adSpaces.filter((ad) => ad.card_type === "2x");
  const smallAds = adSpaces.filter((ad) => ad.card_type === "1x");

  if (loading) {
    return (
      <section className="py-6 sm:py-8 px-3 sm:px-4 bg-sky relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-muted rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-muted rounded-xl" />
              <div className="h-48 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (adSpaces.length === 0) {
    return null;
  }

  const trackClick = async (adId: string, clickType: "card" | "button") => {
    try {
      await supabase.functions.invoke("track-ad-click", {
        body: { ad_space_id: adId, click_type: clickType },
      });
    } catch (error) {
      console.error("Failed to track ad click:", error);
    }
  };

  const handleAdClick = (ad: AdSpace) => {
    if (ad.redirect_url) {
      trackClick(ad.id, "card");
      window.open(ad.redirect_url, "_blank");
    }
  };

  const handleButtonClick = (e: React.MouseEvent, ad: AdSpace) => {
    e.stopPropagation();
    if (ad.button_link) {
      trackClick(ad.id, "button");
      window.open(ad.button_link, "_blank");
    }
  };

  return (
    <section className="py-6 sm:py-8 px-3 sm:px-4 bg-sky relative overflow-hidden">
      {/* Feastables-style radial burst pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-conic-gradient(from 0deg, hsl(var(--foreground)) 0deg 5deg, transparent 5deg 15deg)`,
        }}
      />
      <div className="container mx-auto max-w-6xl space-y-4 sm:space-y-6">
        {/* Large Ads (2x) */}
        {largeAds.map((ad) => (
          <div
            key={ad.id}
            onClick={() => handleAdClick(ad)}
            className={`relative w-full rounded-xl sm:rounded-2xl overflow-hidden border-4 border-foreground shadow-bold z-10 ${
              ad.redirect_url ? "cursor-pointer hover:shadow-bold-sm transition-all" : ""
            }`}
            style={{
              backgroundColor: ad.background_color || "#FF6B35",
            }}
          >
            {/* Background Image */}
            {ad.background_image_url && !ad.overlay_image_url && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${ad.background_image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}

            {/* Overlay Image (covers everything) */}
            {ad.overlay_image_url ? (
              <div
                className="w-full min-h-[120px] sm:min-h-[160px]"
                style={{
                  backgroundImage: `url(${ad.overlay_image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <>
                {/* Decorative shapes */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-orange/20 rounded-full translate-x-1/2 translate-y-1/2" />
                </div>

                {/* Tag Label */}
                {ad.tag_text && (
                  <div
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 text-foreground text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-lg border-2 border-foreground z-10 uppercase"
                    style={{ backgroundColor: ad.tag_color || "#FFD700" }}
                  >
                    {ad.tag_text}
                  </div>
                )}

                {/* Ad Content */}
                <div className="relative p-4 sm:p-8 md:p-12 flex flex-col items-center text-center gap-4 min-h-[120px] sm:min-h-[160px]">
                  {(ad.title || ad.sub_text) && (
                    <div>
                      {ad.title && (
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-foreground mb-1 sm:mb-2 font-lalezar uppercase">
                          {ad.title}
                        </h3>
                      )}
                      {ad.sub_text && (
                        <p className="text-foreground/80 font-bold text-sm sm:text-base font-tajawal">
                          {ad.sub_text}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Ad Image */}
                  {ad.image_url && (
                    <div
                      className="w-full max-w-[300px] sm:max-w-[400px] h-20 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden"
                      style={{
                        backgroundImage: `url(${ad.image_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}

                  {/* Button */}
                  {ad.button_text && (
                    <Button
                      onClick={(e) => handleButtonClick(e, ad)}
                      className="font-black uppercase text-sm sm:text-base px-6 py-2 rounded-lg border-2 border-foreground shadow-bold hover:shadow-bold-sm transition-all"
                      style={{ backgroundColor: ad.button_color || "#1a1349", color: "#fff" }}
                    >
                      {ad.button_text}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        {/* Small Ads (1x) */}
        {smallAds.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 relative z-10">
            {smallAds.map((ad) => (
              <Card
                key={ad.id}
                onClick={() => handleAdClick(ad)}
                className={`relative overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-bold-sm transition-all ${
                  ad.redirect_url ? "cursor-pointer" : ""
                }`}
                style={{
                  backgroundColor: ad.background_color || "#FF6B35",
                }}
              >
                {/* Background Image */}
                {ad.background_image_url && !ad.overlay_image_url && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${ad.background_image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}

                {/* Overlay Image (covers everything) */}
                {ad.overlay_image_url ? (
                  <div
                    className="w-full min-h-[140px] sm:min-h-[200px]"
                    style={{
                      backgroundImage: `url(${ad.overlay_image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <>
                    {/* Tag Label */}
                    {ad.tag_text && (
                      <div
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 text-foreground text-[9px] sm:text-xs font-black px-2 py-0.5 sm:py-1 rounded-lg border-2 border-foreground z-10 uppercase"
                        style={{ backgroundColor: ad.tag_color || "#FFD700" }}
                      >
                        {ad.tag_text}
                      </div>
                    )}

                    {/* Decorative shapes */}
                    <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 sm:w-16 h-10 sm:h-16 bg-pink/40 rounded-full" />

                    {/* Ad Content */}
                    <div className="relative p-3 sm:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[200px]">
                      {ad.image_url && (
                        <div
                          className="w-full aspect-square max-w-[80px] sm:max-w-[150px] rounded-xl overflow-hidden mb-2 sm:mb-4 border-2 border-foreground"
                          style={{
                            backgroundImage: `url(${ad.image_url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      )}

                      {ad.sub_text && (
                        <p className="text-foreground font-black text-center text-xs sm:text-base uppercase mb-2">
                          {ad.sub_text}
                        </p>
                      )}

                      {/* Button */}
                      {ad.button_text && (
                        <Button
                          onClick={(e) => handleButtonClick(e, ad)}
                          className="font-black uppercase text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-lg border-2 border-foreground shadow-bold-sm hover:shadow-none transition-all mt-2"
                          style={{ backgroundColor: ad.button_color || "#1a1349", color: "#fff" }}
                        >
                          {ad.button_text}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
