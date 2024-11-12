import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ErrorModal from "../../components/modal/ErrorModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface PrivatePageProps{
    children: ReactNode,
}

const PrivatePage: React.FC<PrivatePageProps> = ({children}) => {

    const [showError, setShowError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const token = useSelector((state: RootState) => state.user.token);

    const nev = useNavigate();

    const ifUserHaveToken = () => {
        if(!token){
            const errorMessage: string = "you need to log in again please";
            setMessage(errorMessage);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                nev("/login");
            }, 3000);
        }
    }

    useEffect(() => {
        ifUserHaveToken();
    },[])

    return (
        <div>
            {showError && <ErrorModal message={message}/>}
            {!showError && children}
        </div>
    )
};

export default PrivatePage;