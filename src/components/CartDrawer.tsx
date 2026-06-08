import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer Panel */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-[#fdf9f2] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <h2 className="font-black text-primary-900 text-base leading-tight">Your Cart</h2>
                  <p className="text-[11px] text-gray-500 font-semibold">
                    {cartItems.length === 0
                      ? 'No items yet'
                      : `${cartItems.reduce((s, i) => s + i.quantity, 0)} item${cartItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] font-bold text-red-400 hover:text-red-600 transition-colors px-2 py-1 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {cartItems.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="h-24 w-24 rounded-full bg-primary-50 flex items-center justify-center mb-5">
                    <Package className="h-10 w-10 text-primary-300" />
                  </div>
                  <h3 className="text-lg font-black text-primary-900 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 font-medium max-w-[220px] mb-6">
                    Add your favourite Paidhu products to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {cartItems.map((item) => {
                      const key = `${item.id}-${item.variant ?? ''}`;
                      const lineTotal = item.price * item.quantity;
                      const hasDiscount = item.originalPrice > item.price;

                      return (
                        <motion.div
                          key={key}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex gap-3"
                        >
                          {/* Product Image */}
                          <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-[#fdf6ee] flex items-center justify-center overflow-hidden border border-gray-100">
                            <img
                              src={item.image || '/logo.png'}
                              alt={item.name}
                              className="h-full w-full object-contain p-1"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logo.png';
                              }}
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-primary-900 leading-tight line-clamp-2">
                                  {item.name}
                                </h4>
                                {item.variant && (
                                  <span className="text-[10px] font-semibold text-gray-400 mt-0.5 block">
                                    {item.variant}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id, item.variant)}
                                className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Price */}
                              <div className="flex items-baseline gap-1">
                                <span className="text-sm font-black text-primary-900">₹{lineTotal}</span>
                                {hasDiscount && (
                                  <span className="text-[10px] text-gray-400 line-through font-semibold">
                                    ₹{item.originalPrice * item.quantity}
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-1 py-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                                  className="h-6 w-6 rounded-full flex items-center justify-center text-primary-700 hover:bg-white hover:text-primary-500 transition-all cursor-pointer"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-xs font-black text-primary-900 w-5 text-center select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                                  className="h-6 w-6 rounded-full flex items-center justify-center text-primary-700 hover:bg-white hover:text-primary-500 transition-all cursor-pointer"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer (only when items exist) */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 bg-white px-6 py-5 space-y-4">
                {/* Coupon code */}
                <div className="flex items-center gap-2 bg-primary-50 rounded-xl px-4 py-2.5 border border-primary-500/15">
                  <Tag className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Apply coupon code..."
                    className="flex-1 bg-transparent text-xs font-semibold text-primary-900 placeholder-primary-400/60 outline-none"
                  />
                  <button className="text-xs font-black text-primary-500 hover:text-primary-700 transition-colors cursor-pointer whitespace-nowrap">
                    Apply
                  </button>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500 font-semibold">
                    <span>Subtotal</span>
                    <span>₹{cartTotal + savings}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-xs text-emerald-600 font-bold">
                      <span>You Save</span>
                      <span>−₹{savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-gray-500 font-semibold">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">
                      {cartTotal >= 999 ? 'FREE' : '₹49'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-gray-100 mt-2">
                    <span className="text-sm font-black text-primary-900">Total</span>
                    <span className="text-lg font-black text-primary-900">
                      ₹{cartTotal < 999 ? cartTotal + 49 : cartTotal}
                    </span>
                  </div>
                  {cartTotal < 999 && (
                    <p className="text-[10px] text-amber-600 font-semibold text-center bg-amber-50 rounded-lg px-3 py-1.5">
                      Add ₹{999 - cartTotal} more for FREE shipping! 🚚
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-black text-sm py-3.5 rounded-full transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <p className="text-center text-[10px] text-gray-400 font-medium">
                  🔒 Secure checkout • Free returns • 100% Natural
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
