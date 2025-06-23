import HeroSection from "./Components/HeroSection"
import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import OTPAuthPage from "./Components/OTPAuthPage";
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/OTP" element={<OTPAuthPage />} />
      
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<HeroSection />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
