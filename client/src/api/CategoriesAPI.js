import {useEffect, useState} from 'react';
import axios from "axios";

const CategoriesAPI = () => {
    const [categories, setCategories] = useState([])
    const [callBack, setCallBack] = useState(false)


    useEffect(()=>{
        const fetchCategory = async () => {
            const {data} = await axios.get('/api/category')
            setCategories(data)
        }
        fetchCategory()
    },[callBack])


    return {
        categories: [categories, setCategories],
        callBack: [callBack, setCallBack]
    };
};

export default CategoriesAPI;