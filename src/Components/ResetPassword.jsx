import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from './firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try{
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent!", {
                position: "top-center",
            });
            navigate('/sign-in')
        } catch(error){
            console.log(error);
            toast.error(error.message, {
                position: "top-center",
            });
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
            <button className='reset-btn' type="submit">Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPassword;