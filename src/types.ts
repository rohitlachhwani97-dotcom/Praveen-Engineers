export type ActivePage = 'home' | 'about' | 'products' | 'industries' | 'clients' | 'sourcing' | 'contact';

export interface ProductItem {
  id: string;
  name: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  icon: string; // lucide icon name
  description: string;
  items: string[];
}

export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export interface ClientItem {
  name: string;
  logoText: string;
  type: string;
}

export interface SourcingCountry {
  name: string;
  flag: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage for the SVG map representation
  primaryComponents?: string[];
  standards?: string[];
  transitTime?: string;
  shippingMode?: 'Sea' | 'Air' | 'Both';
}

export interface EnquiryFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  productRequired: string;
  message: string;
  attachmentName: string;
}
