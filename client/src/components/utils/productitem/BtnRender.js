import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {State} from "../../../Store";

const BtnRender = ({product, sizes, deleteProduct}) => {
    const  state  = useContext(State);
    const [isAdmin] = state.userApi.isAdmin
    const addToCart = state.userApi.addToCart

    return (
        <div className="row_btn">
            {isAdmin
                ? <>
                    <Link to="#" id="btn_buy" onClick={deleteProduct} name={product.slug}>
                        Delete
                    </Link>
                    <Link to={`/edit/${product.slug}`} id="btn_view">
                        Edit
                    </Link>
                </>
                : <>
                    <Link to="#" name={product.slug} id="btn_buy" onClick={()=>{addToCart(product, sizes)}}>
                        Buy
                    </Link>
                    <Link to={`/${product.slug}`} id="btn_view">
                        View
                    </Link>
                </>
            }
        </div>
    );
};

export default BtnRender;