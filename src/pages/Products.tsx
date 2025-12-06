import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/product/ProductCard';
import { products, categories, brands } from '@/data/products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const priceRanges = [
  { value: '0-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2000', label: '$1,000 - $2,000' },
  { value: '2000+', label: 'Over $2,000' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('newest');

  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');
  const selectedBrand = searchParams.get('brand');
  const selectedPrice = searchParams.get('price');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedSubcategory) {
      result = result.filter(p => p.subcategory === selectedSubcategory);
    }
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-').map(Number);
      result = result.filter(p => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min;
      });
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [selectedCategory, selectedSubcategory, selectedBrand, selectedPrice, sort]);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || selectedSubcategory || selectedBrand || selectedPrice;

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container-luxe">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-2">
              {selectedCategory || 'All Products'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm">
                  Sort by: {sortOptions.find(o => o.value === sort)?.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-10">
                  <div className="bg-background border border-border rounded-lg shadow-strong p-2 min-w-[180px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSort(option.value)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                          sort === option.value ? "bg-muted" : "hover:bg-muted"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* View toggle */}
              <div className="hidden md:flex items-center border border-border rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'grid' ? "bg-muted" : ""
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'list' ? "bg-muted" : ""
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8 mt-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-4">Category</h3>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.name}>
                        <button
                          onClick={() => updateFilter('category', selectedCategory === cat.name ? null : cat.name)}
                          className={cn(
                            "text-sm transition-colors",
                            selectedCategory === cat.name
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-4">Price</h3>
                  <ul className="space-y-2">
                    {priceRanges.map((range) => (
                      <li key={range.value}>
                        <button
                          onClick={() => updateFilter('price', selectedPrice === range.value ? null : range.value)}
                          className={cn(
                            "text-sm transition-colors",
                            selectedPrice === range.value
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {range.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-medium mb-4">Brand</h3>
                  <ul className="space-y-2">
                    {brands.map((brand) => (
                      <li key={brand}>
                        <button
                          onClick={() => updateFilter('brand', selectedBrand === brand ? null : brand)}
                          className={cn(
                            "text-sm transition-colors",
                            selectedBrand === brand
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {brand}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className={cn(
                "grid gap-4 lg:gap-6",
                viewMode === 'grid' ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">No products found</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-primary underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-overlay z-50 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 overflow-y-auto p-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-medium">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Filter content same as desktop */}
            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-4">Category</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() => {
                          updateFilter('category', selectedCategory === cat.name ? null : cat.name);
                        }}
                        className={cn(
                          "text-sm",
                          selectedCategory === cat.name ? "font-medium" : "text-muted-foreground"
                        )}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Price</h3>
                <ul className="space-y-3">
                  {priceRanges.map((range) => (
                    <li key={range.value}>
                      <button
                        onClick={() => updateFilter('price', selectedPrice === range.value ? null : range.value)}
                        className={cn(
                          "text-sm",
                          selectedPrice === range.value ? "font-medium" : "text-muted-foreground"
                        )}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <Button
                variant="hero"
                className="w-full"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </MainLayout>
  );
}
