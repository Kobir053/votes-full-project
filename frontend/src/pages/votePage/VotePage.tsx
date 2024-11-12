import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/features/userSlice';
import { useNavigate } from 'react-router';
import { fetchCandidates, ICandidate } from '../../store/features/candidatesSlice';
import Spinner from '../../components/spinner/Spinner';
import CandidateCard from '../../components/candidateCard/CandidateCard';
import './votePage.css';

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
            return <CandidateCard candidate={c}/>
        });
    }

    // const [showModal, setShowModal] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>('');

    // const handleError = () => {
    //     setShowModal(true);
    //     setMessage(errorMessage!);
    //     setTimeout(() => {
    //         setShowModal(false);
    //     }, 3000);
    // }

    const {error, errorMessage, candidates, isLoading} = useSelector((state: RootState) => state.candidates);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, []);

    // useEffect(() => {
    //     if(error)
    //         handleError();
    // }, [error]);

  return (
    <div className='vote-page'>
        <div className='vote-page-navbar'>{user.isAdmin ? <Navbar/>: <button onClick={handleLogout}>Logout</button>}</div>
        {
            isLoading? 
            <Spinner/>: 
            <div className='candidates-container'>
                <div className='all-candidates'>
                    {renderCandidates()}
                </div>
            </div>
        }
    </div>
  )
}

export default VotePage