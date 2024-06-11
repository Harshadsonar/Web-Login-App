import React, { useState } from "react";
import img from "../675f868a84d281d4c39ec5e7c770bbd9.png";
import { Link } from "react-router-dom";
import GoogleIcon from "../images/LogosGoogleIcon.svg";
import AppleIcon from "../images/LogosApple.svg";
import MdiEye from "../images/MdiEye.svg";
import MdiEyeOff from "../images/MdiEyeOff.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Signup({
  handleInput,
  passwordData,
  handleShowPassword,
  showPassword,
}){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register");
    try{
      createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        })
      }
      console.log("User Registered Successfully !");
      toast.success("User Registered Successfully !", {
        position: "top-center",
      });
      window.location.href = "/";
    } catch (error){
      console.log(error.message);
      toast.success(error.message, {
        position: "top-center",
      });
    }
  }


  return (
    <form className="Signup" id="sign-up" onSubmit={handleRegister}>
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
          <input type="text" placeholder="First Name" required onChange={(e) => setFname(e.target.value) }/>
          <input type="text" placeholder="Last Name" required onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className="input-email">
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
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
        <button className="signup-btn" type="submit">Sign Up</button>
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
    </form>
  );
}

export default Signup;
