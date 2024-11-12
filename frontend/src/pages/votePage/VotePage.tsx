import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/features/userSlice';
import { useNavigate } from 'react-router';
import { fetchCandidates, ICandidate } from '../../store/features/candidatesSlice';
import Spinner from '../../components/spinner/Spinner';

const VotePage: React.FC = () => {

    const {user} = useSelector((state: RootState) => state.user);

    const nev = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("myUserToken");
        nev("/login");
    }

    const renderCandidates = () => {
        if(candidates.length == 0) return;
        return candidates.map((c: ICandidate) => {
            return <div>{c.name}</div>
        });
    }

    const {error, errorMessage, candidates, isLoading} = useSelector((state: RootState) => state.candidates);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, []);

  return (
    <div className='vote-page'>
        {user.isAdmin ? <Navbar/>: <button onClick={handleLogout}>Logout</button>}
        {
            isLoading? 
            <Spinner/>: 
            <div>
                {renderCandidates()}
            </div>
        }
    </div>
  )
}

export default VotePage