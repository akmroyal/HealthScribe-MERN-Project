import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// API Endpoints object
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,               // Single login for both doctor & patient
    DOCTOR_REGISTER: `${API_BASE_URL}/api/auth/signup/doctor`,  // Doctor signup
    PATIENT_REGISTER: `${API_BASE_URL}/api/auth/signup/patient`, // Patient signup
    ME: `${API_BASE_URL}/api/auth/me`,                     // Get current user
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,             // Logout
  },
  DOCTOR: {
    PROFILE: `${API_BASE_URL}/api/doctor/profile`,
    PATIENTS: `${API_BASE_URL}/api/doctor/patients`,
  },
  PATIENT: {
    PROFILE: `${API_BASE_URL}/api/patient/profile`,
    RECORDS: `${API_BASE_URL}/api/patient/records`,
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // clear all session-related keys used by AuthProvider
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('userProfile'); 
      localStorage.removeItem('userRole');   
      localStorage.removeItem('userType');

      if (typeof window !== 'undefined') {
        window.location.href = '/auth-options';
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;