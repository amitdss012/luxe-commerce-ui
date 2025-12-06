import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0]?.name,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Second image on hover */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-foreground text-background text-xs font-medium rounded">
                New
              </span>
            )}
            {product.isSale && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-md hover:bg-background transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </button>
            <button
              onClick={handleWishlist}
              className={cn(
                "p-3 backdrop-blur-sm rounded-md transition-colors",
                isInWishlist(product.id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90 text-foreground hover:bg-background"
              )}
            >
              <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-medium">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex gap-1 pt-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
