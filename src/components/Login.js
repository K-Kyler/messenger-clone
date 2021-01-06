import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase'; 

function Login({ user, setUser }) {
    const signInHandler = () => {
        auth.signInWithPopup(provider)
            .then(result => setUser(...user, result.user))
            .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
                    alt=''
                />
                <Button 
                    type="submit"
                    onClick={signInHandler}
                >Sign In</Button>
            </div>
        </div>
    )
}

export default Login
