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
    const [categories, setCategories] = state.CategoriesAPI.categories
    const [category, setCategory] = useState('')
    const [callBack, setCallBack] = state.CategoriesAPI.callBack
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async (e) =>{
        e.preventDefault()
        try {
            if(edit) {
                await axios.put(`/api/category/${id}`, {name: category},
                    {headers: {authorization: `Bearer ${token}`}})
                toast.success(`You edit a category: ${category}`)
            }
            else {
                await axios.post('/api/category', {name: category},
                    {headers: {authorization: `Bearer ${token}`}})
                toast.success(`You create a category: ${category}`)
            }
            setEdit(false)
            setCallBack(!callBack)

        } catch (e) {
            toast.error(getError(e))
        }
    }

    const editCategory = (id, name) => {
        setID(id)
        setCategory(name)
        setEdit(true)
    }

    const deleteCategory = async (id) => {
        try{
            await axios.delete(`/api/category/${id}`,
                {headers: {authorization: `Bearer ${token}`}})
            setCallBack(!callBack)
            toast.success(`You delete a category: ${category}`)
        }
        catch (e) {
            toast.error(getError(e))
        }
    }

    return (
        <>
            <Helmet>
                <title>SKI & BIKE STORE - Category admin page</title>
            </Helmet>
            <div className="categories">
                <form onSubmit={createCategory}>
                    <label htmlFor="category"> Category</label>
                    <input type="text" name="category"
                           value={category} required onChange={(e) => setCategory(e.target.value)}/>
                    <button type="submit">{edit ? "Update" : "Create"}</button>
                </form>
                <div className="col">
                    { categories.map(cat => (
                        <div className="row" key={cat._id}>
                            <p>{cat.name}</p>
                            <div>
                                <button onClick={()=>editCategory(cat._id, cat.name)}>Edit</button>
                                <button onClick={()=>deleteCategory(cat._id)}>Delete</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Categories;