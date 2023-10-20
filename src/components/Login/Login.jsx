import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
    const handleSignUp=event=>{
        event.preventDefault();
        const SignUp=event.target;
        const email=SignUp.email.value;
        const password=SignUp.password.value;
        const confirmPassword=SignUp.confirm.value;
        console.log(email,password,confirmPassword);

    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                    <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Ema-john? <Link to='/signUp'>Create New Account</Link></small></p>
        </div>
    );
};

export default Login;