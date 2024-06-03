import React, { useState } from "react";
import img from "../fb2.png";
import { Link } from "react-router-dom";
import GoogleIcon from "../images/LogosGoogleIcon.svg";
import AppleIcon from "../images/LogosApple.svg";
import MdiEye from "../images/MdiEye.svg";
import MdiEyeOff from "../images/MdiEyeOff.svg";

const Signin = ({ handleInput, passwordData, handleShowPassword, showPassword}) => {
  return (
    <div className="signin" id="sign-in">
      <div className="signin-page">
        <h1>Sign in to Overpay</h1>
        <p className="text">Send, spend and save smarter</p>
        <div className="signin-buttons">
          <button>
            <img src={GoogleIcon} alt="GoogleIcon" />
            <p>Sign Up with Google</p>
          </button>
          <button>
            <img src={AppleIcon} alt="AppleIcon" />
            <p>Sign Up with Apple</p>
          </button>
        </div>
        <div className="separator">
          <div className="line"></div>
          <p className="text">Or with email</p>
          <div className="line"></div>
        </div>
        <div className="input-email">
        <input type="email" placeholder="Email" /> 
        </div>
        <br />
        <div className="password-input">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={passwordData}
            onChange={handleInput}
            autoComplete="off"
          />
          <img
            src={showPassword ? MdiEye : MdiEyeOff}
            alt="show password"
            onClick={handleShowPassword}
            className="toggle-password"
          />
        </div>
        <div>
        <label>
          <input type="checkbox" />
          Remember me
        </label>
        <a href="" className="forgotPassword-btn">Forgot Password?</a>
        </div>
        <button className="signin-btn">Sign In</button>
        <p>
          Don't have an account? <Link to="/sign-up" className="sign-up-btn">Sign Up</Link>
        </p>
        <div className="bottom-links">
          <a href="">Privacy Policy</a>
          <a href="">Copyright 2022</a>
        </div>
      </div>
      <div className="signin-logo">
        <img src={img} alt="page" />
      </div>
    </div>
  );
};

export default Signin;
