import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ErrorModal from "../../components/modal/ErrorModal";

interface PrivatePageProps{
    children: ReactNode,
}

const PrivatePage: React.FC<PrivatePageProps> = ({children}) => {

    const [showError, setShowError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const nev = useNavigate();

    const ifUserHaveToken = () => {
        const token = localStorage.getItem("myUserToken");
        if(!token){
            const errorMessage: string = "you didn't logged in, please do it!";
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