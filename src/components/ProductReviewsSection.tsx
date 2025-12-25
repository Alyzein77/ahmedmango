import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

interface ProductReview {
  id: string;
  product_name: string;
  product_image: string | null;
  video_url: string;
  platform: string | null;
  posted_at: string;
  verdict: string | null;
  score: number | null;
}

const platformColors: Record<string, string> = {
  TikTok: 'bg-black text-white',
  YouTube: 'bg-red-600 text-white',
  Instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
};

const verdictConfig: Record<string, { label: string; color: string }> = {
  '2astaka': { label: '٢ستكا', color: 'bg-green-500 text-white' },
  'fastaka': { label: 'فستكا', color: 'bg-red-500 text-white' },
};

export const ProductReviewsSection = () => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .order('posted_at', { ascending: false })
        .limit(15);

      if (!error && data) {
        setReviews(data);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            أحدث المراجعات
          </h2>
          <p className="text-muted-foreground text-lg">
            آخر 15 منتج اتراجعوا… مرتّبين بالأحدث
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                {review.product_image ? (
                  <img
                    src={review.product_image}
                    alt={review.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>

                {/* Platform badge */}
                {review.platform && (
                  <span
                    className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${platformColors[review.platform] || 'bg-gray-600 text-white'}`}
                  >
                    {review.platform}
                  </span>
                )}

                {/* Verdict badge */}
                {review.verdict && verdictConfig[review.verdict] && (
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${verdictConfig[review.verdict].color}`}
                  >
                    {verdictConfig[review.verdict].label}
                  </span>
                )}
              </div>

              {/* Product name */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-foreground text-center line-clamp-2">
                  {review.product_name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
