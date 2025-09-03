import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../component/shared/AuthLayout';
import { useAuth } from '../../contexts/useAuth';

// Reusable login form that uses one backend endpoint and redirects by returned role
const UnifiedLogin = ({ userType = 'patient' }) => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((s) => ({ ...s, [name]: '' }));
  };

  const validate = () => {
    const v = {};
    if (!formData.email) v.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) v.email = 'Email address is invalid';
    if (!formData.password) v.password = 'Password is required';
    setErrors(v);
    return Object.keys(v).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setError('');
    try {
      const result = await login({ email: formData.email, password: formData.password });
      console.log('Login result:', result?.data);
      if (result.success) {
        const role = result?.data?.role;
        if (/doctor/i.test(role)) {
          console.log('Redirecting to /doctor');
          navigate('/doctor');
        } else if (/patient/i.test(role)) {
          console.log('Redirecting to /patient');
          navigate('/patient');
        } else {
          console.warn('Unknown role, sending to /auth-options');
          navigate('/auth-options');
        }
      } else {
        console.error('Login failed:', result.error);
        setError(result.error || 'Login failed. Please try again.');
      }
  } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const title = userType === 'doctor' ? 'Sign in as Doctor' : 'Sign in as Patient';
  const subtitle = userType === 'doctor'
    ? 'Access your medical practice dashboard'
    : 'Please enter your details to sign in';

  return (
    <AuthLayout title={title} subtitle={subtitle} formType="login" userType={userType}>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-teal-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-teal-600 text-lg font-medium">Signing you in...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder={userType === 'doctor' ? 'doctor@hospital.com' : 'example@email.com'}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-800">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-lg border text-gray-900 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Sign In
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default UnifiedLogin;
