export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Anéis" | "Brincos" | "Colares" | "Pulseiras" | "Relógios";
  material: string;
  collection: string;
  isPremium?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processando' | 'Enviado' | 'Entregue';
  trackingCode: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
}

export interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  zip: string;
}

export interface PaymentMethod {
  id: number;
  brand: string;
  last4: string;
  expiry: string;
  isMain: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Screen = 
  | "splash"
  | "welcome"
  | "login"
  | "signup"
  | "home"
  | "catalog"
  | "product"
  | "favorites"
  | "cart"
  | "payment"
  | "profile"
  | "tracking"
  | "support"
  | "settings"
  | "categories"
  | "personal_data"
  | "addresses"
  | "payment_methods"
  | "security"
  | "notifications"
  | "privacy"
  | "devices";
