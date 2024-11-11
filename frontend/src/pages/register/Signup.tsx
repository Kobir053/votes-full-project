import React from 'react';
import useForm from '../../customHooks/useForm';
import axios from 'axios';

const Signup: React.FC = () => {

    const onSubmit = async() => {
        try {
            const response = await axios.post("http://localhost:3001/api/register", {...formHook.formValues});
            if(!response){
                throw new Error("error");
            }
            console.log(response.data);
            return response.data;
        } 
        catch (error: any) {
            console.error(error.message);
        }
    }

    const formHook = useForm({username: "", password: ""}, onSubmit);

  return (
    <div className='signup'>
        <form onSubmit={formHook.handleSubmit}>
            <label>Username</label>
            <input type="text" name='username' onChange={formHook.handleChange}/>
            <label>Password</label>
            <input type="password" name='password' onChange={formHook.handleChange}/>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup;