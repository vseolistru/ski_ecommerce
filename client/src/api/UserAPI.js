import {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getError} from "../components/utils/error";
import axios from "axios";


const UserAPI = (token) => {

    const [islogged, setIsLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    useEffect(()=>{
        if(token) {
            const getUser = async () => {
                try{
                    if (store) {
                        const res = await axios.get(`/api/users/infor/${store._id}`,
                            {headers: {authorization: `Bearer ${token}`}})
                        setIsLogged(true)
                        res.data.user.role === 1 ? setisAdmin(true) : setisAdmin(false)
                    }
                }
                catch (e) {
                    toast.error(getError(e))
                }
            }
            getUser()
        }
    },[token, store])

    return {
        islogged: [islogged, setIsLogged],
        isAdmin: [isAdmin, setisAdmin]
    };
};

export default UserAPI;