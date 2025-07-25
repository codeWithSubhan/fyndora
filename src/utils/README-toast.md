# Toast Notification System

This project uses **Sonner** for toast notifications, which provides a modern, accessible, and customizable toast system that works perfectly with Tailwind CSS.

## Features

- ✅ **Modern Design**: Clean, modern toast notifications
- ✅ **Tailwind CSS Integration**: Seamless styling with your design system
- ✅ **Accessible**: Built with accessibility in mind
- ✅ **Customizable**: Easy to customize colors, positions, and animations
- ✅ **TypeScript Support**: Full TypeScript support
- ✅ **Promise Support**: Built-in promise handling
- ✅ **Loading States**: Show loading indicators
- ✅ **Rich Colors**: Different colors for different message types

## Quick Start

### 1. Basic Usage

```tsx
import { toastUtils } from '@/utils/toast-utils';

// Success notification
toastUtils.success('Operation completed!', 'Your changes have been saved.');

// Error notification
toastUtils.error('Something went wrong!', 'Please try again.');

// Warning notification
toastUtils.warning('Please be careful!', 'This action cannot be undone.');

// Info notification
toastUtils.info('Did you know?', 'You can customize these notifications.');
```

### 2. Loading States

```tsx
// Show loading toast
const loadingToast = toastUtils.loading('Processing your request...');

// Do some async work
await someAsyncOperation();

// Dismiss loading toast
toastUtils.dismiss(loadingToast);

// Show success
toastUtils.success('Request completed!');
```

### 3. Promise-based Notifications

```tsx
// Automatically handles loading, success, and error states
toastUtils.promise(
  apiCall(),
  {
    loading: 'Loading data...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data. Please try again.',
  }
);
```

### 4. API Error Handling

```tsx
try {
  await apiCall();
} catch (error) {
  toastUtils.apiError(error, 'Custom error message');
}
```

## Toast Types

### Success Toast
```tsx
toastUtils.success('Success message', 'Optional description');
```

### Error Toast
```tsx
toastUtils.error('Error message', 'Optional description');
```

### Warning Toast
```tsx
toastUtils.warning('Warning message', 'Optional description');
```

### Info Toast
```tsx
toastUtils.info('Info message', 'Optional description');
```

### Loading Toast
```tsx
const toastId = toastUtils.loading('Loading message...');
// Later...
toastUtils.dismiss(toastId);
```

## Utility Functions

### Copy to Clipboard
```tsx
toastUtils.copied('Text'); // Shows "Text copied to clipboard"
```

### Save Confirmation
```tsx
toastUtils.saved('Changes'); // Shows "Changes saved successfully"
```

### Delete Confirmation
```tsx
toastUtils.deleted('Item'); // Shows "Item deleted successfully"
```

### Validation Errors
```tsx
const errors = {
  email: ['Email is required'],
  password: ['Password must be at least 8 characters']
};
toastUtils.validationError(errors);
```

## Configuration

The toast system is configured in `src/components/ui/sonner.tsx`:

```tsx
<Toaster
  position="top-right"        // Position on screen
  richColors                  // Use rich colors
  closeButton                 // Show close button
  duration={4000}             // Auto-dismiss after 4 seconds
  toastOptions={{
    style: {
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
    },
    className: 'font-sans',
  }}
/>
```

## Customization

### Custom Styling
You can customize the toast appearance by modifying the `toastOptions` in the Toaster component.

### Custom Positions
Available positions: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

### Custom Durations
Set different durations for different toast types:
```tsx
toast.success('Message', { duration: 6000 }); // 6 seconds
toast.error('Message', { duration: 8000 });   // 8 seconds
```

## Best Practices

1. **Use Descriptive Messages**: Make sure your toast messages are clear and actionable
2. **Include Descriptions**: Use the description field for additional context
3. **Handle Loading States**: Always show loading indicators for async operations
4. **Consistent Error Handling**: Use `toastUtils.apiError()` for consistent error messages
5. **Don't Overuse**: Don't show toasts for every minor action
6. **Accessibility**: The system is built with accessibility in mind, but test with screen readers

## Examples in Your App

### Login Flow
```tsx
const handleLogin = async () => {
  const loadingToast = toastUtils.loading('Signing you in...');
  
  try {
    await authService.login(credentials);
    toastUtils.dismiss(loadingToast);
    toastUtils.success('Login successful!', 'Welcome back!');
    navigate('/dashboard');
  } catch (error) {
    toastUtils.dismiss(loadingToast);
    toastUtils.apiError(error, 'Login failed');
  }
};
```

### Form Submission
```tsx
const handleSubmit = async (data) => {
  toastUtils.promise(
    api.submitForm(data),
    {
      loading: 'Saving your changes...',
      success: 'Changes saved successfully!',
      error: 'Failed to save changes. Please try again.',
    }
  );
};
```

### Copy to Clipboard
```tsx
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(text);
    toastUtils.copied('Link');
  } catch (error) {
    toastUtils.error('Failed to copy', 'Please try again');
  }
};
```

## Troubleshooting

### Toasts Not Showing
1. Make sure the `ToastProvider` is included in your app
2. Check that you're importing `toastUtils` correctly
3. Verify that the toast function is being called

### Styling Issues
1. Check that your CSS variables are defined
2. Ensure Tailwind CSS is properly configured
3. Verify the toast options in the provider

### Performance Issues
1. Don't show too many toasts at once
2. Use `toastUtils.dismiss()` to remove loading toasts
3. Consider using `toastUtils.promise()` for async operations 