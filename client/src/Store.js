import React, {createContext} from 'react';

export const State = createContext();


const StoreProvider = ({children}) => {
    return (
        <State.Provider value={"value in store"}>
            {children}
        </State.Provider>
    );
};

export default StoreProvider;