import HeroSection from "./Components/HeroSection"
import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import OTPAuthPage from "./Components/OTPAuthPage";
import VerificationSuccess from "./Components/VerificationSuccess";
import Dashboard from "./Dashboard/Dashboard";
import EditProfilePage from "./Components/EditProfilePage";
import UserProfileView from "./Components/UserProfileView";
import GetEmployees from "./GetInfo/GetEmployees";

import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/otp" element={<OTPAuthPage />} />
      <Route path="/signup/success" element={<VerificationSuccess />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:user_id" element={<UserProfileView />} />
      <Route path="/edit/:user_id"element={<EditProfilePage />} /> 

      <Route path="/" element={<HeroSection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/employees" element={<GetEmployees />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
