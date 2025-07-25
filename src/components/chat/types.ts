export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  sold: number;
  available: number;
  size?: string;
  gender?: string;
  color?: string;
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface ChatInterfaceProps {
  onMenuClick: () => void;
} 