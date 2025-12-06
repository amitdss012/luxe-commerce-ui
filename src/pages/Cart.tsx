import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  const shipping = subtotal >= 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container-luxe">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8">
            Shopping Bag
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-medium mb-2">Your bag is empty</h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to add items to your bag
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-6 bg-secondary/30 rounded-lg"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="w-28 h-36 bg-muted rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' / '}
                        {item.color && `Color: ${item.color}`}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <span className="font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-32 self-start">
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h2 className="font-display text-xl mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $500
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between font-medium text-lg py-4 border-t border-border">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 px-4 py-3 border border-border rounded-md bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>

                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/checkout">
                      Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
