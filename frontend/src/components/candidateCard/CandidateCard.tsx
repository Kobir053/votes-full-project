import React from 'react';
import { ICandidate, updateVote } from '../../store/features/candidatesSlice';
import './candidateCard.css';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeVote, setVote } from '../../store/features/userSlice';

interface CandidateCardProps {
    candidate: ICandidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({candidate}) => {

    const user = useSelector((state: RootState) => state.user.user);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const handleVote = () => {
        if(user.hasVoted){
            dispatch(removeVote());
            return;
        }
        const data = {id: user._id!, candidateId: candidate._id!}
        dispatch(updateVote(data));
        dispatch(setVote(candidate._id!));
    }

  return (
    <div className='candidate-card' style={{backgroundColor: user.votedFor == candidate._id? "orange" : "rgb(247, 229, 192)"}}>
        <p>Votes: {candidate.votes}</p>
        <h3>{candidate.name}</h3>
        <img src={candidate.image} alt={candidate.name}/>
        <button onClick={handleVote}>{user.hasVoted? "Cancel Vote": "Vote"}</button>
    </div>
  )
}

export default CandidateCard