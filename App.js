import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import WelcomeScreen2 from './WelcomeScreen2';
import WelcomeScreen3 from './WelcomeScreen3'; 
import Login from './login'; 
import Register from './Register'; 
import OtpScreen from './OtpScreen'; 
import Success from './Success'; 
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import DetailScreen from './DetailScreen';
import SosScreen from './sos'; 
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

export default function App() {
  // สถานะสำหรับสลับหน้าจอ (เริ่มต้นที่ Welcome1)
  const [currentScreen, setCurrentScreen] = useState('Welcome1');
  
  // สถานะสำหรับเก็บข้อมูลสถานที่ที่เลือก เพื่อส่งไปหน้า Detail
  const [selectedPlace, setSelectedPlace] = useState(null);

  // --- 1. กลุ่มหน้า Welcome ---
  if (currentScreen === 'Welcome1') {
    return <WelcomeScreen onNext={() => setCurrentScreen('Welcome2')} />;
  }
  if (currentScreen === 'Welcome2') {
    return <WelcomeScreen2 onNext={() => setCurrentScreen('Welcome3')} onBack={() => setCurrentScreen('Welcome1')} />;
  }
  if (currentScreen === 'Welcome3') {
    return <WelcomeScreen3 onNext={() => setCurrentScreen('Login')} onBack={() => setCurrentScreen('Welcome2')} />;
  }

  // --- 2. กลุ่มหน้า Login / Register / OTP / Success ---
  if (currentScreen === 'Login') {
    return (
      <Login 
        onLogin={() => setCurrentScreen('Search')} 
        onRegister={() => setCurrentScreen('Register')} 
        onForgotPassword={() => setCurrentScreen('ForgotPassword')} 
      />
    );
  }
  if (currentScreen === 'Register') {
    return <Register onNext={() => setCurrentScreen('OTP')} onBack={() => setCurrentScreen('Login')} />;
  }
  if (currentScreen === 'OTP') {
    return <OtpScreen onVerify={() => setCurrentScreen('Success')} onBack={() => setCurrentScreen('Register')} />;
  }
  if (currentScreen === 'Success') {
    return <Success onNext={() => setCurrentScreen('Login')} />;
  }

  // --- 3. กลุ่มหน้าลืมรหัสผ่าน (Forgot Password Flow) ---
  if (currentScreen === 'ForgotPassword') {
    return <ForgotPassword onNext={() => setCurrentScreen('ForgotOTP')} onBack={() => setCurrentScreen('Login')} />;
  }
  if (currentScreen === 'ForgotOTP') {
    return <OtpScreen onVerify={() => setCurrentScreen('ResetPassword')} onBack={() => setCurrentScreen('ForgotPassword')} />;
  }
  if (currentScreen === 'ResetPassword') {
    return <ResetPassword onNext={() => setCurrentScreen('Login')} onBack={() => setCurrentScreen('ForgotOTP')} />;
  }

  // --- 4. กลุ่มหน้าฟีเจอร์หลัก (Search, Detail, SOS) ---
  if (currentScreen === 'Search') {
    return (
      <SearchScreen 
        onBack={() => setCurrentScreen('Home')} 
        goToDetail={(placeData) => {
          setSelectedPlace(placeData); 
          setCurrentScreen('Detail');  
        }}
      />
    );
  }
  if (currentScreen === 'Detail') {
    return (
      <DetailScreen 
        data={selectedPlace} 
        onBack={() => setCurrentScreen('Search')} 
      />
    );
  }
  if (currentScreen === 'SOS') {
    return (
      <SosScreen 
        onCancel={() => setCurrentScreen('Home')} 
      />
    );
  }

  // --- 5. หน้าหลัก (HomeScreen) ---
  return (
    <HomeScreen 
      onGoToSearch={() => setCurrentScreen('Search')}
      onGoToSOS={() => setCurrentScreen('SOS')}
    />
  );
}
