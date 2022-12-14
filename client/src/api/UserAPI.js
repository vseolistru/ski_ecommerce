import {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";


const UserAPI = (token) => {
    const [islogged, setIsLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))

    useEffect(()=>{
        if(token) {
            const getUser = async () => {
                try{
                    if (store) {
                        const res = await axios.get(`/api/users/infor/${store._id}`,
                            {headers: {authorization: `Bearer ${token}`}})
                        setIsLogged(true)
                        res.data.role === 1 ? setisAdmin(true) : setisAdmin(false)
                    }
                }
                catch (e) {
                    //toast.error(getError(e))
                }

            }
            getUser()
        }
    },[token, isAdmin])

    const addToCart = async (product, sizes) => {
        if(!store) {
            toast.info("Please login to continue buying")
        }

        if (sizes){
            const existItem = cart.every(item => item._id !== product._id)
            if (existItem) {
                const sizesToSell = sizes
                setCart([...cart, {...product, sold:1, quantity: 1, sizesToSell}])

                await axios.patch(`/api/users/addcart/${store._id}`,
                    {cart: [...cart, {...product, sold:1, quantity: 1, sizesToSell}]},
                    {headers: {authorization: `Bearer ${token}`}})

                const {data} = await axios.get(`/api/users/infor/${store._id}`,
                {headers: {authorization: `Bearer ${token}`}})

               const {isActivated, role, ...toStore} = data
               localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
                toast.success("Product has been added to cart")
            }
            else {
                toast.error("This product is exist in cart")
            }
        }
        else {
            toast.error("Please set size of product")
        }
    }

    return {
        islogged: [islogged, setIsLogged],
        isAdmin: [isAdmin, setisAdmin],
        cart: [cart, setCart],
        addToCart: addToCart
    };
};

export default UserAPI;