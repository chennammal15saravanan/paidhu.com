import { motion } from 'framer-motion';
import { Check, ShieldAlert, Zap, Globe, Sparkles } from 'lucide-react';

const valueProps = [
  {
    icon: Zap,
    title: 'Grade I ISO 3632 Certified',
    desc: 'Each batch is rigorously tested in independent labs to verify color concentration and flavor compounds.'
  },
  {
    icon: ShieldAlert,
    title: 'No Additives or Moisture',
    desc: 'Carefully cured to perfect moisture levels (<12%) to maximize shelf life and natural safranal retention.'
  },
  {
    icon: Globe,
    title: 'Direct-from-Farmer Sourcing',
    desc: 'Harvested directly from local Pampore farmers in Kashmir, guaranteeing fair compensation and freshness.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.15 }}
            className="relative"
          >
            {/* Visual background decorations */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-primary-700/10 rounded-3xl blur-2xl -z-10" />

            {/* Overlapping Glassmorphism Cards Mockup */}
            <div className="space-y-6">
              {/* Card 1: Batch Success */}
              <div className="glass-panel p-6 rounded-2xl border border-primary-500/10 shadow-xl max-w-md ml-auto relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-500/15 rounded-xl">
                      <Check className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-900">Quality Assured</h4>
                      <p className="text-xs text-primary-700/60 font-semibold">Batch #MONGRA-082A</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary-600">100% Purity</span>
                </div>
                <div className="w-full bg-white/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-700 h-full w-full" />
                </div>
              </div>

              {/* Card 2: Interactive Product Selection */}
              <div className="glass-panel p-8 rounded-3xl border border-primary-500/10 shadow-2xl max-w-lg relative z-20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-primary-900">Select Saffron Weight</h3>
                  <Sparkles className="h-5 w-5 text-primary-500" />
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/70 border border-primary-500/10 flex items-center justify-between cursor-pointer hover:bg-white/90 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center font-bold text-xs text-primary-700">1G</div>
                      <span className="text-sm font-semibold text-primary-800">1 Gram (Culinary Sample)</span>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-primary-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/30 border border-primary-500/5 flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-700/10 flex items-center justify-center font-bold text-xs text-primary-700">2G</div>
                      <span className="text-sm font-semibold text-primary-700/80">2 Grams (Recommended)</span>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-primary-700/30" />
                  </div>

                  <div className="p-4 rounded-xl bg-white/30 border border-primary-500/5 flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center font-bold text-xs text-primary-700">5G</div>
                      <span className="text-sm font-semibold text-primary-700/80">5 Grams (Connoisseur Pack)</span>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-primary-700/30" />
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:opacity-95 transition-opacity">
                  Add to Cart
                </button>
              </div>

              {/* Card 3: Quality Telemetry */}
              <div className="glass-panel p-5 rounded-2xl border border-primary-500/10 shadow-xl max-w-xs relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-500/15 rounded-xl">
                    <Globe className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-xs text-primary-700/60 font-bold">Origin Sourced</h4>
                    <p className="text-sm font-bold text-primary-900">Harvested in Pampore, Kashmir</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.15 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm font-bold text-primary-500 tracking-wider uppercase bg-primary-500/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Harvest Integrity
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-900 leading-tight">
              Saffron hand-sorted with absolute care & passion
            </h2>
            <p className="text-primary-700/80 text-lg mb-10 leading-relaxed">
              Paidhu removes the middlemen in premium food distribution. By partnering directly with farmers, we verify that only the highest grade crocin threads reach your cooking, keeping quality raw and unadulterated.
            </p>

            {/* Bullet Points with Glassmorphic effects */}
            <div className="space-y-6">
              {valueProps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="p-2 rounded-xl bg-white/60 border border-primary-500/10 mt-1">
                      <Icon className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-900 mb-1">{item.title}</h4>
                      <p className="text-primary-700/70 text-sm leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
