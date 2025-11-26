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
    <div className={`${backgroundColor} border-2 border-primary/20 rounded-2xl p-4 sm:p-6 my-6 sm:my-8`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto text-center sm:text-right">
          <span className="text-xs text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border">
            برعاية
          </span>
          {sponsorLogo && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-background rounded-xl flex items-center justify-center border-2 border-border">
              <img src={sponsorLogo} alt={sponsorName} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
          )}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">{sponsorName}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{sponsorTagline}</p>
          </div>
        </div>
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};
