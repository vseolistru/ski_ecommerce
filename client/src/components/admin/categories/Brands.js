import React, {useContext, useState} from 'react';
import {Helmet} from "react-helmet-async";
import {toast} from "react-toastify";
import axios from "axios";
import {State} from "../../../Store";
import {getError} from "../../utils/error";

const Categories = () => {
    const state  = useContext(State);
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const token = store.token;
    const [brands, setBrands] = state.BrandsAPI.brands
    const [brand, setBrand] = useState('')
    const [callBack, setCallBack] = state.BrandsAPI.callBack
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async (e) =>{
        e.preventDefault()
        try {
            if(edit) {
                await axios.put(`/api/brand/${id}`, {name: brand},
                    {headers: {authorization: `Bearer ${token}`}})
                toast.success(`You edit a brand: ${brand}`)
            }
            else {
                await axios.post('/api/brand', {name: brand},
                    {headers: {authorization: `Bearer ${token}`}})
                toast.success(`You create a brand: ${brand}`)
            }
            setEdit(false)
            setCallBack(!callBack)

        } catch (e) {
            toast.error(getError(e))
        }
    }

    const editCategory = (id, name) => {
        setID(id)
        setBrand(name)
        setEdit(true)
    }

    const deleteCategory = async (id) => {
        try{
            await axios.delete(`/api/brand/${id}`,
                {headers: {authorization: `Bearer ${token}`}})
            setCallBack(!callBack)
            toast.success(`You delete a brand: ${brand}`)
        }
        catch (e) {
            toast.error(getError(e))
        }
    }

    return (
        <>
            <Helmet>
                <title>SKI & BIKE STORE - Brands admin page</title>
            </Helmet>
            <div className="categories">
                <form onSubmit={createCategory}>
                    <label htmlFor="category">Brands</label>
                    <input type="text" name="category"
                           value={brand} required onChange={(e) => setBrand(e.target.value)}/>
                    <button type="submit">{edit ? "Update" : "Create"}</button>
                </form>
                <div className="col">
                    { brands.map(item => (
                        <div className="row" key={item._id}>
                            <p>{item.name}</p>
                            <div>
                                <button onClick={()=>editCategory(item._id, item.name)}>Edit</button>
                                <button onClick={()=>deleteCategory(item._id)}>Delete</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Categories;