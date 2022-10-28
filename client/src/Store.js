import React, {createContext, useEffect, useState} from 'react';
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import axios from "axios";

export const State = createContext();


const StoreProvider = ({children}) => {
    const [token, setToken] = useState(false);
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    const refreshToken = async () =>{
        if (store) {
         const response = await axios.get('/api/users/refreshtoken')
         setToken(response.data.token)
        }
    }

    const state = {
        token: [token, setToken],
        ProductsAPI: ProductsAPI(),
        userApi: UserAPI(token),
    }

    useEffect(()=>{
        refreshToken()

    },[refreshToken])

    return (
        <State.Provider value={state}>
            {children}
        </State.Provider>
    );
};

export default StoreProvider;