import React from 'react';
import Add from '../img/addAvatar.jpg'
const Register = () => {
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Luma Chat</span>
                <span className='title'>Register</span>
                <form>
                    <input type='text' placeholder='display name' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input type='file' id='file' style={{ display: 'none' }} />
                    <label for="file">
                        <img src={Add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button >Sign up</button>
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    );
};

export default Register;