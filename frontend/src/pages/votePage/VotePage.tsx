import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/features/userSlice';
import { useNavigate } from 'react-router';
import { fetchCandidates, ICandidate, setCandidates } from '../../store/features/candidatesSlice';
import Spinner from '../../components/spinner/Spinner';
import CandidateCard from '../../components/candidateCard/CandidateCard';
import './votePage.css';
import { io, Socket } from 'socket.io-client';

const VotePage: React.FC = () => {

    const SOCKET_URL = 'http://localhost:3001/';

    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

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

    const { candidates, isLoading} = useSelector((state: RootState) => state.candidates);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, []);

    useEffect(() => {

        const socketInstance = io(SOCKET_URL);
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected:', socketInstance.id);
            setConnected(true);
        });

        socketInstance.on('disconnect', (reason: string) => {
            console.log('Disconnected:', reason);
            setConnected(false);
        });

        socketInstance.on('updated-votes', (data: any) => {
            console.log("recieved updated candidates: ", data);
            dispatch(setCandidates(data));
        });
    }, []);

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