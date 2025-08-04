import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

const AuthCheck = ({ children, requiredUserType }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, loading } = useAuth();
  
  useEffect(() => {
    const checkAuth = () => {
      if (loading) return;
      
      if (!currentUser) {
        navigate('/auth-options');
        return;
      }
      
      if (requiredUserType && currentUser.userType !== requiredUserType) {
        navigate(currentUser.userType === 'doctor' ? '/dashboard' : '/patient');
        return;
      }
      
      setIsAuthorized(true);
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate, requiredUserType, currentUser, loading]);
  
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-teal-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthorized ? children : null;
};

export default AuthCheck;
