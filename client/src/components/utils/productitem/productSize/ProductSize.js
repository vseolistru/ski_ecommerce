import React, {useState} from 'react';

const ProductSize = ({product, setSize}) => {


    return (
        <form>
            {product.size.map((item, i)=>(
                <label
                    key={i}
                    datatype={product.slug}
                >
                    {item}
                    <input
                        type="radio"
                        id="radio"
                        name="sizes"
                        value={item}
                        onChange={(e)=> setSize(e.target.value)}
                    />
                </label>
            ))}
        </form>
    );
};

export default ProductSize;