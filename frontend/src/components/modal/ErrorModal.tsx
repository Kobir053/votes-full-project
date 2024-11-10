import React from 'react';
import './errorModal.css';

interface ErrorModalProps {
    text: string;
    setModal: (modal: boolean) => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ text, setModal }) => {

    setTimeout(() => {
        setModal(false);
    }, 3000);

  return (
    <div className='error-modal'>
        <div className='info'>
            {text}
        </div>
    </div>
  )
}

export default ErrorModal