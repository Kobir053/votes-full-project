import React from 'react';
import { useNavigate } from 'react-router';
import './navbar.css';

const Navbar: React.FC = () => {

    const nev = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        nev("/register");
    }

  return (
    <div className='navbar'>
        <button onClick={logout}>Log Out</button>
        <button onClick={() => nev("/statistic")}>Statistic Page</button>
    </div>
  )
}

export default Navbar