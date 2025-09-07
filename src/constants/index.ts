// App constants for Messy app

export const COLORS = {
  // Primary Colors
  primary: '#FF6B35',      // Orange-red for food theme
  primaryDark: '#E55A2B',
  primaryLight: '#FF8A65',
  
  // Secondary Colors
  secondary: '#4CAF50',    // Green for healthy/fresh
  secondaryDark: '#388E3C',
  secondaryLight: '#81C784',
  
  // Accent Colors
  accent: '#2196F3',       // Blue for trust/reliability
  accentDark: '#1976D2',
  accentLight: '#64B5F6',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Food specific colors
  veg: '#4CAF50',
  nonVeg: '#F44336',
  
  // Background colors
  background: '#FFFFFF',
  surface: '#F8F8F8',
  cardBackground: '#FFFFFF',
};

export const FONTS = {
  // Font families
  regular: 'System',
  medium: 'System',
  bold: 'System',
  
  // Font sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  
  // Line heights
  lineHeightSm: 16,
  lineHeightMd: 20,
  lineHeightLg: 24,
  lineHeightXl: 28,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const SCREEN_NAMES = {
  // Auth Stack
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main Tab
  HOME: 'Home',
  SEARCH: 'Search',
  FAVORITES: 'Favorites',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
  
  // Stack Screens
  MESS_DETAILS: 'MessDetails',
  SUBSCRIPTION: 'Subscription',
  MENU: 'Menu',
  REVIEWS: 'Reviews',
  EDIT_PROFILE: 'EditProfile',
  NOTIFICATIONS: 'Notifications',
  SETTINGS: 'Settings',
  HELP: 'Help',
  ABOUT: 'About',
};

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // User endpoints
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  UPLOAD_AVATAR: '/user/avatar',
  
  // Mess endpoints
  GET_MESSES: '/messes',
  GET_MESS_DETAILS: '/messes/:id',
  SEARCH_MESSES: '/messes/search',
  GET_NEARBY_MESSES: '/messes/nearby',
  
  // Menu endpoints
  GET_DAILY_MENU: '/messes/:id/menu',
  GET_MENU_ITEM: '/messes/:id/menu/:itemId',
  
  // Subscription endpoints
  GET_SUBSCRIPTION_PLANS: '/messes/:id/plans',
  SUBSCRIBE: '/subscriptions',
  GET_USER_SUBSCRIPTIONS: '/subscriptions/user',
  CANCEL_SUBSCRIPTION: '/subscriptions/:id/cancel',
  
  // Order endpoints
  CREATE_ORDER: '/orders',
  GET_USER_ORDERS: '/orders/user',
  GET_ORDER_DETAILS: '/orders/:id',
  CANCEL_ORDER: '/orders/:id/cancel',
  
  // Review endpoints
  CREATE_REVIEW: '/reviews',
  GET_MESS_REVIEWS: '/messes/:id/reviews',
  GET_USER_REVIEWS: '/reviews/user',
  
  // Favorites
  ADD_FAVORITE: '/favorites',
  REMOVE_FAVORITE: '/favorites/:id',
  GET_USER_FAVORITES: '/favorites/user',
};

export const STORAGE_KEYS = {
  USER_TOKEN: '@messy_user_token',
  USER_DATA: '@messy_user_data',
  USER_LOCATION: '@messy_user_location',
  SEARCH_HISTORY: '@messy_search_history',
  FAVORITES: '@messy_favorites',
  ONBOARDING_COMPLETED: '@messy_onboarding_completed',
  LANGUAGE: '@messy_language',
  THEME: '@messy_theme',
};

export const APP_CONFIG = {
  APP_NAME: 'Messy',
  VERSION: '1.0.0',
  BUILD_NUMBER: 1,
  API_BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.messy.com',
  DEFAULT_LOCATION: {
    latitude: 18.5204,
    longitude: 73.8567,
    address: 'Pune, Maharashtra',
    city: 'Pune',
    area: 'Central Pune',
    pincode: '411001',
  },
  SEARCH_RADIUS: 10, // km
  PAGINATION_LIMIT: 20,
  MAX_IMAGES_PER_REVIEW: 5,
  MIN_RATING: 1,
  MAX_RATING: 5,
  DELIVERY_CHARGES: 30,
  FREE_DELIVERY_THRESHOLD: 300,
};

export const CUISINE_ICONS = {
  north_indian: '🍛',
  south_indian: '🥥',
  gujarati: '🍽️',
  maharashtrian: '🌶️',
  chinese: '🥢',
  continental: '🍽️',
  mixed: '🍴',
};

export const SERVICE_ICONS = {
  pickup: '🚶',
  delivery: '🚗',
  dine_in: '🪑',
};

export const MEAL_TIME_SLOTS = [
  { id: 'breakfast', label: 'Breakfast', startTime: '07:00', endTime: '10:00' },
  { id: 'lunch', label: 'Lunch', startTime: '12:00', endTime: '15:00' },
  { id: 'snacks', label: 'Snacks', startTime: '16:00', endTime: '18:00' },
  { id: 'dinner', label: 'Dinner', startTime: '19:00', endTime: '22:00' },
];

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const PUNE_AREAS = [
  'Koregaon Park',
  'Viman Nagar',
  'Kothrud',
  'Deccan',
  'Shivaji Nagar',
  'Pune Station',
  'Hadapsar',
  'Wakad',
  'Baner',
  'Aundh',
  'Pimpri',
  'Chinchwad',
  'Magarpatta',
  'Kondwa',
  'Karve Nagar',
  'Sinhagad Road',
  'FC Road',
  'MG Road',
  'JM Road',
  'Kalyani Nagar',
];

export const SUBSCRIPTION_BENEFITS = [
  'Daily fresh meals',
  'Flexible meal plans',
  'Home delivery available',
  'Hygiene guaranteed',
  'Cost effective',
  'Customizable menu',
  'No cooking hassle',
  'Healthy options',
];