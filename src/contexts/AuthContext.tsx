import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { STORAGE_KEYS } from '../constants';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch({ type: 'SET_USER', payload: { user, token } });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, _password: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock authentication - in real app, make API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+91 9876543210',
        avatar: undefined,
        location: {
          latitude: 18.5204,
          longitude: 73.8567,
          address: 'Pune, Maharashtra',
          city: 'Pune',
          area: 'FC Road',
          pincode: '411004',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      // Store in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, mockToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      dispatch({ type: 'SET_USER', payload: { user: mockUser, token: mockToken } });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error('Login failed. Please try again.');
    }
  };

  const register = async (name: string, email: string, phone: string, _password: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock registration - in real app, make API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        phone: phone,
        avatar: undefined,
        location: {
          latitude: 18.5204,
          longitude: 73.8567,
          address: 'Pune, Maharashtra',
          city: 'Pune',
          area: 'FC Road',
          pincode: '411004',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      // Store in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, mockToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      dispatch({ type: 'SET_USER', payload: { user: mockUser, token: mockToken } });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};