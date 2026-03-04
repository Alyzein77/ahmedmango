interface SponsorBannerProps {
  sponsorName: string;
  sponsorLogo?: string;
  sponsorTagline: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
}

export const SponsorBanner = ({
  sponsorName,
  sponsorLogo,
  sponsorTagline,
  ctaText,
  ctaLink,
  backgroundColor = "bg-gradient-to-l from-primary/10 to-secondary/10"
}: SponsorBannerProps) => {
  return (
    <div className={`${backgroundColor} border-2 border-primary/20 rounded-2xl p-6 my-8`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border">
            برعاية
          </span>
          {sponsorLogo && (
            <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center border-2 border-border">
              <img src={sponsorLogo} alt={sponsorName} loading="lazy" className="w-12 h-12 object-contain" />
            </div>
          )}
          <div className="text-right">
            <h3 className="text-xl font-bold text-foreground">{sponsorName}</h3>
            <p className="text-sm text-muted-foreground">{sponsorTagline}</p>
          </div>
        </div>
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};
