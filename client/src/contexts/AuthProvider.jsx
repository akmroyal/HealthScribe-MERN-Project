import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(API_ENDPOINTS.AUTH.ME, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.ok) {
        const userData = await response.json();
        const normalized = {
          ...(userData?.user || {}),
      userType: (userData?.role || null)?.toLowerCase() || null,
          profile: userData?.profile,
        };
        setCurrentUser(normalized);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json();
        // Normalize shape for the app (ensure userType exists for guards)
        const normalized = {
          ...(userData?.user || {}),
          userType: (userData?.role || userData?.userType || null)?.toLowerCase() || null,
          session: userData?.session,
          profile: userData?.profile,
        };
        setCurrentUser(normalized);
        // Persist access token for subsequent /me calls
        if (userData?.session?.access_token) {
          localStorage.setItem('authToken', userData.session.access_token);
        }
        return { success: true, data: userData };
      } else {
        let errorText = 'Login failed';
        try {
          const errorData = await response.json();
          const raw = errorData?.error || errorData?.message || errorData;
          errorText = typeof raw === 'string' ? raw : errorText;
  } catch {
          // non-JSON response
        }
        // Friendly mapping for common cases
        if (/invalid login credentials|invalid email or password/i.test(errorText)) {
          errorText = 'Invalid email or password.';
        } else if (/unreachable|service is unreachable|service unavailable|503/i.test(errorText)) {
          errorText = 'Auth service is temporarily unavailable. Please try again shortly.';
        } else if (/fetch failed|network error/i.test(errorText)) {
          errorText = 'Cannot reach the authentication service. Check your internet or try again later.';
        }
        return { success: false, error: errorText };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Cannot reach the server. Please check your connection and try again.' };
    }
  };

  const register = async (userData, userType = 'doctor') => {
    try {
      setLoading(true);
      
      // Choose correct endpoint based on user type
      const endpoint = userType === 'doctor' 
        ? API_ENDPOINTS.AUTH.DOCTOR_REGISTER 
        : API_ENDPOINTS.AUTH.PATIENT_REGISTER;
      
      console.log('Registering to:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        
        console.log('Registration response:', result); // Issue 2: Log response
        
        // Handle your backend response format
        if (result.message && result.message.includes('successfully')) {
          // Store user data after successful registration
          const userData = {
            ...result.user.user, // Extract nested user data
            userType: userType   // Add userType for AuthCheck
          };
          
          setCurrentUser(userData);
          console.log('User registered and stored:', userData); // Issue 2: Success log
          
          return { success: true, data: result };
        } else {
          const raw = result?.error || result?.message;
          const baseMsg = typeof raw === 'string' ? raw : 'Registration failed';
          let friendly = baseMsg;
          if (/already|exists|duplicate|unique constraint|violat(es|ed)/i.test(baseMsg)) {
            friendly = 'This email is already registered. Please log in instead.';
          } else if (/password/i.test(baseMsg)) {
            friendly = 'Password is invalid. Use at least 8 characters.';
          }
          return { success: false, error: friendly, server: result };
        }
      } else {
        let errorText = 'Registration failed';
        let server;
        try {
          const errorData = await response.json();
          server = errorData;
          const raw = errorData?.error || errorData?.message || errorData;
          errorText = typeof raw === 'string' ? raw : errorText;
  } catch {
          // non-JSON error
        }
        // Friendly mapping for common cases
        if (/already|exists|duplicate|unique constraint|violat(es|ed)/i.test(errorText)) {
          errorText = 'This email is already registered. Please log in instead.';
        } else if (/password/i.test(errorText)) {
          errorText = 'Password is invalid. Use at least 8 characters.';
        }
        return { success: false, error: errorText, server };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setCurrentUser(null);
  localStorage.removeItem('authToken');
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      loading,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
