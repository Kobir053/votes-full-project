import React, { useState } from 'react';
import axios from "axios";
import useForm from '../../customHooks/useForm';
import ErrorModal from '../../components/modal/ErrorModal';

// interface LoginProps{
//     setModal: (modal: boolean) => void;
// }

const Login: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async() => {
        try {
            const response = await axios.post("http://localhost:3001/api/login", {...formHook.formValues});
            if(!response){
                setShowModal(true);
                setErrorMessage("could not login during a temperary problem, please try again and make sure you're doing everything correctly");
                throw new Error("failed in http request to login");
            }
            console.log(response.data);
            return response.data;
        } 
        catch (error: any) {
            setShowModal(true);
            setErrorMessage("could not login during a temperary problem, please try again and make sure you're connecting to network");
            console.error(error.message);
        }
    }

    const formHook = useForm({username: "", password: ""}, onSubmit);


    return (
        <div className='login'>
            <form onSubmit={formHook.handleSubmit}>
                <label>Username</label>
                <input type="text" name='username' onChange={formHook.handleChange}/>
                <label>Password</label>
                <input type="text" name='password' onChange={formHook.handleChange}/>
                <button type='submit'>Login</button>
            </form>
            {showModal && <ErrorModal message={errorMessage} setShowModal={setShowModal}/>}
        </div>
    )
}

export default Login