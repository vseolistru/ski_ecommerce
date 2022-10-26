import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {getError} from "../utils/error";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    const submitRegister = async (e) =>{
        e.preventDefault()
        if (password === confirmpassword) {
            const {data} = await axios.post('/api/users/', {name: username, email, password});
            setTimeout(() => {
                const {_id, isActivated, role, ...toStore} = data
                localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
                toast.success("register...")
                window.location.href = '/';

            }, 1600);

        }
        else {
            toast.error('password is not compare');
        }
    }

    // useEffect(()=>{
    //     if (store) {
    //         window.location.href = '/';
    //     }
    // }, [store])

    return (
        <div className="login-page">
            <Helmet>
                <title>SKI & BIKE STORE - Register page</title>
            </Helmet>
            <form onSubmit={submitRegister}>
                <h1>Register</h1>
                <label>Username</label>
                <input type="UserName" required onChange={(e)=> setUserName(e.target.value)}/>

                <label>Email</label>
                <input type="email" required onChange={(e)=> setEmail(e.target.value)}/>

                <label>Password</label>
                <input type="password" required onChange={(e)=> setPassword(e.target.value)}/>

                <label>Compare Password</label>
                <input type="password" required onChange={(e)=> setConfirmPassword(e.target.value)}/>

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to={"/register"}>Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;