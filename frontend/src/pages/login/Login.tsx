import React, { useEffect, useState } from 'react';
import axios from "axios";
import useForm from '../../customHooks/useForm';
import ErrorModal from '../../components/modal/ErrorModal';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setError } from '../../store/features/userSlice';

const Login: React.FC = () => {

    const formHook = useForm({ username: "", password: "" }, onSubmit);

    const nev = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);
    // const [errorMessage, setErrorMessage] = useState<string>('');

    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { error, user, errorMessage, isLoading, token } = useSelector((state: RootState) => state.user);

    // const handleError = (text: string) => {
    //     setError({error: true, errorMessage: text});
    //     // setShowModal(true);
    //     // setIsLoading(false);
    //     setTimeout(() => {
    //         setError({error: false, errorMessage: null});
    //         console.log(error);
    //     }, 3000);
    // }

    async function onSubmit() {
        try {
            dispatch(loginUser(formHook.formValues as { username: string, password: string }));
        }
        catch (error: any) {
            const message: string = "could not login during a temperary problem, please try again and make sure you're connecting to network";
            // handleError(message);
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        if (token)
            nev("/vote");
    }, [token])

    return (
        <div className='login'>
            {
                isLoading ? <Spinner /> : <div><form onSubmit={formHook.handleSubmit}>
                    <label>Username</label>
                    <input type="text" name='username' onChange={formHook.handleChange} />
                    <label>Password</label>
                    <input type="password" name='password' onChange={formHook.handleChange} />
                    <button type='submit'>Login</button>
                </form>
                    <h3>Don't have an account?</h3>
                    <Link to="/register"><span style={{ textDecoration: "underline" }}>Sign Up</span></Link></div>
            }
            <p>{user.username}</p>
            {error == true && <ErrorModal message={errorMessage!}/>}
        </div>
    )
}

export default Login