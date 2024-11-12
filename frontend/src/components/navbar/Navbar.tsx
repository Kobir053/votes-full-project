import React from 'react';
import { useNavigate } from 'react-router';

const Navbar: React.FC = () => {

    const nev = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        nev("/register");
    }

  return (
    <div className='navbar'>
        <button onClick={logout}>LogOut</button>
        <button>Statistic Page</button>
    </div>
  )
}

export default Navbar