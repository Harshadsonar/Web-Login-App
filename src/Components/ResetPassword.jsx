import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { auth } from './firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try{
            await sendPasswordResetEmail(auth, email);
            navigate('/sign-in')
        } catch(error){
            console.log(error);
        }
    };

  return (
    <div className='reset-password-page'>
        <h1>Reset Password</h1>
        <form onSubmit={handlePasswordReset}>
            <div className="input-email">
                <input type="email"
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <br />
            <button className='reset-btn' type="submit">Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPassword;