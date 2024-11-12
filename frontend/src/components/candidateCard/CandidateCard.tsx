import React from 'react';
import { ICandidate, updateVote } from '../../store/features/candidatesSlice';
import './candidateCard.css';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

interface CandidateCardProps {
    candidate: ICandidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({candidate}) => {

    const user = useSelector((state: RootState) => state.user.user);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const handleVote = () => {
        console.log("handle vote");
        const data = {id: user._id!, candidateId: candidate._id!}
        dispatch(updateVote(data));
    }

  return (
    <div className='candidate-card'>
        <p>Votes: {candidate.votes}</p>
        <h3>{candidate.name}</h3>
        <img src={candidate.image} alt={candidate.name}/>
        <button onClick={handleVote}>Vote</button>
    </div>
  )
}

export default CandidateCard