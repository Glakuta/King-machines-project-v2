export interface WPImage {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPMachine {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  acf: {
    category: string;
    price?: number;
    short_description?: string;
    specifications?: Record<string, string>;
    images?: WPImage[];
    featured_image?: WPImage;
  };
  _embedded?: {
    'wp:featuredmedia': WPImage[];
  };
}

export interface WPArticle {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  author: number;
  categories: number[];
  _embedded?: {
    author: Array<{ name: string }>;
    'wp:featuredmedia': WPImage[];
    'wp:term': Array<Array<{ name: string; slug: string }>>;
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, unknown>;
}

export interface Machine {
  id: string;
  name: string;
  slug: string;
  category: string;
  price?: number;
  shortDescription?: string;
  description: string;
  specifications?: Record<string, string>;
  images?: string[];
  featuredImage?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  date: string;
  image?: string;
  readTime?: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface BlogPost {
    id: string | number;
    title: string;
    excerpt: string;
    imageUrl: string;
    category?: string; // np. "Hiszpańskie centra frezarskie MTE"
    isFeatured?: boolean;
    url: string;
}