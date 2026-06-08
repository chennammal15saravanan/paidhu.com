import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Paidhu's Saffron has a coloring strength and depth of aroma I've rarely encountered outside Kashmiri organic reserves. It elevates our risottos and desserts to true Michelin standards.",
    author: "Chef Sarah Jenkins",
    role: "Michelin Star Culinary Director, CloudScale Bistro",
    rating: 5,
    avatar: "SJ"
  },
  {
    quote: "I am amazed by the trace batch reports. Being able to see the Crocin test results online gives me complete confidence that I am serving authentic Pampore saffron to my guests.",
    author: "Liam Zhao",
    role: "Gourmet Connoisseur & Food Blogger",
    rating: 5,
    avatar: "LZ"
  },
  {
    quote: "The Kashmiri Mongra threads are incredibly crimson with absolutely no yellow waste. Paidhu delivers the cleanest, most flavorful petals I have used in my wellness tea blends.",
    author: "Elena Rostova",
    role: "Founder, Bloom & Blend Botanicals",
    rating: 5,
    avatar: "ER"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-dark-bg">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary-500 tracking-wider uppercase bg-primary-500/10 px-4 py-1.5 rounded-full">
            Customer Love
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-primary-900">
            Trusted by master chefs and culinary artists
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative glass-panel rounded-3xl p-8 md:p-14 border border-primary-500/10 shadow-2xl max-w-4xl mx-auto">
          {/* Quote Icon Decoration */}
          <div className="absolute top-8 left-8 text-primary-500/5 pointer-events-none">
            <Quote className="h-20 w-20 transform -scale-x-100" />
          </div>

          <div className="relative min-h-[200px] flex flex-col justify-between z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-primary-500" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-lg md:text-2xl text-primary-900 font-semibold leading-relaxed italic">
                  "{testimonials[activeIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-500 to-primary-700 flex items-center justify-center font-extrabold text-white text-sm shadow-md">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-primary-900">
                      {testimonials[activeIndex].author}
                    </h4>
                    <p className="text-xs text-primary-700/60 font-semibold">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-end space-x-4 mt-8 md:mt-0">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/60 border border-primary-500/10 hover:border-primary-500/20 text-primary-700 hover:text-primary-500 transition-all hover:bg-white/90 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/60 border border-primary-500/10 hover:border-primary-500/20 text-primary-700 hover:text-primary-500 transition-all hover:bg-white/90 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-8 bg-primary-500' : 'w-2 bg-primary-500/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
