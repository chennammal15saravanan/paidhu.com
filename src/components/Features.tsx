import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Saffron',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=center',
    accent: '#c8930a',
  },
  {
    name: 'Combo',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop&crop=center',
    accent: '#e64a19',
  },
  {
    name: 'Bloom Powder',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&crop=center',
    accent: '#c2185b',
  },
  {
    name: 'Gift Box',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop&crop=center',
    accent: '#b86b50',
  },
  {
    name: 'Petal Jam',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&crop=center',
    accent: '#662654',
  },
  {
    name: 'Brew Flora',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&crop=center',
    accent: '#2d8a5a',
  },
  {
    name: 'Bloom Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop&crop=center',
    accent: '#a0522d',
  },
  {
    name: 'Medley Teas',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&crop=center',
    accent: '#7b2d8b',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-[#fdf9f2] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* Section Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-200 px-4 py-1.5 rounded-full mb-3">
            Shop by Category
          </span>
          <h2
            className="text-2xl md:text-3xl font-black text-primary-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Explore Paidhu's Collections
          </h2>
        </motion.div>

        {/* Centered Category Circles */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
          {categories.map((cat, idx) => (
            <motion.a
              key={cat.name}
              href="#products"
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              whileHover={{ y: -7, transition: { duration: 0.18 } }}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* Accent gradient ring */}
              <div
                className="rounded-full p-[3.5px] shadow-md group-hover:shadow-xl transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent}66)`,
                }}
              >
                {/* White spacer ring */}
                <div className="rounded-full p-[3px] bg-white">
                  {/* Circle image */}
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{ width: '96px', height: '96px' }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo.png';
                      }}
                    />
                    {/* Hover colour tint */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-full"
                      style={{ background: cat.accent }}
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <p className="mt-2.5 text-center text-[12.5px] font-bold text-primary-900 group-hover:text-primary-500 transition-colors leading-tight max-w-[96px]">
                {cat.name}
              </p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
