import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';

function Login() {
    return (
        <div className="login">
            <div className="login__logo">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
                    alt=''
                />
                <Button 
                    type="submit"

                >Sign In</Button>
            </div>
        </div>
    )
}

export default Login
