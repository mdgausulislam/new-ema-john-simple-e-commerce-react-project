import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const Header = () => {
    const {user,logOut}=useContext(AuthContext);
    const handleLogOut=()=>{
        logOut()
        .then(()=>{

        })
        .catch(error=>{
            console.log(error);
        })

    }
    return (
        <nav className="header">
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/Login">Login</Link>
                <Link to="/signUp">Sign Up</Link>
                {
                    user && <span>Welcome{user.email}<button onClick={handleLogOut}>Sign Out</button></span>
                }
            </div>
          
        </nav>
    );
};

export default Header;