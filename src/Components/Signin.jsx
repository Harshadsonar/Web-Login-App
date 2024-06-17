import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../images/LogosGoogleIcon.svg";
import AppleIcon from "../images/LogosApple.svg";
import MdiEye from "../images/MdiEye.svg";
import MdiEyeOff from "../images/MdiEyeOff.svg";
import img from "../fb2.png";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

const Signin = ({ handleInput, passwordData, handleShowPassword, showPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully!");
      window.location.href = "/profile-page";
      toast.success("User logged in Successfully!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

 
  const googleLogin = async () => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const [firstName, ...lastNameArr] = user.displayName.split(" ");
        const lastName = lastNameArr.join(" ");

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName,
          photo: user.photoURL,
          lastName,
        });
        toast.success("User logged in Successfully!", {
          position: "top-center",
        });
        window.location.href = "/profile-page";
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <form className="signin" id="sign-in" onSubmit={handleSubmit}>
      <div className="signin-page">
        <h1>Sign in to Overpay</h1>
        <p className="text">Send, spend and save smarter</p>
        <div className="signin-buttons">
          <button type="button" onClick={googleLogin}>
            <img src={GoogleIcon} alt="GoogleIcon" />
            <p>Sign In with Google</p>
          </button>
          <button type="button">
            <img src={AppleIcon} alt="AppleIcon" />
            <p>Sign In with Apple</p>
          </button>
        </div>
        <div className="separator">
          <div className="line"></div>
          <p className="text">Or with email</p>
          <div className="line"></div>
        </div>
        <div className="input-email">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <img
            src={showPassword ? MdiEye : MdiEyeOff}
            alt="show password"
            onClick={handleShowPassword}
            className="toggle-password-signin"
          />
        </div>
        <div className="checkbox">
          <br />
          <label>
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            Remember me
          </label>
          <Link to="/reset-password-page" className="forgot-password-btn">Forgot Password?</Link>
        </div>
        <br />
        <button className="signin-btn" type="submit">Sign In</button>
        <p>
          Don't have an account? <Link to="/sign-up" className="sign-up-btn">Sign Up</Link>
        </p>
        <div className="bottom-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Copyright 2022</a>
        </div>
      </div>
      <div className="signin-logo">
        <img src={img} alt="page" />
      </div>
    </form>
  );
};

export default Signin;
