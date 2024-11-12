import React, { useEffect, useState } from 'react';
import useForm from '../../customHooks/useForm';
import ErrorModal from '../../components/modal/ErrorModal';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/features/userSlice';
import './login.css';

const Login: React.FC = () => {

    const formHook = useForm({ username: "", password: "" }, onSubmit);

    const nev = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { error, user, errorMessage, isLoading, token } = useSelector((state: RootState) => state.user);

    const handleError = () => {
        setShowModal(true);
        setMessage(errorMessage!);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    }

    async function onSubmit() {
        dispatch(loginUser(formHook.formValues as { username: string, password: string }));
    }
    
    useEffect(() => {
        if (token)
            nev("/vote");
    }, [token]);

    useEffect(() => {
        if(error == true)
            handleError();
    }, [error]);

    return (
        <div className='login'>
            {
                isLoading ?
                <Spinner /> :
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={formHook.handleSubmit}>
                        <div className='input-div'>
                            <label>Username</label>
                            <input type="text" name='username' onChange={formHook.handleChange} />
                        </div>
                        <div className='input-div'>
                            <label>Password</label>
                            <input type="password" name='password' onChange={formHook.handleChange} />
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                    <h3>Don't have an account?</h3>
                    <Link to="/register"><span style={{ textDecoration: "underline" }}>Sign Up</span></Link>
                </div>
            }
            <p>{user.username}</p>
            {showModal == true && <ErrorModal message={message}/>}
        </div>
    )
}

export default Login