import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {State} from "../../Store";
import {Helmet} from "react-helmet-async";

const Profile = () => {
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const state = useContext(State);
    const [token] = state.token
    const [name, setName] = useState('')
    const [user_id, setUser_id] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')


    useEffect(()=>{
        setUser_id(store._id)
    },[])

    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`/api/orders/get/${user_id}`,
                {headers: {authorization: `Bearer ${token}`}});
            setName(data.name)
            setEmail(data.email)
            setPhone(data.phone)
            setCity(data.cityAddress)
            setAddress(data.address)
        }
            fetchData()

    })

    if (!name) {
        return (
            <>
                <Helmet>
                    <title>SKI & BIKE STORE - Orders page</title>
                </Helmet>
                <div className="orders-error">
                    <h2>You have not orders yet</h2></div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>SKI & BIKE STORE - Profile page</title>
            </Helmet>
            <div className="profile-view">
                <h1>Profile Client</h1>
                {!name
                    ? (<h2>You have not orders yet</h2>)
                    :( <>
                        <p>User: {name}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <p>City: {city}</p>
                        <p>Address: {address}</p>
                    </>
                    )
                }
            </div>
        </>
    );
};

export default Profile;