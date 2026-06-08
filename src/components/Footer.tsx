import { Mail, Phone, MapPin } from 'lucide-react';

// Social icons — not available in this lucide-react version, using inline SVGs
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const shopLinks = [
  { name: 'Kashmiri Saffron', href: '#products' },
  { name: 'Petal Jams', href: '#products' },
  { name: 'Flower Teas', href: '#products' },
  { name: 'Gift Sets', href: '#products' },
  { name: 'Bulk Orders', href: '#' },
];

const infoLinks = [
  { name: 'About Paidhu', href: '#' },
  { name: 'Our Farmers', href: '#' },
  { name: 'Quality & Certifications', href: '#' },
  { name: 'Blog & Recipes', href: '#' },
  { name: 'Harvest Guide', href: '#' },
];

const policyLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Refund Policy', href: '#' },
  { name: 'Shipping Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-accent-gold via-primary-500 to-primary-700" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-5">
              <img
                src="/logo.png"
                alt="Paidhu's"
                className="h-24 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm font-medium mb-6">
              Hand-harvested Kashmiri saffron and premium floral creations, delivered directly from local Pampore farms. No middlemen. No adulteration. Pure wellness for your family.
            </p>

            {/* Social */}
            <div className="flex space-x-3">
              <a href="#" aria-label="Instagram" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/8 text-white/60 hover:text-white transition-all">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/8 text-white/60 hover:text-white transition-all">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/8 text-white/60 hover:text-white transition-all">
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/55 hover:text-white font-medium transition-colors hover:translate-x-0.5 inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/55 hover:text-white font-medium transition-colors hover:translate-x-0.5 inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@paidhus.com" className="flex items-start gap-3 text-sm text-white/55 hover:text-white transition-colors group">
                  <Mail className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="font-medium">support@paidhus.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+918008001234" className="flex items-start gap-3 text-sm text-white/55 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="font-medium">+91 800 800 1234</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/55">
                  <MapPin className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Pampore, Kashmir, India — 192121</span>
                </div>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="mt-6">
              <p className="text-xs text-white/40 font-semibold mb-2 uppercase tracking-wider">Get Harvest Alerts</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/8 border border-white/10 rounded-l-xl text-xs text-white placeholder-white/30 outline-none focus:border-accent-gold/50"
                />
                <button className="px-3 py-2 bg-accent-gold hover:bg-amber-500 text-primary-950 text-xs font-bold rounded-r-xl transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35 font-medium">
            © {new Date().getFullYear()} Paidhu Ethical Foods Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {policyLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xs text-white/35 hover:text-white/70 font-medium transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/35 font-medium">
            <span className="text-accent-gold">🌿</span>
            Grown with love in Kashmir
          </div>
        </div>
      </div>
    </footer>
  );
}
