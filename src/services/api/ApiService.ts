import { API_ENDPOINTS, APP_CONFIG } from '../../constants';
import { 
  User, 
  Mess, 
  SubscriptionPlan, 
  Order, 
  Review, 
  SearchFilters, 
  ApiResponse, 
  PaginatedResponse 
} from '../../types';

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = APP_CONFIG.API_BASE_URL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  // Auth APIs
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.makeRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.makeRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Mess APIs
  async getMesses(page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<Mess>>> {
    return this.makeRequest(`${API_ENDPOINTS.GET_MESSES}?page=${page}&limit=${limit}`);
  }

  async getMessDetails(messId: string): Promise<ApiResponse<Mess>> {
    return this.makeRequest(API_ENDPOINTS.GET_MESS_DETAILS.replace(':id', messId));
  }

  async searchMesses(filters: SearchFilters, page: number = 1): Promise<ApiResponse<PaginatedResponse<Mess>>> {
    return this.makeRequest(API_ENDPOINTS.SEARCH_MESSES, {
      method: 'POST',
      body: JSON.stringify({ filters, page }),
    });
  }

  async getNearbyMesses(latitude: number, longitude: number, radius: number = 10): Promise<ApiResponse<Mess[]>> {
    return this.makeRequest(
      `${API_ENDPOINTS.GET_NEARBY_MESSES}?lat=${latitude}&lng=${longitude}&radius=${radius}`
    );
  }

  // Subscription APIs
  async getSubscriptionPlans(messId: string): Promise<ApiResponse<SubscriptionPlan[]>> {
    return this.makeRequest(API_ENDPOINTS.GET_SUBSCRIPTION_PLANS.replace(':id', messId));
  }

  async createSubscription(subscriptionData: {
    messId: string;
    planId: string;
    startDate: Date;
  }): Promise<ApiResponse<any>> {
    return this.makeRequest(API_ENDPOINTS.SUBSCRIBE, {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async getUserSubscriptions(): Promise<ApiResponse<any[]>> {
    return this.makeRequest(API_ENDPOINTS.GET_USER_SUBSCRIPTIONS);
  }

  // Order APIs
  async createOrder(orderData: {
    messId: string;
    items: any[];
    orderType: string;
    deliveryAddress?: any;
  }): Promise<ApiResponse<Order>> {
    return this.makeRequest(API_ENDPOINTS.CREATE_ORDER, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getUserOrders(): Promise<ApiResponse<Order[]>> {
    return this.makeRequest(API_ENDPOINTS.GET_USER_ORDERS);
  }

  async getOrderDetails(orderId: string): Promise<ApiResponse<Order>> {
    return this.makeRequest(API_ENDPOINTS.GET_ORDER_DETAILS.replace(':id', orderId));
  }

  // Favorites APIs
  async addToFavorites(messId: string): Promise<ApiResponse<any>> {
    return this.makeRequest(API_ENDPOINTS.ADD_FAVORITE, {
      method: 'POST',
      body: JSON.stringify({ messId }),
    });
  }

  async removeFromFavorites(favoriteId: string): Promise<ApiResponse<any>> {
    return this.makeRequest(API_ENDPOINTS.REMOVE_FAVORITE.replace(':id', favoriteId), {
      method: 'DELETE',
    });
  }

  async getUserFavorites(): Promise<ApiResponse<Mess[]>> {
    return this.makeRequest(API_ENDPOINTS.GET_USER_FAVORITES);
  }

  // Review APIs
  async createReview(reviewData: {
    messId: string;
    rating: number;
    comment: string;
    hygiene: number;
    taste: number;
    service: number;
    value: number;
  }): Promise<ApiResponse<Review>> {
    return this.makeRequest(API_ENDPOINTS.CREATE_REVIEW, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getMessReviews(messId: string): Promise<ApiResponse<Review[]>> {
    return this.makeRequest(API_ENDPOINTS.GET_MESS_REVIEWS.replace(':id', messId));
  }

  // User APIs
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.makeRequest(API_ENDPOINTS.GET_PROFILE);
  }

  async updateUserProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.makeRequest(API_ENDPOINTS.UPDATE_PROFILE, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new ApiService();