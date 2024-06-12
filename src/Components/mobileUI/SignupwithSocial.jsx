import React from 'react';
import FacebookIcon from '../../images/LogosFacebook.svg';
import bannerImg from '../../images/dolphy appsta.png';
import twitterIcon from '../../images/WhhCircletwitter.svg';
import GooglePlus from '../../images/LogosGoogleIcon.svg';
import Linkedin from '../../images/EntypoSocialLinkedinWithCircle.svg';

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