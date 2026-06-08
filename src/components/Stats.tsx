import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'Threads Hand-Sorted', value: 8.4, suffix: 'M+', decimals: 1, prefix: '' },
  { label: 'ISO Color Concentration', value: 248.5, suffix: '', decimals: 1, prefix: '' },
  { label: 'Ethical Farmers Partnered', value: 120, suffix: '+', decimals: 0, prefix: '' },
  { label: 'Verified Purity Rate', value: 100.0, suffix: '%', decimals: 1, prefix: '' }
];

function Counter({ value, suffix, decimals, prefix }: { value: number; suffix: string; decimals: number; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const end = value;
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentVal = start + (end - start) * (progress * (2 - progress));
      
      setCount(currentVal);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-900 tracking-tight">
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-[#fdf9f2] border-y border-primary-500/8 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2"
            >
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                prefix={stat.prefix}
              />
              <span className="text-sm font-semibold text-primary-700/60 tracking-wide uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
