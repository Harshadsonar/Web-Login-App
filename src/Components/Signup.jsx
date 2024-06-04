import React from "react";
import img from "../675f868a84d281d4c39ec5e7c770bbd9.png";
import { Link } from "react-router-dom";
import GoogleIcon from "../images/LogosGoogleIcon.svg";
import AppleIcon from "../images/LogosApple.svg";
import MdiEye from "../images/MdiEye.svg";
import MdiEyeOff from "../images/MdiEyeOff.svg";

function Signup({ handleInput, passwordData, handleShowPassword, showPassword}) {
  
  return (
    <div className="Signup" id="sign-up">
      <div className="signup-logo">
        <img src={img} alt="page" />
      </div>
      <div className="signup-page">
        <h1>Sign up for an account</h1>
        <p className="text">Send, spend and save smarter</p>
        <div className="signup-buttons">
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
        <div className="input-name">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
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
        <div className="policy-text">
          <p>
            By creating an account, you agreeing to our{" "}
            <a href="/">Privacy Policy</a>, and
            <a href="/"> Electronics Communication Policy</a>.
          </p>
        </div>
        <button className="signup-btn">Sign Up</button>
        <p>
          Already have an account?{" "}
          <Link to="/" className="sign-in-btn">
            Sign In
          </Link>
        </p>
        <div className="bottom-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Copyright 2022</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
