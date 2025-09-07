// Core type definitions for Messy app

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location?: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  area: string;
  pincode: string;
}

export interface Mess {
  id: string;
  name: string;
  description: string;
  owner: MessOwner;
  location: Location;
  images: string[];
  cuisine: CuisineType[];
  isVeg: boolean;
  isNonVeg: boolean;
  rating: number;
  totalReviews: number;
  priceRange: PriceRange;
  serviceTypes: ServiceType[];
  timings: Timing[];
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessOwner {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessLicense?: string;
  verified: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  isVeg: boolean;
  isAvailable: boolean;
  image?: string;
  spiceLevel?: SpiceLevel;
}

export interface DailyMenu {
  id: string;
  messId: string;
  date: Date;
  items: MenuItem[];
  specialOffers?: string[];
  notes?: string;
}

export interface SubscriptionPlan {
  id: string;
  messId: string;
  name: string;
  description: string;
  duration: number; // in days
  price: number;
  mealsPerDay: number;
  includes: string[];
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  messId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  messId: string;
  rating: number;
  comment: string;
  images?: string[];
  hygiene: number;
  taste: number;
  service: number;
  value: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  messId: string;
  items: OrderItem[];
  totalAmount: number;
  orderType: OrderType;
  status: OrderStatus;
  deliveryAddress?: Location;
  scheduledFor?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

// Enums
export enum CuisineType {
  NORTH_INDIAN = 'north_indian',
  SOUTH_INDIAN = 'south_indian',
  GUJARATI = 'gujarati',
  MAHARASHTRIAN = 'maharashtrian',
  CHINESE = 'chinese',
  CONTINENTAL = 'continental',
  MIXED = 'mixed'
}

export enum MenuCategory {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACKS = 'snacks',
  BEVERAGES = 'beverages'
}

export enum ServiceType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
  DINE_IN = 'dine_in'
}

export enum PriceRange {
  BUDGET = 'budget',      // < 150/meal
  MODERATE = 'moderate',  // 150-300/meal
  PREMIUM = 'premium'     // > 300/meal
}

export enum SpiceLevel {
  MILD = 'mild',
  MEDIUM = 'medium',
  HOT = 'hot',
  EXTRA_HOT = 'extra_hot'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum OrderType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
  DINE_IN = 'dine_in'
}

export enum OrderStatus {
  PLACED = 'placed',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface Timing {
  day: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  MessDetails: { messId: string };
  Subscription: { messId: string; planId?: string };
  Profile: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Orders: undefined;
  Profile: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Search and Filter types
export interface SearchFilters {
  location?: Location;
  radius?: number; // in km
  cuisine?: CuisineType[];
  isVeg?: boolean;
  isNonVeg?: boolean;
  priceRange?: PriceRange[];
  serviceTypes?: ServiceType[];
  rating?: number;
  hasSubscription?: boolean;
}

export interface SortOptions {
  field: 'rating' | 'distance' | 'price' | 'popularity';
  order: 'asc' | 'desc';
}