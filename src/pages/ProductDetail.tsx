import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, Star, ChevronLeft, ChevronRight, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16 container-luxe text-center">
          <h1 className="text-2xl font-display mb-4">Product not found</h1>
          <Link to="/products" className="text-primary underline">
            Back to Products
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize || product.sizes[0],
      color: selectedColor || product.colors[0]?.name,
    });
  };

  const similarProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <MainLayout>
      <div className="pt-24 lg:pt-32 pb-16">
        <div className="container-luxe">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            {' / '}
            <Link to="/products" className="hover:text-foreground">Products</Link>
            {' / '}
            <Link to={`/products?category=${product.category}`} className="hover:text-foreground">
              {product.category}
            </Link>
            {' / '}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => (prev + 1) % product.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-foreground text-background text-xs font-medium rounded">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-24 rounded-md overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-foreground" : "border-transparent"
                    )}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {product.brand}
              </p>
              <h1 className="font-display text-3xl md:text-4xl mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-medium">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Color</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedColor || product.colors[0].name}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all",
                          (selectedColor === color.name || (!selectedColor && color === product.colors[0]))
                            ? "border-foreground scale-110"
                            : "border-border"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Size</span>
                    <button className="text-sm text-muted-foreground underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[48px] h-12 px-4 border rounded-md text-sm font-medium transition-colors",
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-sm font-medium mb-3 block">Quantity</span>
                <div className="inline-flex items-center border border-border rounded-md">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => toggleItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                  })}
                >
                  <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
                </Button>
                <Button variant="outline" size="xl">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Authenticity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <section className="mt-24">
              <h2 className="font-display text-2xl md:text-3xl mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {similarProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-16 left-0 right-0 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border p-4 z-30">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="font-medium">${product.price.toLocaleString()}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          <Button variant="hero" size="lg" className="flex-1" onClick={handleAddToCart}>
            Add to Bag
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
