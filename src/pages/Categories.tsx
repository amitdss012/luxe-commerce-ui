import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { categories } from '@/data/products';

export default function CategoriesPage() {
  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container-luxe">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            Shop by Category
          </h1>
          <p className="text-muted-foreground mb-12">
            Explore our complete collection
          </p>

          <div className="grid gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.name}`}
                  className="group block relative h-64 lg:h-80 rounded-xl overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center p-8 lg:p-12">
                    <div>
                      <h2 className="font-display text-3xl lg:text-5xl text-background mb-4">
                        {category.name}
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {category.subcategories.slice(0, 4).map((sub) => (
                          <Link
                            key={sub}
                            to={`/products?category=${category.name}&subcategory=${sub}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 bg-background/20 backdrop-blur-sm text-background text-sm rounded-full hover:bg-background/40 transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                        {category.subcategories.length > 4 && (
                          <span className="px-3 py-1 bg-background/20 text-background text-sm rounded-full">
                            +{category.subcategories.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
