
import React, { useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { authService } from '@/api/services';
import { toastUtils } from '@/utils/toast-utils';

const GOOGLE_CLIENT_ID = '491854749014-6sunq8od6sunvsrbcrvmmca2c6ve7gm4.apps.googleusercontent.com';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleCredentialResponse = useCallback(async (googleResponse: any) => {
    try {
      // Show loading toast
      const loadingToast = toastUtils.loading('Signing you in...');

      const decoded = JSON.parse(atob(googleResponse.credential.split('.')[1]));
      const loginCredentials = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: googleResponse.credential
      };

      const apiResponse = await authService.login(loginCredentials);
      const loginData: any = apiResponse.data;

      // Dismiss loading toast
      toastUtils.dismiss(loadingToast);

      // Store tokens in localStorage
      localStorage.setItem('accessToken', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData));

      toastUtils.success('Login successful!', 'Welcome back to Sub AI');
      window.location.href = '/';

    } catch (error: any) {
      console.error('Login failed:', error);

      let errorMessage = 'Login failed. Please try again.';
      let errorDescription = 'An unexpected error occurred during login.';

      if (error.response?.status === 404) {
        errorMessage = 'API endpoint not found';
        errorDescription = 'Please check if the server is running on http://localhost:8000';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error';
        errorDescription = 'Please try again later or contact support.';
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        errorMessage = 'Network error';
        errorDescription = 'Please check your connection and ensure the server is running.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication failed';
        errorDescription = 'Please try logging in again.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied';
        errorDescription = 'You do not have permission to access this resource.';
      }

      toastUtils.error(errorMessage, errorDescription);
    }
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const buttonElement = document.getElementById('google-signin-button');
      if (buttonElement) {
        window.google.accounts.id.renderButton(buttonElement, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '100%',
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [handleCredentialResponse]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="text-white text-2xl">✨</div>
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome to Sub AI</CardTitle>
          <CardDescription>
            Sign in to continue to your ingredient substitute assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div id="google-signin-button" className="w-full"></div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
