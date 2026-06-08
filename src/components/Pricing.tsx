import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Taster Collection',
    description: 'A perfect introduction to our hand-picked Kashmiri Mongra saffron threads.',
    oneTimePrice: 25,
    subscriptionPrice: 20,
    features: [
      '1 Gram Premium Mongra Saffron',
      'Grade I Lab certified purity',
      'Hermetically sealed glass vial',
      'Standard shipping',
      'Recipe booklet inclusion'
    ],
    cta: 'Order Taster Pack',
    popular: false,
    color: 'from-gray-500 to-gray-700'
  },
  {
    name: 'Epicurean Box',
    description: 'Our signature collection. Perfect for passionate home chefs and daily wellness.',
    oneTimePrice: 65,
    subscriptionPrice: 52,
    features: [
      '3 Grams Super Negin Saffron',
      '1 Artisanal Petal Jam (Rose)',
      'Free wooden spoon accessory',
      'Complimentary express shipping',
      'Certified 240+ Crocin score',
      'Priority harvest allocation'
    ],
    cta: 'Order Epicurean Box',
    popular: true,
    color: 'from-primary-500 to-primary-700'
  },
  {
    name: 'Connoisseur Vault',
    description: 'Designed for high-end restaurants, luxury hotels, and luxury corporate gifts.',
    oneTimePrice: 160,
    subscriptionPrice: 128,
    features: [
      '5 Grams Pampore Mongra Saffron',
      '5 Grams Super Negin Filaments',
      '2 Artisanal Petal Jams (Assorted)',
      'Luxury engraved wooden gift case',
      'Lifetime custom recipe access',
      'Batch certification papers'
    ],
    cta: 'Order Connoisseur Vault',
    popular: false,
    color: 'from-primary-600 to-primary-700'
  }
];

export default function Pricing() {
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-dark-bg">
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-primary-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-primary-500 tracking-wider uppercase bg-primary-500/10 px-4 py-1.5 rounded-full">
            Curated Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-primary-900 leading-tight">
            Exquisite packages for every culinary enthusiast
          </h2>
          <p className="text-primary-700/80 text-lg">
            Select standard one-time delivery, or choose our harvest subscription to save 20% on monthly supplies.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center mt-10">
            <div className="bg-white/80 border border-primary-500/10 p-1 rounded-full flex items-center space-x-1 shadow-sm">
              <button
                onClick={() => setPurchaseType('one-time')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  purchaseType === 'one-time'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-primary-700/60 hover:text-primary-500'
                }`}
              >
                One-Time Purchase
              </button>
              <button
                onClick={() => setPurchaseType('subscription')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  purchaseType === 'subscription'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-primary-700/60 hover:text-primary-500'
                }`}
              >
                Subscribe & Save 20%
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-primary-50/80 to-white border-2 border-primary-500 shadow-2xl shadow-primary-500/10 scale-105 z-10'
                  : 'bg-white/40 hover:bg-white/80 border border-primary-500/10 hover:border-primary-500/20'
              }`}
            >
              {/* Popular Tag */}
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-md">
                  Most Popular
                </span>
              )}

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">{pkg.name}</h3>
                <p className="text-primary-700/60 text-sm leading-relaxed mb-6 font-semibold">{pkg.description}</p>
                
                {/* Price */}
                <div className="mb-8 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold text-primary-900">
                    ${purchaseType === 'one-time' ? pkg.oneTimePrice : pkg.subscriptionPrice}
                  </span>
                  <span className="text-primary-700/60 text-sm ml-2 font-bold">
                    {purchaseType === 'subscription' ? '/ month' : ''}
                  </span>
                </div>

                <hr className="border-primary-500/10 mb-8" />

                {/* Features List */}
                <ul className="space-y-4">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3 text-sm">
                      <div className="p-0.5 bg-primary-500/10 rounded-full mt-0.5">
                        <Check className="h-4 w-4 text-primary-500" />
                      </div>
                      <span className="text-primary-700/80 leading-normal font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full mt-8 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-primary-500 to-primary-700 hover:opacity-95 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-white hover:bg-white/80 text-primary-700 border border-primary-500/15'
                }`}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
