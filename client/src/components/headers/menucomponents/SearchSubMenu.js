import React, {useContext, useState} from 'react';
import {State} from "../../../Store";

const SearchSubMenu = () => {
    const value = useContext(State)
    const getSearch = value.ProductsAPI.getSearch

    const handleSearch = (e) => {
        e.preventDefault()
        const search = e.target.value
        getSearch(search)
    }

    const [search, setSearch] = useState('search-hidden')
    const searchHandler = () => {
        if (search === "search-hidden") {
            setSearch("search")
        }
        else {
            setSearch("search-hidden")
        }
    }

    return (
        <div className="">
            <div className="category-name" style={{marginBottom:"30px"}}>
                <strong onClick={searchHandler}>Search</strong>
            </div>
            <div className={search}>
                <form>
                    <input onChange={handleSearch}></input>
                </form>
            </div>
        </div>
    );
};

export default SearchSubMenu;