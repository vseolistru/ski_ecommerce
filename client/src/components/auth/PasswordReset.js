import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import axios from "axios";

const PasswordReset = () => {
    const [password, setPassword] = useState('')
    const store = JSON.parse(localStorage.getItem('Ski&bikePassword'))
    const userId = store.userId
    const token = store.token

    const resetSubmit = async (e) =>{
        e.preventDefault()
        await axios.post(`/api/user/reset/${userId}/${token}`, {password})
        localStorage.removeItem('Ski&bikePassword');
        window.location.href = '/login';
    }


    return (
        <div>
            <div className="login-page forgot">
                <Helmet>
                    <title>SKI & BIKE STORE - Forgot-password page</title>
                </Helmet>
                <form onSubmit={resetSubmit}>
                    <h1>Forgot password</h1>
                    <label>Password</label>
                    <input type="password" name="password" required
                           placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Set Password</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;