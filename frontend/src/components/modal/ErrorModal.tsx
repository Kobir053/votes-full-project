import React from 'react';
import './errorModal.css';

interface ErrorModalProps {
    message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message }) => {

    // setTimeout(() => {
    //     setShowModal(false);
    // }, 3000);

  return (
    <div className='error-modal'>
        <div className='info'>
            {message}
        </div>
    </div>
  )
}

export default ErrorModal