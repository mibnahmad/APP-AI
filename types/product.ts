export type ImagePrompts = {
  mainArtwork: string;
  livingRoom: string;
  bedroom: string;
  coffeeShop: string;
  luxurySpace: string;
};

export type Product = {
  id: string;
  title: string;
  artist: string;
  category: string;
  collection: string;
  description: string;
  /** Extended artist and creation narrative */
  story?: string;
  /** SEO-optimised page title */
  seoTitle?: string;
  /** SEO meta description */
  seoDescription?: string;
  /** Comma-separated mood descriptors */
  mood?: string;
  /** Searchable keyword tags */
  tags?: string[];
  /** Available substrate options, e.g. "220gsm Museum Archival Matte" */
  materials?: string[];
  /** Available finish options, e.g. "Canvas", "Poster", "Framed Poster" */
  printOptions?: string[];
  price: number;
  oldPrice: number;
  sizes: string[];
  colors: string[];
  orientation: "portrait" | "landscape";
  style: string;
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
  rating: number;
  reviewCount: number;
  /** Main artwork image URL */
  image: string;
  /** Lifestyle / interior scene images (4 recommended: living room, bedroom, café, hotel) */
  gallery: string[];
  /** Subset of gallery images used for the room mockup section */
  roomMockups: string[];
  /** AI image generation prompts for each scene — used for producing real imagery */
  imagePrompts?: ImagePrompts;
};

export type CartItem = {
  productId: string;
  quantity: number;
  size: string;
  finish: "Canvas" | "Poster";
  frame: "None" | "Black" | "Oak" | "White" | "Gold";
};
