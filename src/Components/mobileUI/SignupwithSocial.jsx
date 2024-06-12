import React from 'react';
import FacebookIcon from '../../images/facebook.svg';
import bannerImg from '../../images/banner.svg';
import twitterIcon from '../../images/twitter.svg';
import GooglePlus from '../../images/google-plus.svg';
import Linkedin from '../../images/linkedin.svg';

const SignupwithSocial = () => {
  return (
    <div id='signup-with-social'>
        <img src={bannerImg} alt="banner" />
        <h1>Sign Up</h1>
        <p>It's easier to sign up now</p>
        <button><img src={FacebookIcon} alt="" />Continue with Facebook</button><br />
        <button>I'll use email or phone</button>
        <div className="social-login-btn">
            <button><img src={twitterIcon} alt="twitter" /></button>
            <button><img src={GooglePlus} alt="google+" /></button>
            <button><img src={Linkedin} alt="linkedin" /></button>
        </div>
        <p>Already have account? <a href="/signinMobile">Login</a></p>
    </div>
  )
}

export default SignupwithSocial;