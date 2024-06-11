import React from 'react'

const SigninMobile = () => {
  return (
    <div id='signin-mobile'>
        <p>Welcome Back,</p>
        <h1>Log In!</h1>
        <div className="email-address">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" name="email" id="email" placeholder='Email Address' />
        </div>
        <div className="password">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" name="password" id="password" placeholder='Password' />
        </div>
        <div className="forgot-password">
            <label htmlFor=""><input type="checkbox" />Remember me</label>
            <a href="/">Forgot Password?</a>
        </div>
        <div className="log-in-btn">
            <button>Log in</button>
        </div>
    </div>
  )
}

export default SigninMobile;