import { AxiosError } from 'axios';
import { ApiError } from './types';

// Extract error message from axios error
export const extractErrorMessage = (error: AxiosError): string => {
  if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
    return String(error.response.data.message);
  }
  
  if (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
    return String(error.response.data.error);
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Create API error object
export const createApiError = (error: AxiosError): ApiError => {
  return {
    message: extractErrorMessage(error),
    status: error.response?.status || 500,
    code: error.code,
    details: error.response?.data,
  };
};

// Check if error is network error
export const isNetworkError = (error: AxiosError): boolean => {
  return !error.response && error.request;
};

// Check if error is timeout
export const isTimeoutError = (error: AxiosError): boolean => {
  return error.code === 'ECONNABORTED' || error.message.includes('timeout');
};

// Retry function for failed requests
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on 4xx errors (client errors)
      if (error instanceof AxiosError && error.response?.status && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError!;
};

// Debounce function for API calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Format API URL with query parameters
export const formatApiUrl = (baseUrl: string, params?: Record<string, any>): string => {
  if (!params) return baseUrl;
  
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

// Validate API response
export const validateApiResponse = <T>(response: any): response is T => {
  return response && typeof response === 'object' && 'success' in response;
}; 