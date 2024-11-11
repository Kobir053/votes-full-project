import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/features/userSlice';
import { useNavigate } from 'react-router';

const VotePage: React.FC = () => {

    const {user} = useSelector((state: RootState) => state.user);

    const nev = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("myUserToken");
        nev("/login");
    }

  return (
    <div className='vote-page'>
        {user.isAdmin && <Navbar/>}
        <button onClick={handleLogout}>Logout</button>
        <p>Vote Page</p>
    </div>
  )
}

export default VotePage