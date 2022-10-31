import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {getError} from "../utils/error";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet-async";

const Login = () => {
    const [user, setUser] = useState({email:'', password:''})
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    const onChangeInput = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post('/api/users/login',{...user})
            setTimeout(() => toast("login..."), 2000);
            const {isActivated, role, token, ...toStore } = data
            localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
            window.location.href = '/';
        }
        catch (e) {
            toast.error(getError(e))
        }
    }

    useEffect(()=>{
        if (store) {
            window.location.href = '/';
        }
    }, [store])
    
    return (
        <>
            <div className="login-page">
                <Helmet>
                    <title>SKI & BIKE STORE - Login page</title>
                </Helmet>
                <form onSubmit={loginSubmit}>
                    <h1>Login</h1>
                    <label>User</label>
                    <input type="email" name="email" required
                           placeholder="Email" value={user.email} onChange={onChangeInput}/>

                    <label>Password</label>
                    <input type="password" name="password" required placeholder="Password"
                           value={user.password} onChange={onChangeInput}/>

                    <div className="row">
                        <button type="submit">Login</button>
                        <Link to={"/forgot-password"}>Forgot password</Link>
                        <Link to={"/register"}>Register</Link>
                    </div>
                </form>
            </div>

        </>
    );
};

export default Login;