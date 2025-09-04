import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useFetchUserQuery } from '../services/api';

const Navbar = () => {
    const {data:user,isLoading}=useFetchUserQuery();
    
    return (
        <nav className="navbar">
            <h2 className="logo">InkSpire</h2>
            <ul className="nav-links">
                
                {user?
                    <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/admin">Admin</NavLink></li>
                        <li><NavLink to="/admin/new">New Post</NavLink></li>
                    </>
                :
                <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/signup">Signup</NavLink></li>
                </>}
                
            </ul>
        </nav>
    );
};

export default Navbar;
