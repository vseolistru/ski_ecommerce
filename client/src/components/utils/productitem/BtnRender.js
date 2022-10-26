import React from 'react';
import {Link} from "react-router-dom";

const BtnRender = ({product}) => {
    return (
        <div className="row_btn">
            <Link to="#" id ="btn_buy">
                Buy
            </Link>
            <Link to={`/${product.slug}`} id ="btn_view">
                View
            </Link>
        </div>
    );
};

export default BtnRender;