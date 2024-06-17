import './App.css';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import { useEffect, useState } from "react";
import {  BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProfilePage from './Components/ProfilePage';
import { ToastContainer } from 'react-toastify';
import { auth } from './Components/firebase';
import ResetPassword from './Components/ResetPassword';


function App() {
  const [passwordData, setPasswordData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  })

  const handleInput = (e) => {
    setPasswordData(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element= {<Signin
        passwordData={passwordData}
        showPassword={showPassword}
        handleInput={handleInput}
        handleShowPassword={handleShowPassword}
        />} />
        <Route path="/sign-up" element={<Signup 
        passwordData={passwordData}
        showPassword={showPassword}
        handleInput={handleInput}
        handleShowPassword={handleShowPassword}
        />} />
        <Route path='/profile-page' element={<ProfilePage/>}/>
        <Route path='/reset-password-page' element={<ResetPassword/>}/>
        </Routes>
      <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
