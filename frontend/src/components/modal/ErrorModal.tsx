import React, { useEffect } from 'react';
import './errorModal.css';
import { setError } from '../../store/features/userSlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface ErrorModalProps {
    message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message }) => {

    const {error} = useSelector((state: RootState) => state.user);

  return (
     error && <div className='error-modal'>
        <div className='info'>
            {message}
        </div>
    </div>
  )
}

export default ErrorModal