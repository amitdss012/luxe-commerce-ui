import { motion } from 'framer-motion';

const brands = [
  { name: 'Vogue', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Vogue_logo.svg' },
  { name: 'Elle', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/ELLE-Logo.svg' },
  { name: 'Harper\'s Bazaar', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Harper%27s_Bazaar_Logo.svg' },
  { name: 'GQ', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/GQ_logo.svg' },
];

const trustBadges = [
  { icon: '🔒', title: 'Secure Payments', description: 'SSL encrypted checkout' },
  { icon: '🚚', title: 'Free Shipping', description: 'On orders over $500' },
  { icon: '↩️', title: 'Easy Returns', description: '30-day return policy' },
  { icon: '💎', title: 'Authentic', description: '100% genuine products' },
];

export default function BrandPartners() {
  return (
    <section className="py-16 border-y border-border">
      <div className="container-luxe">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-3">{badge.icon}</div>
              <h4 className="font-medium mb-1">{badge.title}</h4>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured In */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16 opacity-50">
            {brands.map((brand) => (
              <img
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                className="h-6 lg:h-8 object-contain grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
