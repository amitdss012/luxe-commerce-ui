import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Winter Collection',
    subtitle: '2024',
    description: 'Discover timeless elegance in our new season arrivals',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920',
    cta: { text: 'Shop Now', link: '/products' },
    ctaSecondary: { text: 'View Lookbook', link: '/lookbook' },
  },
  {
    id: 2,
    title: 'The Art of Luxury',
    subtitle: 'Cashmere Edit',
    description: 'Indulge in the finest Italian cashmere, crafted for perfection',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920',
    cta: { text: 'Explore', link: '/products?tag=cashmere' },
    ctaSecondary: { text: 'Our Story', link: '/about' },
  },
  {
    id: 3,
    title: 'Evening Elegance',
    subtitle: 'Black Tie Collection',
    description: 'Make an entrance in our exclusive evening wear',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920',
    cta: { text: 'Discover', link: '/products?subcategory=Dresses' },
    ctaSecondary: null,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container-luxe">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  {slides[current].subtitle}
                </p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-none">
                  {slides[current].title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  {slides[current].description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="xl" asChild>
                    <Link to={slides[current].cta.link}>
                      {slides[current].cta.text}
                    </Link>
                  </Button>
                  {slides[current].ctaSecondary && (
                    <Button variant="hero-outline" size="xl" asChild>
                      <Link to={slides[current].ctaSecondary.link}>
                        {slides[current].ctaSecondary.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? 'w-8 bg-foreground' : 'w-2 bg-foreground/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
