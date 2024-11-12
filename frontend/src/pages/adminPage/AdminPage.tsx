import React, { ReactNode, useEffect, useState } from 'react';
import ErrorModal from '../../components/modal/ErrorModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';

interface AdminPageProps {
    children: ReactNode;
}

const AdminPage: React.FC<AdminPageProps> = ({children}) => {

    const [showError, setShowError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const user = useSelector((state: RootState) => state.user.user);

    const nev = useNavigate();

    const ifUserIsAdmin = () => {
        if(!user.isAdmin){
            const errorMessage: string = "you are not an admin, please log in again";
            setMessage(errorMessage);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                nev("/login");
            }, 3000);
        }
    }

    useEffect(() => {
        ifUserIsAdmin();
    }, []);

  return (
    <div>
        {showError && <ErrorModal message={message}/>}
        {!showError && children}
    </div>
  )
}

export default AdminPage