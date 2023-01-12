import React from 'react';

const Sizes = ({sizes, setFnSizes}) => {
    return (
        <form>
            {sizes.map((item, i)=>(
                <label key={i}>{item}
                    <input type="radio"
                           id="radio"
                           name="sizes"
                           value={item}
                           onChange={(e)=>setFnSizes(e.target.value)}/>
                </label>
            ))}
        </form>
    );
};

export default Sizes;