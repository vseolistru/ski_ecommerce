import React, {createContext, useEffect, useState} from 'react';
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import BrandsAPI from "./api/BrandsAPI";
import axios from "axios";

export const State = createContext();


const StoreProvider = ({children}) => {
    const [token, setToken] = useState(false);
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    const refreshToken = async () =>{
        if (store) {
         const response = await axios.get('/api/users/refreshtoken')
         setToken(response.data.token)
         localStorage.setItem('Ski&bikeToken', JSON.stringify(response.data.token));

        }
    }

    const state = {
        token: [token, setToken],
        ProductsAPI: ProductsAPI(),
        CategoriesAPI: CategoriesAPI(),
        BrandsAPI:BrandsAPI(),
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