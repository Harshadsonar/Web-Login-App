import './App.css';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import { useState } from "react";
import {  BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [passwordData, setPasswordData] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <Route path="/" element={<Signin
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
