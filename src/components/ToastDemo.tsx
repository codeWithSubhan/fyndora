import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toastUtils } from '@/utils/toast-utils';

const ToastDemo = () => {
  const handleSuccessToast = () => {
    toastUtils.success('Operation completed successfully!', 'Your changes have been saved.');
  };

  const handleErrorToast = () => {
    toastUtils.error('Something went wrong!', 'Please try again or contact support.');
  };

  const handleWarningToast = () => {
    toastUtils.warning('Please be careful!', 'This action cannot be undone.');
  };

  const handleInfoToast = () => {
    toastUtils.info('Did you know?', 'You can customize these toast notifications.');
  };

  const handleLoadingToast = () => {
    const loadingToast = toastUtils.loading('Processing your request...');
    
    // Simulate async operation
    setTimeout(() => {
      toastUtils.dismiss(loadingToast);
      toastUtils.success('Request completed!');
    }, 3000);
  };

  const handlePromiseToast = () => {
    const fakeApiCall = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Data loaded successfully');
        } else {
          reject(new Error('Failed to load data'));
        }
      }, 2000);
    });

    toastUtils.promise(fakeApiCall(), {
      loading: 'Loading data...',
      success: 'Data loaded successfully!',
      error: 'Failed to load data. Please try again.',
    });
  };

  const handleApiError = () => {
    const mockError = {
      response: {
        status: 404,
        data: { message: 'Resource not found' }
      }
    };
    toastUtils.apiError(mockError, 'Custom error message');
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('Copied text!');
      toastUtils.copied('Text');
    } catch (error) {
      toastUtils.error('Failed to copy', 'Please try again');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Toast Notification Examples</CardTitle>
        <CardDescription>
          Click the buttons below to see different types of toast notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleSuccessToast} variant="default">
            Success Toast
          </Button>
          <Button onClick={handleErrorToast} variant="destructive">
            Error Toast
          </Button>
          <Button onClick={handleWarningToast} variant="outline">
            Warning Toast
          </Button>
          <Button onClick={handleInfoToast} variant="secondary">
            Info Toast
          </Button>
          <Button onClick={handleLoadingToast} variant="outline">
            Loading Toast
          </Button>
          <Button onClick={handlePromiseToast} variant="outline">
            Promise Toast
          </Button>
          <Button onClick={handleApiError} variant="outline">
            API Error Toast
          </Button>
          <Button onClick={handleCopyToClipboard} variant="outline">
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToastDemo; 