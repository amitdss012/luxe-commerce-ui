import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Heart, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openCart, itemCount } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHomePage ? "bg-transparent" : "bg-background/80 backdrop-blur-xl border-b border-border/50"
      )}>
        {/* Top bar */}
        <div className="hidden lg:block bg-foreground text-background">
          <div className="container-luxe py-2 flex justify-between items-center text-xs">
            <span>Complimentary shipping on orders over $500</span>
            <div className="flex gap-6">
              <Link to="/about" className="hover:opacity-70 transition-opacity">Our Story</Link>
              <Link to="/stores" className="hover:opacity-70 transition-opacity">Find a Store</Link>
              <Link to="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container-luxe py-4 lg:py-5">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl lg:text-3xl font-semibold tracking-wider">LUXE</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    to={`/products?category=${category.name}`}
                    className="flex items-center gap-1 py-2 text-sm font-medium link-underline"
                  >
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </Link>

                  {/* Mega menu */}
                  <AnimatePresence>
                    {activeCategory === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-background border border-border rounded-lg shadow-strong p-6 min-w-[200px]">
                          <ul className="space-y-3">
                            {category.subcategories.map((sub) => (
                              <li key={sub}>
                                <Link
                                  to={`/products?category=${category.name}&subcategory=${sub}`}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link to="/sale" className="text-sm font-medium text-accent link-underline">
                Sale
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button 
                onClick={toggleTheme}
                className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <Link 
                to="/wishlist"
                className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link 
                to="/account"
                className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <button 
                onClick={openCart}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-overlay z-50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-2xl font-semibold tracking-wider">LUXE</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.name}>
                      <Link
                        to={`/products?category=${category.name}`}
                        className="text-lg font-medium block mb-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                      <ul className="space-y-2 pl-4">
                        {category.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/products?category=${category.name}&subcategory=${sub}`}
                              className="text-sm text-muted-foreground"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link
                    to="/sale"
                    className="text-lg font-medium text-accent block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sale
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <Link to="/account" className="flex items-center gap-3 text-sm" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-5 w-5" /> Account
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-3 text-sm" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="h-5 w-5" /> Wishlist
                  </Link>
                  <button onClick={toggleTheme} className="flex items-center gap-3 text-sm">
                    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-start justify-center pt-32"
          >
            <div className="w-full max-w-2xl px-6">
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 p-2"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-4 pl-10 text-xl outline-none transition-colors"
                  autoFocus
                />
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {['Cashmere', 'Leather bags', 'Evening dresses', 'Wool coats'].map((term) => (
                    <button
                      key={term}
                      className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-muted transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
