import React, { useState } from 'react';
import axios from "axios";
import useForm from '../../customHooks/useForm';
import ErrorModal from '../../components/modal/ErrorModal';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';

const Login: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async() => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:3001/api/login", {...formHook.formValues});
            if(!response){
                setShowModal(true);
                setErrorMessage("could not login during a temperary problem, please try again and make sure you're doing everything correctly");
                setIsLoading(false);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
                throw new Error("failed in http request to login");
            }
            console.log(response.data);
            setIsLoading(false);
            return response.data;
        } 
        catch (error: any) {
            const message: string = "could not login during a temperary problem, please try again and make sure you're connecting to network";
            setErrorMessage(message);
            setShowModal(true);
            setIsLoading(false);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
            console.error(error.message);
        }
    }

    const formHook = useForm({username: "", password: ""}, onSubmit);


    return (
        <div className='login'>
            {
            isLoading? <Spinner/>: <div><form onSubmit={formHook.handleSubmit}>
                <label>Username</label>
                <input type="text" name='username' onChange={formHook.handleChange}/>
                <label>Password</label>
                <input type="text" name='password' onChange={formHook.handleChange}/>
                <button type='submit'>Login</button>
                </form>
                <h3>Don't have an account?</h3>
                <Link to="/register"><span style={{textDecoration: "underline"}}>Sign Up</span></Link></div>
            }
            
            {showModal && <ErrorModal message={errorMessage}/>}
        </div>
    )
}

export default Login