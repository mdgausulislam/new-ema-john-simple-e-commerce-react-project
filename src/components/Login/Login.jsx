import React, { useState }  from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';

const Login = () => {
    const [show,setShow]=useState(false);

    const {signIn} =useContext(AuthContext);
    const navigate=useNavigate();
    const location=useLocation();

    const from=location.state?.from?.pathname|| '/';

    const handleLogin=event=>{
        event.preventDefault();
        const formLogIn=event.target;
        const email=formLogIn.email.value;
        const password=formLogIn.password.value;
        
        console.log(email,password);

        signIn(email,password)

        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            formLogIn.reset('');
            navigate(from,{replace:true});
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? 'text':'password'} name="password" id="" required />
                    <p onClick={()=>setShow(!show)}><small>
                        {
                            show ? <span>Hide Password</span>:<span>Show Password</span>
                        }
                        </small></p>
                </div>
                    <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Ema-john? <Link to='/signUp'>Create New Account</Link></small></p>
        </div>
    );
};

export default Login;