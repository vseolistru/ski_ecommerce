import React, {createContext, useState} from 'react';
import ProductsAPI from "./api/ProductsAPI";

export const State = createContext();


const StoreProvider = ({children}) => {
    const [token, setToken] = useState(false);

    const state = {
        token: [token, setToken],
        ProductsAPI: ProductsAPI()
    }

    return (
        <State.Provider value={state}>
            {children}
        </State.Provider>
    );
};

export default StoreProvider;