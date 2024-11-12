import './errorModal.css';

interface ErrorModalProps {
    message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message }) => {

  return (
  <div className='error-modal'>
        <div className='info'>
            {message}
        </div>
    </div>
  )
}

export default ErrorModal;