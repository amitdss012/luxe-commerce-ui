export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cashmere Blend Overcoat',
    price: 1295,
    originalPrice: 1595,
    description: 'Luxuriously crafted from the finest Italian cashmere blend, this overcoat epitomizes timeless elegance. Features a classic notched lapel, concealed button closure, and a relaxed silhouette that drapes beautifully.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800',
    ],
    category: 'Women',
    subcategory: 'Outerwear',
    brand: 'LUXE Atelier',
    rating: 4.9,
    reviews: 127,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C4A77D' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Ivory', hex: '#FFFFF0' },
    ],
    tags: ['cashmere', 'winter', 'luxury'],
    inStock: true,
    isSale: true,
  },
  {
    id: '2',
    name: 'Silk Evening Dress',
    price: 895,
    description: 'An exquisite floor-length gown crafted from pure mulberry silk. Features a draped neckline, open back detail, and a flowing silhouette that moves gracefully with every step.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
    ],
    category: 'Women',
    subcategory: 'Dresses',
    brand: 'LUXE Atelier',
    rating: 4.8,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Noir', hex: '#0D0D0D' },
      { name: 'Ruby', hex: '#9B111E' },
    ],
    tags: ['silk', 'evening', 'formal'],
    inStock: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Italian Leather Tote',
    price: 645,
    description: 'Hand-stitched from premium Italian pebbled leather, this spacious tote combines functionality with refined style. Features interior zip pocket, magnetic closure, and gold-tone hardware.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    ],
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'LUXE Leather',
    rating: 4.9,
    reviews: 234,
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac', hex: '#834333' },
      { name: 'Black', hex: '#0D0D0D' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    tags: ['leather', 'tote', 'everyday'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Merino Wool Sweater',
    price: 385,
    description: 'Crafted from extra-fine merino wool sourced from New Zealand, this sweater offers unparalleled softness. Features ribbed trim, relaxed fit, and subtle texture detail.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    ],
    category: 'Women',
    subcategory: 'Knitwear',
    brand: 'LUXE Essentials',
    rating: 4.7,
    reviews: 156,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Forest', hex: '#228B22' },
    ],
    tags: ['wool', 'knitwear', 'casual'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Tailored Wool Blazer',
    price: 795,
    description: 'Impeccably tailored from Italian virgin wool, this blazer features peak lapels, double-breasted closure, and a structured silhouette. The epitome of power dressing.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    category: 'Women',
    subcategory: 'Tailoring',
    brand: 'LUXE Atelier',
    rating: 4.9,
    reviews: 98,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0D0D0D' },
      { name: 'Check', hex: '#8B8589' },
    ],
    tags: ['blazer', 'formal', 'tailored'],
    inStock: true,
    isNew: true,
  },
  {
    id: '6',
    name: 'Leather Ankle Boots',
    price: 545,
    description: 'Hand-crafted in Italy from supple calfskin leather. Features a modern block heel, pointed toe, and side zip closure. The perfect balance of comfort and sophistication.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800',
    ],
    category: 'Shoes',
    subcategory: 'Boots',
    brand: 'LUXE Footwear',
    rating: 4.8,
    reviews: 167,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Black', hex: '#0D0D0D' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    tags: ['boots', 'leather', 'heel'],
    inStock: true,
  },
  {
    id: '7',
    name: 'Diamond Stud Earrings',
    price: 2450,
    description: 'Brilliant-cut diamonds totaling 1 carat, set in 18k white gold with secure screw-back closures. Each stone hand-selected for exceptional clarity and fire.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    category: 'Jewelry',
    subcategory: 'Earrings',
    brand: 'LUXE Fine Jewelry',
    rating: 5.0,
    reviews: 45,
    sizes: ['One Size'],
    colors: [
      { name: 'White Gold', hex: '#E8E8E8' },
      { name: 'Yellow Gold', hex: '#FFD700' },
    ],
    tags: ['diamond', 'earrings', 'fine jewelry'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Cashmere Scarf',
    price: 295,
    description: 'Woven from the finest Mongolian cashmere, this oversized scarf offers cloud-like softness. Features subtle fringe detail and comes in a luxurious gift box.',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
    ],
    category: 'Accessories',
    subcategory: 'Scarves',
    brand: 'LUXE Essentials',
    rating: 4.9,
    reviews: 203,
    sizes: ['One Size'],
    colors: [
      { name: 'Oatmeal', hex: '#C3B091' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Blush', hex: '#DE5D83' },
    ],
    tags: ['cashmere', 'scarf', 'gift'],
    inStock: true,
    isSale: true,
  },
];

export const categories = [
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600',
    subcategories: ['Dresses', 'Outerwear', 'Knitwear', 'Tailoring', 'Tops', 'Bottoms'],
  },
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    subcategories: ['Suits', 'Outerwear', 'Knitwear', 'Shirts', 'Trousers', 'Accessories'],
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600',
    subcategories: ['Bags', 'Scarves', 'Belts', 'Sunglasses', 'Hats', 'Gloves'],
  },
  {
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    subcategories: ['Heels', 'Boots', 'Flats', 'Sneakers', 'Sandals', 'Loafers'],
  },
  {
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    subcategories: ['Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Watches'],
  },
];

export const brands = ['LUXE Atelier', 'LUXE Essentials', 'LUXE Leather', 'LUXE Footwear', 'LUXE Fine Jewelry'];
