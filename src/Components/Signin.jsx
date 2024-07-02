import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../images/LogosGoogleIcon.svg";
import FacebookIcon from "../images/LogosFacebook.svg";
import MdiEye from "../images/MdiEye.svg";
import MdiEyeOff from "../images/MdiEyeOff.svg";
import img from "../fb2.png";
import { auth, db, fbAuthProvider } from "./firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  linkWithCredential,
  FacebookAuthProvider
} from "firebase/auth";
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
    } catch (error) {
      console.log(error);
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

        window.location.href = "/profile-page";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FacebookAuth = async () => {
    try {
      const fbAuth = await signInWithPopup(auth, fbAuthProvider);
      const user = fbAuth.user;

      if (user) {
        const [firstName, ...lastNameArr] = user.displayName.split(" ");
        const lastName = lastNameArr.join(" ");

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName,
          photo: user.photoURL,
          lastName,
        });

        return fbAuth;
      } else {
        throw new Error("User is undefined");
      }
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = FacebookAuthProvider.credentialFromError(error);
        const email = error.customData.email;

        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
          const password = prompt("Please provide your password for " + email);
          const credential = EmailAuthProvider.credential(email, password);
          const userCredential = await signInWithEmailAndPassword(auth, email, password);

          await linkWithCredential(userCredential.user, pendingCred);
          return userCredential;
        } else if (signInMethods.includes(GoogleAuthProvider.PROVIDER_ID)) {
          const googleProvider = new GoogleAuthProvider();
          const userCredential = await signInWithPopup(auth, googleProvider);

          await linkWithCredential(userCredential.user, pendingCred);
          return userCredential;
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  };

  const FacebookAuthButtonClicked = async () => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await FacebookAuth();
      const user = result.user;

      if (user) {
        window.location.href = "/profile-page";
      } else {
        console.log("User is undefined after FacebookAuth");
      }
    } catch (error) {
      console.log("Facebook login failed", error);
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
          <button type="button" onClick={FacebookAuthButtonClicked}>
            <img src={FacebookIcon} alt="FacebookIcon" />
            <p>Sign In with Facebook</p>
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
