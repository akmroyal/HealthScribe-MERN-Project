import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/dashboard/Dashboard";
import Patdash from "./page/dashboard/Patdash";
import PatientLogin from "./page/auth/PatientLogin";
import PatientSignup from "./page/auth/PatientSignup";
import DoctorLogin from "./page/auth/DoctorLogin";
import DoctorSignup from "./page/auth/DoctorSignup";
import AuthOptions from "./page/AuthOptions";
import NotFound from "./page/NotFound";
import AuthCheck from "./component/shared/AuthCheck";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth-options" element={<AuthOptions />} />
        
        {/* Authentication routes */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        
        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={
          <AuthCheck requiredUserType="doctor">
            <Dashboard />
          </AuthCheck>
        } />
        <Route path="/patient" element={
          <AuthCheck requiredUserType="patient">
            <Patdash />
          </AuthCheck>
        } />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
