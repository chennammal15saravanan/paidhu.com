import { motion } from 'framer-motion';
import {
  ArrowRight, ShoppingBag, Gift, Package,
  Percent, Sparkles, Phone, Truck,
  Star, Award, Crown, Leaf, Zap, Users,
} from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="py-20 bg-[#fdf9f2] relative overflow-hidden">

      {/* ── ambient blobs ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[350px] bg-accent-gold/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* ── section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-200 px-4 py-1.5 rounded-full mb-4">
            <Zap className="h-3.5 w-3.5" /> Take Action
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-primary-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Everything You Need, Right Here
          </h2>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            LAYOUT A — Hero Banner (full width, dark)
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-[2rem] overflow-hidden mb-5"
          style={{ background: 'linear-gradient(130deg,#2b0d1e 0%,#662654 50%,#8b3a72 100%)' }}
        >
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-10 md:px-16 py-14">
            {/* text */}
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <Crown className="h-3.5 w-3.5 text-accent-gold" /> Premium Natural Products
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Pure Paidhu — <span className="text-accent-gold">From Farm to Your Table</span>
              </h3>
              <p className="text-white/65 text-base font-medium leading-relaxed">
                Lab-certified saffron, artisan petal jams, bloom powders & flower teas. No blends. No shortcuts. 100% nature.
              </p>
            </div>
            {/* buttons */}
            <div className="flex flex-col gap-3 w-full md:w-56 flex-shrink-0">
              <a href="#products"
                className="group flex items-center justify-center gap-2 bg-accent-gold hover:bg-yellow-400 text-primary-950 font-black text-sm px-7 py-4 rounded-full shadow-lg shadow-accent-gold/25 transition-all">
                <ShoppingBag className="h-4 w-4" />
                Shop Collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-full transition-all">
                <Leaf className="h-4 w-4" /> Our Story
              </a>
              <a href="#footer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-full transition-all">
                <Phone className="h-4 w-4" /> Contact Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            LAYOUT B — 3 cards (Offer · Gift · Bulk)
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

          {/* B1 — 10% Off (gold) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6, transition: { duration: 0.18 } }}
            className="relative rounded-[1.6rem] overflow-hidden p-7 flex flex-col gap-4 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#f4be37 0%,#fae48e 100%)' }}
          >
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/20 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-2xl bg-primary-900/10 flex items-center justify-center">
                <Percent className="h-6 w-6 text-primary-900" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-primary-900/12 text-primary-900 px-3 py-1 rounded-full">
                Limited Offer
              </span>
            </div>
            <div>
              <p className="text-6xl font-black text-primary-900 leading-none">10%</p>
              <p className="text-xl font-black text-primary-800 mt-0.5">Off First Order</p>
              <p className="text-primary-800/65 text-sm font-semibold mt-2 leading-relaxed">
                Use code <strong className="bg-primary-900/12 px-2 py-0.5 rounded-md font-black">PAIDHU10</strong> at checkout.<br />
                Free shipping above ₹999.
              </p>
            </div>
            <a href="#products"
              className="group self-start mt-auto inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-black text-sm px-6 py-3 rounded-full shadow-md transition-all">
              Claim Offer <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* B2 — Gift Box (white card) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.18 } }}
            className="relative rounded-[1.6rem] overflow-hidden p-7 flex flex-col gap-4 bg-white border border-gray-100 shadow-sm cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#b86b50,#d4875e)' }}>
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#b86b50] border border-[#b86b50]/25 bg-[#b86b50]/6 px-3 py-1 rounded-full">
                Gift Ready
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-primary-900 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Luxury Gift Boxes
              </h3>
              <p className="text-primary-700/60 text-sm font-medium mt-2 leading-relaxed">
                Hand-packed premium gift sets for weddings, Diwali & corporate. Custom branding available.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Weddings', 'Festivals', 'Corporate', 'Birthdays'].map(t => (
                <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#b86b50]/25 text-[#b86b50]">{t}</span>
              ))}
            </div>
            <a href="#products"
              className="group self-start mt-auto inline-flex items-center gap-2 text-white font-black text-sm px-6 py-3 rounded-full shadow-md transition-all"
              style={{ background: 'linear-gradient(135deg,#b86b50,#c97a5e)' }}>
              Explore Sets <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* B3 — Bulk Orders (green) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.18 } }}
            className="relative rounded-[1.6rem] overflow-hidden p-7 flex flex-col gap-4 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#143d28 0%,#2d8a5a 100%)' }}
          >
            <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/6 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/12 text-white/80 px-3 py-1 rounded-full">
                B2B / Wholesale
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Bulk & Corporate Orders
              </h3>
              <p className="text-white/60 text-sm font-medium mt-2 leading-relaxed">
                Volume pricing, custom packaging & dedicated account manager for wholesale enquiries.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['MOQ: 50 Units', 'Custom Branding', 'PAN India'].map(t => (
                <span key={t} className="text-[10px] font-bold bg-white/12 text-white/75 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <a href="#footer"
              className="group self-start mt-auto inline-flex items-center gap-2 bg-white text-[#2d8a5a] hover:bg-white/90 font-black text-sm px-6 py-3 rounded-full shadow-md transition-all">
              Get Quote <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            LAYOUT C — Wide 2-col (Flash Sale left · Refer right)
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">

          {/* C1 — Flash Sale (wider) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="md:col-span-3 relative rounded-[1.6rem] overflow-hidden p-8 flex flex-col sm:flex-row items-center gap-7 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#7b1a00,#c8930a,#f4be37)' }}
          >
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
            {/* big number */}
            <div className="relative z-10 text-center flex-shrink-0">
              <p className="text-8xl font-black text-white leading-none drop-shadow-lg">30%</p>
              <p className="text-lg font-black text-white/90 -mt-1">OFF</p>
            </div>
            <div className="relative z-10 flex-1">
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                <Zap className="h-3 w-3" /> Flash Sale — Ends Tonight
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Up to 30% Off Selected Petal Products
              </h3>
              <p className="text-white/70 text-sm font-medium leading-relaxed mb-4">
                Petal jams, bloom powders & medley teas — limited stock. Don't miss it!
              </p>
              <a href="#products"
                className="group inline-flex items-center gap-2 bg-white text-primary-900 hover:bg-white/90 font-black text-sm px-6 py-3 rounded-full shadow-lg transition-all">
                Shop Sale <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* C2 — Refer & Earn (narrower) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="md:col-span-2 relative rounded-[1.6rem] overflow-hidden p-7 flex flex-col gap-4 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#3a0d52,#7b2d8b,#a048bb)' }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/6 pointer-events-none" />
            <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/55 mb-1">Loyalty Rewards</p>
              <h3 className="text-2xl font-black text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Refer & Earn<br /><span className="text-accent-gold">₹100</span> Credit
              </h3>
              <p className="text-white/60 text-sm font-medium mt-2 leading-relaxed">
                Share Paidhu with friends. Earn ₹100 wallet credit for every referral. No limits!
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              <a href="#footer"
                className="group flex items-center justify-center gap-2 bg-white text-[#7b2d8b] hover:bg-white/90 font-black text-sm py-3 rounded-full shadow-md transition-all">
                <Users className="h-4 w-4" /> Refer Now
              </a>
              <a href="#footer"
                className="flex items-center justify-center gap-2 bg-white/12 hover:bg-white/20 border border-white/15 text-white font-bold text-sm py-2.5 rounded-full transition-all">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            LAYOUT D — 4 slim horizontal action rows
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {[
            { icon: Star,    color: '#662654', bg: '#66265412', title: 'Subscribe & Save 15%',    desc: 'Monthly auto-delivery at discounted rates',         btn: 'Subscribe', href: '#products' },
            { icon: Award,   color: '#2d8a5a', bg: '#2d8a5a12', title: 'Become a Paidhu Partner', desc: 'Reseller & affiliate programme — earn commissions',  btn: 'Apply Now',  href: '#footer'   },
            { icon: Phone,   color: '#c8930a', bg: '#c8930a12', title: 'Chat with Our Expert',    desc: 'Personalised product recommendations in minutes',    btn: 'Chat Now',   href: '#footer'   },
            { icon: Truck,   color: '#b86b50', bg: '#b86b5012', title: 'Free Shipping Above ₹999', desc: 'Pan-India delivery — eco-friendly packaging',        btn: 'Shop Now',   href: '#products' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                whileHover={{ x: 5, transition: { duration: 0.15 } }}
                className="group flex items-center gap-4 bg-white hover:bg-[#fdf6ee] border border-gray-100 hover:border-gray-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-11 w-11 flex-shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: item.bg }}>
                  <Icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-primary-900 leading-tight">{item.title}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate">{item.desc}</p>
                </div>
                <span className="flex-shrink-0 inline-flex items-center gap-1 font-black text-xs text-white px-4 py-2 rounded-full shadow-sm group-hover:shadow-md transition-all"
                  style={{ background: item.color }}>
                  {item.btn} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════
            LAYOUT E — Trust badges strip
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck,  label: 'Free Shipping',  sub: 'On orders above ₹999' },
              { icon: Star,   label: '100% Natural',   sub: 'No preservatives added' },
              { icon: Award,  label: 'Lab Certified',  sub: 'ISO 3632 Grade I' },
              { icon: Phone,  label: '24/7 Support',   sub: 'Always here for you' },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary-900">{badge.label}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
