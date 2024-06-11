import React from "react";

const SignupMobile = () => {
  return (
    <div id="signup-mobile">
      <p>Hello,</p>
      <h1>Sign Up!</h1>
      <div className="username">
        <label htmlFor="username">USER NAME</label>
        <input type="text" id="username" />
      </div>
      <div className="email-address">
        <label htmlFor="email">EMAIL ADDRESS</label>
        <input type="email" id="email" />
      </div>
      <div className="password">
        <label htmlFor="password">PASSWORD</label>
        <input type="password" id="password" />
      </div>
      <div className="policy">
        <button>switch</button>
        <p>I accept the policy and terms</p>
      </div>
      <div className="sign-up-btn">
        <button>Sign up</button>
      </div>
      <div className="social-media-signup">
        <button>
          <img src="" alt="twitter" />
        </button>
        <button>
          <img src="" alt="google" />
        </button>
        <button>
          <img src="" alt="linkedin" />
        </button>
      </div>
    </div>
  );
};

export default SignupMobile;
