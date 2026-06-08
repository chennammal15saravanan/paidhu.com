import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface AuthPageProps {
  initialMode: 'signin' | 'signup';
  onBackToHome: () => void;
}

export default function AuthPage({ initialMode, onBackToHome }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${mode === 'signin' ? 'Signing in' : 'Signing up'} with email: ${email}`);
    onBackToHome();
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full min-h-screen bg-dark-bg flex flex-col lg:flex-row overflow-hidden font-sans antialiased text-primary-900">
      
      {/* LEFT COLUMN: Clean, minimalist, premium Slurp Form-style Auth Form */}
      <div className="w-full lg:w-[45%] bg-[#fbf9f4] p-8 lg:p-16 flex flex-col justify-between overflow-y-auto relative">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-sm font-bold text-primary-700/60 hover:text-primary-500 transition-colors cursor-pointer group mb-8 self-start"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-8">
          
          {/* Brand Logo */}
          <div className="mb-8 flex items-center justify-center">
            <img src="/logo.png" alt="Paidhu Logo" className="h-28 w-auto object-contain" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary-900">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-primary-700/60 font-semibold mt-2">
              {mode === 'signin' 
                ? 'Sign in to access your premium saffron orders and culinary trace reports.' 
                : 'Register for premium direct-trade saffron access and exclusive benefits.'}
            </p>
          </div>

          {/* Google SSO Button */}
          <button className="w-full flex items-center justify-center space-x-3 py-3.5 bg-white border border-primary-500/10 hover:border-primary-500/20 rounded-2xl font-bold text-sm shadow-sm transition-all hover:bg-primary-50/50 mb-6 cursor-pointer">
            <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="text-primary-900">Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-500/10"></div>
            </div>
            <span className="relative px-3 bg-[#fbf9f4] text-xs font-bold text-primary-700/40 uppercase tracking-wider">Or credentials</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-700/80 tracking-wide block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-primary-700/40" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-primary-500/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-2xl text-primary-900 placeholder-primary-700/35 text-sm font-semibold outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary-700/80 tracking-wide block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-primary-700/40" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-primary-500/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-2xl text-primary-900 placeholder-primary-700/35 text-sm font-semibold outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-primary-700/80 tracking-wide">Password</label>
                {mode === 'signin' && (
                  <a href="#" className="text-xs font-bold text-primary-500 hover:underline">Forgot Password?</a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-primary-700/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-primary-500/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-2xl text-primary-900 placeholder-primary-700/35 text-sm font-semibold outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="glow-btn w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary-500/15 hover:shadow-primary-500/25 transition-all duration-300 mt-6 cursor-pointer"
            >
              <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center text-sm font-semibold text-primary-700/60">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-bold text-primary-500 hover:underline cursor-pointer"
            >
              {mode === 'signin' ? 'Create one for free' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-xs font-semibold text-primary-700/40 mt-8 text-center lg:text-left">
          © {new Date().getFullYear()} Paidhu Ethical Foods Pvt Ltd. All rights reserved.
        </p>
      </div>

      {/* RIGHT COLUMN: Interactive Dashboard/Forms Mockup Presentation */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-900 overflow-hidden px-12">
        
        {/* Dynamic decorative circles */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

        {/* Visual Showcase Interface cards mock */}
        <div className="relative w-full max-w-lg z-10 flex flex-col space-y-6">
          
          {/* Card 1: Interactive product selector (mimics Slurp Form interface) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold">Premium Order Selection</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Saffron Pack custom configuration</h4>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold border border-[#d4af37]/30">Grade I Mongra</span>
            </div>

            {/* Slider Mock */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-white/70 mb-1.5">
                  <span>Selected Filaments Weight</span>
                  <span>5.0 Grams</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full relative overflow-hidden">
                  <div className="bg-[#d4af37] h-full w-[65%]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-xs text-white/40 block">Crocin</span>
                  <span className="text-sm font-bold text-white">245+</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-xs text-white/40 block">Safranal</span>
                  <span className="text-sm font-bold text-white">100% Nat</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-xs text-white/40 block">Purity</span>
                  <span className="text-sm font-bold text-white">Grade A+</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Checkout Telemetry Live Feed Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-white">Ethical Saffron Traceability Feed</h4>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-3 font-mono text-[11px] text-white/60">
              <div className="flex justify-between p-2 rounded bg-white/5 border-l-2 border-[#d4af37]">
                <span>batch_kashmiri_mongra_082A</span>
                <span className="text-[#d4af37] font-bold">PASSED LAB OK</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-white/5 border-l-2 border-[#d4af37]">
                <span>origin_pampore_direct_sourcing</span>
                <span className="text-white font-bold">100% TRACEABLE</span>
              </div>
            </div>
          </motion.div>

          {/* Saffron tag outline */}
          <p className="text-sm font-semibold text-white/50 text-center max-w-sm mx-auto leading-relaxed">
            Nature’s most luxurious harvest, certified directly from growers in Kashmir. Experience flavor and aroma without compromise.
          </p>
        </div>
      </div>
    </div>
  );
}
