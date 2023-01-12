import React, {useContext, useState} from 'react';
import {useRanger} from "react-ranger";
import {State} from "../../../Store";


const PriceSubMenu = () => {

    const [values, setValues] = useState([2000, 600000]);
    const value = useContext(State)
    const getPrice = value.ProductsAPI.getPrice
    const [price, setPrice] = useState("price-hidden")


    const { getTrackProps, handles } = useRanger({
        min: 2000,
        max: 600000,
        stepSize: 500,
        values,
        onChange: setValues
    });


    const priceHandler = () => {
        if (price === "price-hidden") {
            setPrice("")
        }
        else setPrice("price-hidden")
    }

    return (
        <div className="">
            <div className="category-name">
                <strong onClick={priceHandler}>Price </strong>

            </div>
            <div className={price}
                 {...getTrackProps({
                     style: {
                         margin: "20px 20px 20px 20px",
                         height: "9px",
                         background: "#ffff",
                         boxShadow: "inset 0 1px 2px rgba(0,0,0,.6)",
                         borderRadius: "2px"
                     }})}>
                {handles.map(({ getHandleProps }) => (
                    <button onClick={()=>getPrice(values)}
                        {...getHandleProps({
                            style: {
                                width: "14px",
                                height: "34px",
                                outline: "none",
                                borderRadius: "0",
                                background: "#1f4f3b",
                                border: "solid 1px #888"
                            }
                        })}
                    />
                ))}

            </div>
            {/*<div>{values[0]}{' '}{values[1]}</div>*/}
            <div className="drop-filter">
                <button style={{marginBottom:"10px"}} className={price}
                        onClick={()=>getPrice(["", ""])}>Drop Price</button>
            </div>
        </div>
    );
};

export default PriceSubMenu;