import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import axios from "axios";
import {toast} from "react-toastify";
import {getError} from "../utils/error";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    useEffect(()=>{
        if (store) {
            window.location.href = '/';
        }
    }, [store])

    const resetSubmit = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post('/api/user/reset', {email})
            toast.info("Link send to your email")
        }
        catch (e) {
            toast.error(getError(e))
        }
    }

    return (
        <div className="login-page forgot">
            <Helmet>
                <title>SKI & BIKE STORE - Forgot-password page</title>
            </Helmet>
            <form onSubmit={resetSubmit}>
                <h1>Forgot password</h1>
                <label>Email</label>
                <input type="email" name="email" required
                       placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button type="submit">Reset Password</button>
                </form>
        </div>
    );
};

export default ForgotPassword;