import React, { useState } from 'react';
import './SIgnUp.css'
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [error,setError]=useState('');

    const handleSignUp=event=>{
        event.preventDefault();
        const formSignUp=event.target;
        const email=formSignUp.email.value;
        const password=formSignUp.password.value;
        const confirmPassword=formSignUp.confirm.value;
        console.log(email,password,confirmPassword);

        if(password !==confirmPassword){
            setError('Your password did not match');
            return;
        }
        else if(password.length < 6){
            setError('Your password must be 6 character or longer');
            return;
        }

    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already Have an Account? <Link to='/login'>LogIn</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;