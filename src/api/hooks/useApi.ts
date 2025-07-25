import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { ApiError } from '../types';
import { createApiError } from '../utils';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    initialData?: T | null;
  }
): UseApiReturn<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: options?.initialData || null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState(prev => ({ ...prev, data: result, loading: false }));
        options?.onSuccess?.(result);
        return result;
      } catch (error) {
        const apiError = createApiError(error as AxiosError);
        setState(prev => ({ ...prev, error: apiError, loading: false }));
        options?.onError?.(apiError);
        return null;
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setState({
      data: options?.initialData || null,
      loading: false,
      error: null,
    });
  }, [options?.initialData]);

  return {
    ...state,
    execute,
    reset,
  };
}; 