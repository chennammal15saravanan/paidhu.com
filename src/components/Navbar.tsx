import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '#products' },
    { name: 'Deal of the Day', href: '#products' },
    {
      name: 'Shop by Category',
      href: '#products',
      children: ['Saffron', 'Petal Jams', 'Flower Teas', 'Wellness Blends']
    },
    { name: 'Mille- For your Family', href: '#products' },
    { name: 'Starting Solids Guide', href: '#about' },
    { name: 'BYOC', href: '#products' },
    { name: 'Our Community', href: '#testimonials' },
    { name: 'Our Philosophy', href: '#about' },
    { name: 'Bulk Orders', href: '#footer' },
    { name: 'Blogs', href: '#footer' },
    { name: 'Slurrp Wallet', href: '#products' },
    { name: 'About us', href: '#about' }
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-primary-900 text-white text-center text-[11px] font-semibold py-2 px-4 tracking-wide">
        🌸 Free Shipping on Orders Above ₹999 &nbsp;|&nbsp; Use code <span className="font-black text-accent-gold">PAIDHU10</span> for 10% Off
      </div>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-[0_2px_20px_rgba(102,38,84,0.08)]'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        {/* Main Navbar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
          
          {/* Top Row: Left Search (Desktop) / Hamburger (Mobile), Center Logo, Right Icons */}
          <div className="flex items-center justify-between h-20 md:h-28 relative w-full">
            
            {/* Left Column: Desktop Search or Mobile Hamburger */}
            <div className="flex items-center justify-start w-1/3">
              {/* Mobile hamburger menu (visible on screens smaller than lg) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-primary-800 hover:text-primary-500 rounded-full transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              {/* Desktop Search Bar (visible on lg and up) */}
              <div className="hidden lg:flex items-center bg-white rounded-lg border border-gray-300 px-4 py-2 w-64 xl:w-72 focus-within:border-primary-500 transition-colors shadow-sm">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-primary-900 placeholder-gray-400 outline-none w-full pr-2"
                />
                <Search className="h-4 w-4 text-gray-500 flex-shrink-0 cursor-pointer" />
              </div>
            </div>

            {/* Centered Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <a href="#home" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Paidhu's Logo"
                  className="h-16 md:h-24 w-auto object-contain py-1 hover:scale-102 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Right Column: Icons (Profile and Cart) */}
            <div className="flex items-center justify-end space-x-2 w-1/3">
              {/* Profile */}
              <button
                onClick={() => onOpenAuth('signin')}
                className="p-2 text-primary-800 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all"
                aria-label="Sign in"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 text-primary-800 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-primary-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>

          </div>

          {/* Bottom Row: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center border-t border-primary-500/5 py-3 w-full">
            {/* Main Navigation Links Row */}
            <div className="flex items-center justify-center flex-nowrap gap-x-1 xl:gap-x-2.5 w-full">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group flex-shrink-0">
                  <a
                    href={link.href}
                    className="flex items-center gap-0.5 px-2 xl:px-3 py-1.5 text-[11px] xl:text-[12.5px] font-semibold text-gray-800 hover:text-primary-500 transition-colors rounded-lg whitespace-nowrap"
                  >
                    {link.name}
                    {link.children && <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />}
                  </a>
                  {link.children && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-primary-500/10 py-2 min-w-[180px]">
                        {link.children.map((child) => (
                          <a
                            key={child}
                            href={link.href}
                            className="block px-5 py-2.5 text-[13px] font-semibold text-primary-800 hover:text-primary-500 hover:bg-primary-50 transition-colors text-center"
                          >
                            {child}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[calc(35px+80px)] z-40 bg-white border-b border-primary-500/10 shadow-xl overflow-hidden lg:hidden"
          >
            <div className="p-5 space-y-4">
              {/* Mobile search */}
              <div className="flex items-center bg-white rounded-lg px-4 py-2.5 space-x-2 border border-gray-300 shadow-sm">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-primary-900 placeholder-gray-400 outline-none flex-1"
                />
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              {/* Nav links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-bold text-primary-900 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              {/* Mobile category pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Mongra Saffron', 'Negin Saffron', 'Rose Jam', 'Petal Tea'].map((cat) => (
                  <a key={cat} href="#products" onClick={() => setIsMobileMenuOpen(false)} className="category-pill text-[11px]">
                    {cat}
                  </a>
                ))}
              </div>
              {/* Auth buttons */}
              <div className="flex space-x-3 pt-2 border-t border-primary-500/8">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenAuth('signin'); }}
                  className="flex-1 py-2.5 text-sm font-bold text-primary-700 border border-primary-500/20 rounded-full hover:bg-primary-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenAuth('signup'); }}
                  className="flex-1 py-2.5 text-sm font-bold bg-primary-500 text-white rounded-full hover:bg-primary-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
