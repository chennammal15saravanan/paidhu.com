import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Check, Eye, ArrowRight, Leaf, X } from 'lucide-react';
import { supabase } from '../supabase';
import { useCart } from '../context/CartContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Variant {
  size: string;
  price: string;
  stock: string;
  offerPrice?: string;
}

interface NutritionInfo {
  fat?: string;
  carbs?: string;
  protein?: string;
  calories?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  shortDescription?: string;
  ingredients?: string;
  benefits?: string[];
  highlights?: string[];
  nutritionInfo?: NutritionInfo;
  faqData?: { question: string; answer: string }[];
  tags?: string;
  seoTitle?: string;
  seoDescription?: string;
  variants?: Variant[];
  categoryId: number;
  discountPrice?: number | null;
  featured: boolean;
  slug: string;
  status: string;
  image?: string;
  imagePath?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Fallback data (shown when DB is unavailable) ─────────────────────────────

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Kashmiri Mongra Saffron',
    description:
      'Premium grade A+ saffron filaments harvested from the historic Pampore fields of Kashmir. Rich in crocin with a deep crimson hue.',
    price: 350,
    discountPrice: 299,
    stock: 50,
    shortDescription: 'Grade I • 1g Pure Filaments',
    ingredients: '100% Pure Saffron',
    benefits: ['Boosts Immunity', 'Rich in Antioxidants', 'Improves Mood'],
    highlights: ['Lab Certified', 'No Additives', 'Direct from Farm'],
    variants: [
      { size: '1g', price: '350', stock: '50', offerPrice: '299' },
      { size: '2g', price: '650', stock: '30', offerPrice: '560' },
    ],
    tags: 'bestseller, saffron',
    categoryId: 1,
    featured: true,
    slug: 'kashmiri-mongra-saffron',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: 2,
    name: 'Super Negin Saffron',
    description:
      'Longest red filaments hand-picked to deliver unmatched ISO color index. Selected export-quality threads from trusted farm collectives.',
    price: 390,
    discountPrice: 340,
    stock: 35,
    shortDescription: 'Export Grade • 1g Long Filaments',
    ingredients: '100% Pure Saffron',
    benefits: ['Anti-inflammatory', 'Memory Booster', 'Natural Colorant'],
    highlights: ['ISO Certified', 'Export Quality', 'Hand Picked'],
    variants: [{ size: '1g', price: '390', stock: '35', offerPrice: '340' }],
    tags: 'premium, saffron',
    categoryId: 1,
    featured: true,
    slug: 'super-negin-saffron',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1583394293214-0b764e32fc6b?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: 3,
    name: 'Heavenly Saffron Petal Tea',
    description:
      'Soothing blend of premium green tea leaves with sun-dried saffron petals. Rich in antioxidants and naturally caffeine-balanced.',
    price: 180,
    discountPrice: 150,
    stock: 80,
    shortDescription: 'Wellness Blend • 25 Servings',
    ingredients: 'Green Tea, Saffron Petals',
    benefits: ['Calming Effect', 'Rich Antioxidants', 'Caffeine Balanced'],
    highlights: ['25 Servings', 'Natural Blend', 'No Artificial Flavors'],
    variants: [{ size: '50g', price: '180', stock: '80', offerPrice: '150' }],
    tags: 'tea, wellness',
    categoryId: 2,
    featured: true,
    slug: 'saffron-petal-tea',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&crop=center',
  },
];

const categories = [
  'Bestsellers',
  'Pure Saffron',
  'Flower Teas',
  'Petal Jams',
  'Wellness Blends',
  'Gift Sets'
];

const categoryMap: Record<string, number[]> = {
  Bestsellers: [],
  'Pure Saffron': [1],
  'Flower Teas': [2],
  'Petal Jams': [3],
  'Wellness Blends': [4],
  'Gift Sets': [5],
};

