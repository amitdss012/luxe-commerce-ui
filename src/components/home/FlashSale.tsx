import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

export default function FlashSale() {
  const saleProducts = products.filter(p => p.isSale).slice(0, 4);
  
  // Countdown timer - 24 hours from now
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="section-padding">
      <div className="container-luxe">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                Limited Time
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
              Flash Sale
            </h2>
            <p className="text-muted-foreground mt-2">
              Up to 50% off select styles
            </p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-accent" />
            <div className="flex gap-3">
              {[
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <motion.div
                    key={item.value}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-14 h-14 flex items-center justify-center bg-foreground text-background rounded-lg font-display text-xl"
                  >
                    {formatTime(item.value)}
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {saleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="minimal" size="lg" asChild>
            <Link to="/sale">View All Sale Items</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
