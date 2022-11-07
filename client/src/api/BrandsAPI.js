import {useEffect, useState} from 'react';
import axios from "axios";

const BrandsAPI = () => {
    const [brands, setBrands] = useState([])
    const [callBack, setCallBack] = useState(false)


    useEffect(()=>{
        const fetchBrands = async () => {
            const {data} = await axios.get('/api/brand')
            setBrands(data)
        }
        fetchBrands()
    },[callBack])


    return {
        brands: [brands, setBrands],
        callBack: [callBack, setCallBack]
    };
};

export default BrandsAPI;