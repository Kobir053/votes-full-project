import React from 'react';
import axios from "axios";
import useForm from '../../customHooks/useForm';

interface LoginProps{
    setModal: (modal: boolean) => void;
}

const Login: React.FC<LoginProps> = ({setModal}) => {

    const onSubmit = async() => {
        try {
            const response = await axios.post("http://localhost:3001/api/login", {...formHook.formValues});
            if(!response){
                setModal(true);
                throw new Error("error");
            }
            console.log(response.data);
            return response.data;
        } 
        catch (error: any) {
            setModal(true);
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
        </div>
    )
}

export default Login