// ─── Quick View Modal ─────────────────────────────────────────────────────────

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');
  
  const variant = product.variants?.[selectedVariant];
  const displayPrice = variant?.offerPrice || variant?.price || String(product.discountPrice ?? product.price);
  const originalPrice = variant?.price || String(product.price);
  const hasDiscount = (variant?.offerPrice && variant.offerPrice !== variant.price) || (!variant && product.discountPrice);

  const categoryName = 
    product.categoryId === 1 ? 'Saffron' :
    product.categoryId === 2 ? 'Teas' :
    product.categoryId === 3 ? 'Jams & Spreads' :
    product.categoryId === 4 ? 'Wellness Blends' :
    product.categoryId === 5 ? 'Gift Sets' : 'Products';

  const sizeLabel = product.categoryId === 1 ? 'Grams' : 'Size';

  const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  const increaseQty = () => setQuantity(prev => prev + 1);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#fdf9f2] rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-white text-primary-800 hover:bg-primary-50 border border-gray-200 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 font-semibold">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{categoryName}</span>
            <span>/</span>
            <span className="text-primary-800 font-bold">{product.name}</span>
          </div>

          {/* Main Layout Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            
            {/* Left Column: Image Card */}
            <div className="bg-white rounded-2xl border border-gray-200 aspect-square overflow-hidden flex items-center justify-center p-4 relative shadow-sm">
              <img
                src={product.image || '/logo.png'}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
              />
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col gap-4">
              
              {/* Product Title */}
              <h2 className="text-2xl md:text-3xl font-black text-primary-900 leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-[#662654]">₹{displayPrice}</span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through font-semibold">₹{originalPrice}</span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-primary-700/80 leading-relaxed">
                {product.description}
              </p>

              {/* Size / Grams Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-baseline gap-8">
                    <span className="text-xs font-bold text-gray-700 w-16 uppercase tracking-wider">{sizeLabel}</span>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedVariant(i)}
                          className={`px-4 py-2 text-xs font-extrabold transition-all border rounded-md cursor-pointer ${
                            selectedVariant === i
                              ? 'bg-primary-500 text-white border-primary-500'
                              : 'border-gray-300 text-gray-700 bg-white hover:border-gray-400'
                          }`}
                        >
                          {v.size}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Clear link */}
                  <div className="flex justify-end pr-4 mt-1">
                    <button 
                      onClick={() => setSelectedVariant(0)}
                      className="text-[10px] font-bold text-gray-400 hover:text-primary-500 transition-colors uppercase tracking-wider underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mt-4">
                {/* Quantity Box */}
                <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm h-11">
                  <button
                    onClick={decreaseQty}
                    className="px-3 h-full hover:bg-gray-50 text-gray-500 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-primary-900 w-10 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    className="px-3 h-full hover:bg-gray-50 text-gray-500 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={(variant?.stock === '0') || product.stock === 0}
                  className="bg-[#662654] hover:bg-[#521e43] text-white px-8 py-3 rounded-md font-bold uppercase transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs h-11 flex items-center justify-center cursor-pointer"
                >
                  {(variant?.stock === '0') || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              {/* Wishlist & Share buttons */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#662654] transition-colors cursor-pointer">
                  <Heart className="h-4 w-4" />
                  <span>ADD TO WISHLIST</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#662654] transition-colors cursor-pointer">
                  <span className="text-base font-black">📤</span>
                  <span>SHARE</span>
                </button>
              </div>

              {/* SKU & Category Meta */}
              <div className="text-xs text-gray-500 flex flex-col gap-1 mt-2">
                <div>
                  <span className="font-semibold text-gray-700">SKU:</span> N/A
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category:</span> {categoryName}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Tabs Section */}
          <div className="border-t border-gray-200 pt-6">
            
            {/* Tabs Header */}
            <div className="flex gap-8 border-b border-gray-200 mb-6 pb-0.5 text-sm">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 transition-all cursor-pointer font-bold relative ${
                  activeTab === 'description'
                    ? 'text-primary-900 font-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Description
                {activeTab === 'description' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#662654]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('additional')}
                className={`pb-3 transition-all cursor-pointer font-bold relative ${
                  activeTab === 'additional'
                    ? 'text-primary-900 font-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Additional information
                {activeTab === 'additional' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#662654]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-all cursor-pointer font-bold relative ${
                  activeTab === 'reviews'
                    ? 'text-primary-900 font-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Reviews (0)
                {activeTab === 'reviews' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#662654]" />
                )}
              </button>
            </div>

            {/* Tabs Content */}
            <div className="text-sm text-primary-900/80 leading-relaxed min-h-[150px]">
              {activeTab === 'description' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-extrabold text-primary-900">
                    {product.name} - Bold, Aromatic & Authentic
                  </h3>
                  <p>{product.description}</p>
                  
                  {/* Benefits checkmarks */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                      {product.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-primary-900 font-medium">
                          <span className="text-emerald-600 font-extrabold text-base">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'additional' && (
                <div className="flex flex-col gap-4 max-w-lg">
                  <table className="w-full border-collapse">
                    <tbody>
                      {product.ingredients && (
                        <tr className="border-b border-gray-200">
                          <td className="py-2.5 font-bold text-gray-700 w-1/3">Ingredients</td>
                          <td className="py-2.5 text-gray-600">{product.ingredients}</td>
                        </tr>
                      )}
                      {product.highlights && product.highlights.length > 0 && (
                        <tr className="border-b border-gray-200">
                          <td className="py-2.5 font-bold text-gray-700 w-1/3">Highlights</td>
                          <td className="py-2.5 text-gray-600">{product.highlights.join(', ')}</td>
                        </tr>
                      )}
                      {product.nutritionInfo && Object.values(product.nutritionInfo).some(Boolean) && (
                        <tr className="border-b border-gray-200">
                          <td className="py-2.5 font-bold text-gray-700 w-1/3">Nutrition Info</td>
                          <td className="py-2.5 text-gray-600">
                            {Object.entries(product.nutritionInfo)
                              .filter(([_, v]) => Boolean(v))
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(', ')}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b border-gray-200">
                        <td className="py-2.5 font-bold text-gray-700 w-1/3">Packaging</td>
                        <td className="py-2.5 text-gray-600">Premium Airtight Jar / Eco-friendly Box</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-6 text-gray-500 font-semibold">
                  <p className="mb-2">There are no reviews yet.</p>
                  <button className="text-xs font-bold text-primary-500 hover:underline cursor-pointer uppercase tracking-wider">
                    Be the first to review "{product.name}"
                  </button>
                </div>
              )}
            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Products Section ────────────────────────────────────────────────────

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [wishlisted, setWishlisted] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('Bestsellers');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  // Per-card selected variant index
  const [cardVariants, setCardVariants] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (!supabase) {
          setProducts(fallbackProducts);
          setLoading(false);
          return;
        }

        const { data, error: dbError } = await supabase
          .from('Product')
          .select(
            `id, name, description, price, stock, shortDescription, ingredients,
             benefits, highlights, nutritionInfo, faqData, tags,
             seoTitle, seoDescription, variants,
             categoryId, discountPrice, featured, slug, status,
             image, imagePath, createdAt, updatedAt`
          )
          .eq('status', 'ACTIVE')
          .order('id', { ascending: true });

        if (dbError) throw dbError;

        if (data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err: unknown) {
        console.error('Failed to fetch products:', err);
        setError('Could not load products from database. Showing sample collection.');
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, variantIdx: number) => {
    const variant = product.variants?.[variantIdx];
    const price = variant?.offerPrice
      ? Number(variant.offerPrice)
      : variant?.price
      ? Number(variant.price)
      : product.discountPrice ?? product.price;
    const originalPrice = variant?.price ? Number(variant.price) : product.price;
    addToCart({
      id: product.id,
      name: product.name,
      price,
      originalPrice,
      image: product.image,
      variant: variant?.size,
    });
    setAddedItems((prev) => [...prev, product.id]);
    setTimeout(() => setAddedItems((prev) => prev.filter((i) => i !== product.id)), 2000);
  };

  const toggleWishlist = (id: number) => {
    setWishlisted((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const setCardVariant = (productId: number, variantIdx: number) => {
    setCardVariants((prev) => ({ ...prev, [productId]: variantIdx }));
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'Bestsellers') {
      return p.featured;
    }
    const ids = categoryMap[activeCategory];
    return !ids || ids.length === 0 || ids.includes(p.categoryId);
  });

  // ── Loading State ──
  if (loading) {
    return (
      <section id="products" className="py-24 bg-[#fdf9f2]">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-primary-700/60 font-semibold text-sm">Loading Collection...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-20 bg-[#fdf9f2] relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-50 border border-primary-500/15 px-4 py-1.5 rounded-full mb-4">
                <Leaf className="h-3.5 w-3.5" />
                Featured Collection
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-primary-900 mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Shop Our Natural Petal Products
              </h2>
              <p className="text-primary-700/70 text-base font-medium max-w-xl mx-auto">
                Pure, lab-certified and harvested directly from nature — no middlemen, no adulteration.
              </p>

              {/* DB error notice */}
              {error && (
                <p className="mt-3 text-xs text-amber-600 bg-amber-50 border border-amber-200 inline-block px-4 py-1.5 rounded-full">
                  ⚠ {error}
                </p>
              )}
            </motion.div>
          </div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-2 gap-y-3 mb-10"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer select-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#ede7d7] rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-primary-900 font-black' : 'text-primary-900/60 hover:text-primary-900'}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isAdded = addedItems.includes(product.id);
                const isWishlisted = wishlisted.includes(product.id);

                // Active variant for this card
                const variantIdx = cardVariants[product.id] ?? 0;
                const variant = product.variants?.[variantIdx];

                // Resolve price from variant or product level
                const displayPrice = variant?.offerPrice
                  ? Number(variant.offerPrice)
                  : variant?.price
                  ? Number(variant.price)
                  : product.discountPrice ?? product.price;
                const originalPrice = variant?.price ? Number(variant.price) : product.price;
                const hasDiscount = displayPrice < originalPrice;
                const discount = hasDiscount
                  ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
                  : 0;

                const badgeLabel =
                  discount > 0 ? `${discount}% OFF` : product.featured ? 'Bestseller' : 'New Launch';

                const stockCount = variant?.stock ? Number(variant.stock) : product.stock;
                const isOutOfStock = stockCount === 0;

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-accent-gold/30 transition-all duration-300 hover:shadow-[0_15px_50px_-15px_rgba(102,38,84,0.12)]"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-[#fdf6ee] p-4 flex items-center justify-center border-b border-gray-100" style={{ height: '260px' }}>
                      {/* Badge */}
                      <span
                        className={`absolute top-0 left-0 z-10 text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-br-lg shadow-sm ${
                          discount > 0
                            ? 'bg-red-500 text-white'
                            : 'bg-[#f4be37] text-primary-900'
                        }`}
                      >
                        {badgeLabel}
                      </span>

                      {/* Wishlist */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                          isWishlisted
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-primary-700 hover:bg-red-50 hover:text-red-500 border border-primary-500/10'
                        } shadow-sm cursor-pointer`}
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* Product Image */}
                      <img
                        src={product.image || '/logo.png'}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain transform group-hover:scale-106 group-hover:-translate-y-1.5 group-hover:rotate-1 transition-all duration-500 ease-out select-none"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo.png';
                        }}
                      />

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-primary-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="flex items-center gap-1.5 bg-white text-primary-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4 flex flex-col gap-2">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[11px] text-primary-700/50 font-semibold ml-1">(4.9)</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xs sm:text-sm font-bold text-primary-900 mb-0.5 line-clamp-2 min-h-[2.5rem] leading-tight group-hover:text-primary-500 transition-colors">
                        {product.name}
                      </h3>

                      {/* Short description */}
                      {product.shortDescription && (
                        <p className="text-[11px] text-primary-700/55 font-semibold line-clamp-1">
                          {product.shortDescription}
                        </p>
                      )}

                      {/* Variant size selector (compact) */}
                      {product.variants && product.variants.length > 1 && (
                        <div className="flex flex-wrap gap-1 my-1">
                          {product.variants.map((v, i) => (
                            <button
                              key={i}
                              onClick={() => setCardVariant(product.id, i)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                                variantIdx === i
                                  ? 'bg-primary-500 text-white border-primary-500'
                                  : 'border-primary-200 text-primary-600 hover:border-primary-400'
                              }`}
                            >
                              {v.size}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Price + Cart Row */}
                      <div className="flex flex-col gap-3 mt-auto pt-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-primary-900">₹{displayPrice}</span>
                          {hasDiscount && (
                            <>
                              <span className="text-xs text-primary-700/40 line-through font-semibold">
                                ₹{originalPrice}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-0.5">
                                {discount}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product, variantIdx)}
                          disabled={isOutOfStock}
                          className={`flex items-center justify-between w-full px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : isOutOfStock
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm shadow-primary-500/20'
                          }`}
                          aria-label="Add to cart"
                        >
                          <span>{isAdded ? 'Added to Cart' : isOutOfStock ? 'Out of Stock' : 'Add To Cart'}</span>
                          {!isOutOfStock && !isAdded && (
                            <span className="bg-white/20 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black">+</span>
                          )}
                          {isAdded && (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
