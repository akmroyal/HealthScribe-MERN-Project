import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import api from '../config/api';
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
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      // use shared axios client so interceptors apply
      const userData = await api.get(API_ENDPOINTS.AUTH.ME);

      const normalized = {
        ...(userData?.user || {}),
        userType: (userData?.role || null)?.toLowerCase() || null,
        session: userData?.session,
        profile: userData?.profile,
      };
      setCurrentUser(normalized);

      if (userData?.session) {
        if (userData.session?.access_token) localStorage.setItem('accessToken', userData.session.access_token);
        if (userData.session?.refresh_token) localStorage.setItem('refreshToken', userData.session.refresh_token);
        if (userData.session?.expires_at) localStorage.setItem('expiresAt', String(userData.session.expires_at));
      }
      if (userData?.profile) localStorage.setItem('userProfile', JSON.stringify(userData.profile));
      if (userData?.role) localStorage.setItem('userRole', userData.role);
      if (normalized.userType) localStorage.setItem('userType', normalized.userType);

      return { success: true, data: userData };
    } catch (error) {
      // clear stale session on failure
      console.error('Auth check failed:', error);
      setCurrentUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userType');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const userData = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials, { withCredentials: true });

      const normalized = {
        ...(userData?.user || {}),
        userType: (userData?.role || userData?.userType || null)?.toLowerCase() || null,
        session: userData?.session,
        profile: userData?.profile,
      };
      setCurrentUser(normalized);

      if (userData?.session) {
        if (userData.session?.access_token) localStorage.setItem('accessToken', userData.session.access_token);
        if (userData.session?.refresh_token) localStorage.setItem('refreshToken', userData.session.refresh_token);
        if (userData.session?.expires_at) localStorage.setItem('expiresAt', String(userData.session.expires_at));
      }
      if (userData?.profile) localStorage.setItem('userProfile', JSON.stringify(userData.profile));
      if (normalized.userType) localStorage.setItem('userType', normalized.userType);
      return { success: true, data: userData };
    } catch (error) {
      const errData = error?.response?.data;
      let errorText = 'Login failed';
      if (errData) {
        const raw = errData?.error || errData?.message || errData;
        errorText = typeof raw === 'string' ? raw : errorText;
      } else if (error?.message) {
        errorText = error.message;
      }
      if (/invalid login credentials|invalid email or password/i.test(errorText)) {
        errorText = 'Invalid email or password.';
      } else if (/unreachable|service is unreachable|service unavailable|503/i.test(errorText)) {
        errorText = 'Auth service is temporarily unavailable. Please try again shortly.';
      } else if (/fetch failed|network error/i.test(errorText)) {
        errorText = 'Cannot reach the authentication service. Check your internet or try again later.';
      }
      console.error('Login failed:', error);
      return { success: false, error: errorText };
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

      const result = await api.post(endpoint, userData);
      console.log('Registration response:', result);

      // Handle your backend response format
      if (result.message && result.message.includes('successfully')) {
        // Store user data after successful registration
        const newUser = {
          ...result?.user?.user,
          userType
        };
        setCurrentUser(newUser);
        console.log('User registered and stored:', newUser);

        // Persist session if backend returned one
        if (result?.session) {
          if (result.session?.access_token) localStorage.setItem('accessToken', result.session.access_token);
          if (result.session?.refresh_token) localStorage.setItem('refreshToken', result.session.refresh_token);
          if (result.session?.expires_at) localStorage.setItem('expiresAt', String(result.session.expires_at));
        }
        if (result?.profile) localStorage.setItem('userProfile', JSON.stringify(result.profile));
        if (result?.role) localStorage.setItem('userRole', result.role);

        return { success: true, data: result };
      }
      // If we reach here, backend didn't return expected success
      const raw = result?.error || result?.message;
      const baseMsg = typeof raw === 'string' ? raw : 'Registration failed';
      let friendly = baseMsg;
      if (/already|exists|duplicate|unique constraint|violat(es|ed)/i.test(baseMsg)) {
        friendly = 'This email is already registered. Please log in instead.';
      } else if (/password/i.test(baseMsg)) {
        friendly = 'Password is invalid. Use at least 8 characters.';
      }
      return { success: false, error: friendly, server: result };
    } catch (error) {
      console.error('Registration failed:', error);
      const errData = error?.response?.data;
      let errorText = 'Network error. Please try again.';
      if (errData) {
        const raw = errData?.error || errData?.message || errData;
        errorText = typeof raw === 'string' ? raw : errorText;
      }
      return { success: false, error: errorText };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userType');
      localStorage.removeItem('userRole');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth-options';
      }
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
