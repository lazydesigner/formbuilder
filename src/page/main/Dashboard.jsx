import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

export default function Dashboard() {
    const location = useLocation()
    const [ profile, setProfile ] = useState([]);
    const [islogged, setIsLogged] = useState();
    let Navigate = useNavigate();
    const logOut = () => {
        googleLogout();
        Navigate('/login')
    };
    const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    // Redirect to login if no authToken is found
    Navigate("/login");
  }else{
    console.log('a')
  }
    
  return (
    <div><h1>Dashboard</h1>
    
    {profile ? (
                <div>
                    <img src={profile.picture} alt="user " />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Id: {profile.sub}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <div><Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link></div>
            )}
    
    </div>
  )
}
