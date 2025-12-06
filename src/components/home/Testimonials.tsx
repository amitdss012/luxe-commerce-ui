import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "The quality is exceptional. Every piece I've purchased from LUXE has become a wardrobe staple. The attention to detail and craftsmanship is unparalleled.",
    author: "Alexandra M.",
    title: "Fashion Editor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
  },
  {
    id: 2,
    text: "LUXE understands what modern luxury means. Their pieces are timeless yet contemporary, and the customer service is impeccable.",
    author: "James L.",
    title: "Creative Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
  },
  {
    id: 3,
    text: "From the packaging to the product, every touchpoint exudes elegance. I'm a customer for life.",
    author: "Sophie R.",
    title: "Interior Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-luxe">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Quote className="h-10 w-10 mx-auto text-primary/30 mb-6" />
            <h2 className="font-display text-3xl md:text-4xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium">{testimonials[current].author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'w-6 bg-foreground' : 'w-2 bg-foreground/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
