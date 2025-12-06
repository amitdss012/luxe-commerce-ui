import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container-luxe py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl mb-4">Join the LUXE World</h3>
            <p className="text-background/70 mb-6">
              Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded-md text-background placeholder:text-background/50 focus:outline-none focus:border-background/50 transition-colors"
              />
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxe py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-semibold tracking-wider">LUXE</span>
            </Link>
            <p className="text-sm text-background/70 mb-6 max-w-xs">
              Curated luxury fashion and lifestyle essentials for the discerning individual.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 hover:bg-background/10 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:bg-background/10 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:bg-background/10 rounded-full transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:bg-background/10 rounded-full transition-colors" aria-label="Youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link to="/products?category=Women" className="hover:text-background transition-colors">Women</Link></li>
              <li><Link to="/products?category=Men" className="hover:text-background transition-colors">Men</Link></li>
              <li><Link to="/products?category=Accessories" className="hover:text-background transition-colors">Accessories</Link></li>
              <li><Link to="/products?category=Shoes" className="hover:text-background transition-colors">Shoes</Link></li>
              <li><Link to="/products?category=Jewelry" className="hover:text-background transition-colors">Jewelry</Link></li>
              <li><Link to="/sale" className="hover:text-background transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-background transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-background transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-background transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-background transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="hover:text-background transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-background transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-background transition-colors">Press</Link></li>
              <li><Link to="/stores" className="hover:text-background transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-background transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookies" className="hover:text-background transition-colors">Cookie Policy</Link></li>
              <li><Link to="/accessibility" className="hover:text-background transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} LUXE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6 opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-6 opacity-70 invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
