import { Product } from '../types';

export const PRODUCT_COLORS = [
  { name: 'Gray', value: 'bg-gray-400' },
  { name: 'Blue', value: 'bg-blue-400' },
  { name: 'Brown', value: 'bg-yellow-900' },
];

export const SIZES = ['S', 'M', 'L', 'XL', '28'];
export const GENDERS = ['Man', 'Woman', 'Unisex'];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "White T-shirt",
    description: "Classic cotton tee",
    price: "49.3",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    sold: 12,
    available: 12,
    size: 'M',
    gender: 'Man',
    color: PRODUCT_COLORS[0].value
  },
  {
    id: 2,
    name: "Outer Hodie Flannel",
    description: "Warm and stylish",
    price: "112.4",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    sold: 12,
    available: 12,
    size: 'XL',
    gender: 'Unisex',
    color: PRODUCT_COLORS[1].value
  },
  {
    id: 3,
    name: "Denim Longslave",
    description: "Denim shirt for all occasions",
    price: "49.3",
    image: "https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80",
    sold: 12,
    available: 12,
    size: 'M',
    gender: 'Man',
    color: PRODUCT_COLORS[2].value
  },
  {
    id: 4,
    name: "Wide Leg Dress Pants",
    description: "Comfortable and chic",
    price: "28.2",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    sold: 12,
    available: 12,
    size: '28',
    gender: 'Woman',
    color: PRODUCT_COLORS[0].value
  },
  {
    id: 5,
    name: "Dress For Women Muslim",
    description: "Elegant and modest",
    price: "76.8",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    sold: 12,
    available: 12,
    size: 'M',
    gender: 'Man',
    color: PRODUCT_COLORS[1].value
  },
  {
    id: 6,
    name: "Trench Coat Notch Lapel",
    description: "Classic trench coat",
    price: "112.2",
    image: "https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=400&q=80",
    sold: 12,
    available: 12,
    size: 'M',
    gender: 'Man',
    color: PRODUCT_COLORS[2].value
  }
]; 