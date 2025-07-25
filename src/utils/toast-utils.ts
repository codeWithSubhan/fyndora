import { toast } from '@/components/ui/sonner';

// Common toast patterns
export const toastUtils = {
  // Success notifications
  success: (message: string, description?: string) => {
    toast.success(message, { description });
  },

  // Error notifications
  error: (message: string, description?: string) => {
    toast.error(message, { description });
  },

  // Warning notifications
  warning: (message: string, description?: string) => {
    toast.warning(message, { description });
  },

  // Info notifications
  info: (message: string, description?: string) => {
    toast.info(message, { description });
  },

  // Loading notifications
  loading: (message: string) => {
    return toast.loading(message);
  },

  // Dismiss specific toast
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  },

  // Promise-based notifications
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  // API error handling
  apiError: (error: any, defaultMessage = 'An error occurred') => {
    let message = defaultMessage;
    let description = 'Please try again.';

    if (error.response?.status === 404) {
      message = 'Resource not found';
      description = 'The requested resource could not be found.';
    } else if (error.response?.status === 500) {
      message = 'Server error';
      description = 'Please try again later or contact support.';
    } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      message = 'Network error';
      description = 'Please check your connection and try again.';
    } else if (error.response?.status === 401) {
      message = 'Authentication required';
      description = 'Please log in to continue.';
    } else if (error.response?.status === 403) {
      message = 'Access denied';
      description = 'You do not have permission to perform this action.';
    } else if (error.response?.status === 422) {
      message = 'Validation error';
      description = 'Please check your input and try again.';
    }

    toast.error(message, { description });
  },

  // Form validation errors
  validationError: (errors: Record<string, string[]>) => {
    const errorMessages = Object.values(errors).flat();
    toast.error('Validation failed', {
      description: errorMessages.join(', '),
    });
  },

  // Copy to clipboard success
  copied: (item = 'Content') => {
    toast.success(`${item} copied to clipboard`);
  },

  // Save success
  saved: (item = 'Changes') => {
    toast.success(`${item} saved successfully`);
  },

  // Delete confirmation
  deleted: (item = 'Item') => {
    toast.success(`${item} deleted successfully`);
  },
}; 