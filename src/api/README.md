# API Layer Documentation

This folder contains the complete API layer for the application, including axios interceptors, services, types, and utilities.

## Folder Structure

```
src/api/
├── axios.ts          # Axios instance with interceptors
├── types.ts          # TypeScript type definitions
├── config.ts         # API configuration and constants
├── utils.ts          # Utility functions for API handling
├── services/         # API service modules
│   ├── auth.ts       # Authentication service
│   ├── products.ts   # Products service
│   └── index.ts      # Service exports
├── hooks/            # Custom React hooks
│   └── useApi.ts     # Generic API hook
└── README.md         # This documentation
```

## Features

### 🔐 Axios Interceptors
- **Request Interceptor**: Automatically adds authentication tokens
- **Response Interceptor**: Handles common error cases (401, 403, 500+)
- **Development Logging**: Logs requests and responses in development mode
- **Token Management**: Automatic token refresh and logout on auth failures

### 📝 TypeScript Support
- Full type safety for all API calls
- Comprehensive type definitions for requests and responses
- Generic response wrappers with pagination support

### 🛠️ Utility Functions
- Error message extraction and formatting
- Retry logic with exponential backoff
- Debounced API calls
- URL formatting with query parameters
- Response validation

### 🎣 Custom Hooks
- `useApi`: Generic hook for API calls with loading states
- Built-in error handling and success callbacks
- Easy state management for API operations

## Usage Examples

### Basic API Call
```typescript
import { productService } from '@/api/services';

// Get all products
const products = await productService.getProducts({
  page: 1,
  limit: 10,
  category: 'electronics'
});
```

### Using the useApi Hook
```typescript
import { useApi } from '@/api/hooks/useApi';
import { productService } from '@/api/services';

const MyComponent = () => {
  const { data, loading, error, execute } = useApi(productService.getProducts, {
    onSuccess: (data) => console.log('Products loaded:', data),
    onError: (error) => console.error('Failed to load products:', error)
  });

  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, [execute]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render products */}</div>;
};
```

### Authentication
```typescript
import { authService } from '@/api/services';

// Login
const loginData = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
const user = await authService.getCurrentUser();
```

## Configuration

### Environment Variables
Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Customizing Interceptors
You can modify the interceptors in `src/api/axios.ts` to:
- Add custom headers
- Handle different authentication methods
- Implement custom error handling
- Add request/response transformations

## Error Handling

The API layer provides comprehensive error handling:

1. **Network Errors**: Automatic retry with exponential backoff
2. **Authentication Errors**: Automatic logout and redirect
3. **Server Errors**: User-friendly error messages
4. **Validation Errors**: Detailed error information

## Best Practices

1. **Always use TypeScript types** for API calls
2. **Use the useApi hook** for React components
3. **Handle loading and error states** in your UI
4. **Use the utility functions** for common operations
5. **Follow the service pattern** for organizing API calls

## Adding New Services

1. Create a new service file in `src/api/services/`
2. Define types in `src/api/types.ts`
3. Export the service from `src/api/services/index.ts`
4. Add endpoints to `src/api/config.ts` if needed

Example:
```typescript
// src/api/services/users.ts
import api from '../axios';
import { User, ApiResponse } from '../types';

export const userService = {
  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/users/profile');
    return response.data.data;
  }
};
``` 