import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabase';

interface BannerItem {
  webImage: string;
  mobileImage: string | null;
  size: string;
}

export default function Hero() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('Banner')
          .select('*')
          .eq('isActive', true)
          .in('pageSlug', ['landing', 'home'])
          .order('id', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          const resolvedBanners = data.map(activeBanner => {
            let webUrl = activeBanner.webImage;
            let mobileUrl = activeBanner.mobileImage;

            // Resolve public storage URLs from the 'banner' bucket
            if (webUrl && !webUrl.startsWith('http') && !webUrl.startsWith('/')) {
              const { data: res } = supabase!.storage.from('banner').getPublicUrl(webUrl);
              if (res?.publicUrl) webUrl = res.publicUrl;
            } else if (!webUrl && activeBanner.webImagePath) {
              const { data: res } = supabase!.storage.from('banner').getPublicUrl(activeBanner.webImagePath);
              if (res?.publicUrl) webUrl = res.publicUrl;
            }

            if (mobileUrl && !mobileUrl.startsWith('http') && !mobileUrl.startsWith('/')) {
              const { data: res } = supabase!.storage.from('banner').getPublicUrl(mobileUrl);
              if (res?.publicUrl) mobileUrl = res.publicUrl;
            } else if (!mobileUrl && activeBanner.mobileImagePath) {
              const { data: res } = supabase!.storage.from('banner').getPublicUrl(activeBanner.mobileImagePath);
              if (res?.publicUrl) mobileUrl = res.publicUrl;
            }

            return {
              webImage: webUrl,
              mobileImage: mobileUrl,
              size: activeBanner.size || 'medium',
            };
          });

          setBanners(resolvedBanners);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    }
    fetchBanners();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // Auto-scroll banners every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length, currentIndex]);

  const currentBanner = banners[currentIndex];
  const hasMultipleBanners = banners.length > 1;

  return (
    <section id="home" className="relative bg-[#fdf9f2] pt-6 pb-6 overflow-hidden">

      {/* === Hero Section === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative group">
        {/* Main hero container: Contained banner image with highly rounded corners (100% full view) */}
        <div
          className="w-full relative overflow-hidden transition-all duration-500 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.8rem] shadow-[0_12px_40px_rgba(102,38,84,0.06)] border border-[#f0e8d8] bg-[#fbfbf8]"
        >
          {banners.length > 0 ? (
            <div className="relative w-full h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full h-auto"
                >
                  <picture className="w-full">
                    {currentBanner.mobileImage && (
                      <source media="(max-width: 640px)" srcSet={currentBanner.mobileImage} />
                    )}
                    <img
                      src={currentBanner.webImage}
                      alt={`Paidhu's Banner ${currentIndex + 1}`}
                      className="w-full h-auto block"
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>

              {/* Slider Arrows */}
              {hasMultipleBanners && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/80 hover:bg-white text-primary-900 border border-primary-500/10 flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/80 hover:bg-white text-primary-900 border border-primary-500/10 flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {banners.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          currentIndex === idx ? 'w-6 bg-primary-500' : 'w-2 bg-white/60 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Fallback static banner image if no DB banners exist */
            <picture className="w-full">
              <img
                src="/hero-banner.png"
                alt="Paidhu's Banner"
                className="w-full h-auto block"
              />
            </picture>
          )}
        </div>
      </div>
    </section>
  );
}
