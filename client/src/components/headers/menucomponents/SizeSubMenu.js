import {useContext, useState} from "react";
import {State} from "../../../Store";

const SizeSubMenu = () => {

    const value = useContext(State)
    const getSize = value.ProductsAPI.getSize  //Sizes
    const [sizesMenu, setSizesMenu] = useState("sizes-menu-hidden ") //Sizes

    const skiSizes = [183,186,191,192]
    const bikeSizes = [54,56,58,60]
    const polesSizes = [145,150,155,160,165,170,175]
    const mensShoesSize = [40,41,42,43,44,45,46]
    const glovesSizes = [6,7,8,9,10,11,12]

    const sizesHandler = () => {         // Sizes
        if (sizesMenu === "sizes-menu-hidden") {
            setSizesMenu("category-menu" )
        }
        else {
            setSizesMenu("sizes-menu-hidden")
            getSize('')

        }
    }


    return (
        <div className="">
            <div className="category-name">
                <strong onClick={sizesHandler}>Sizes</strong>
            </div>
            <div className={sizesMenu}>
                <p>Skies:</p>
                {skiSizes.map((item, idx) =>
                    <button style={{width:"50px",marginLeft:"3px"}}
                            onClick={()=>getSize(item)} key={idx}>{item}</button>)}
            </div>
            <div className={sizesMenu}>
                <p>Bikes:</p>
                {bikeSizes.map((item, idx)=>
                    <button style={{width:"50px",marginLeft:"3px"}} key={idx}
                            onClick={()=>getSize(item)}>{item}</button>)}
            </div>
            <div className={sizesMenu}>
                <p>Poles:</p>
                {polesSizes.map((item, idx)=>
                    <button style={{width:"50px",marginLeft:"3px"}} key={idx}
                            onClick={()=>getSize(item)}>{item}</button>)}

            </div>
            <div className={sizesMenu}>
                <p>Boots:</p>
                {mensShoesSize.map((item, idx) =>
                    <button style={{width:"50px",marginLeft:"3px"}} key={idx}
                            onClick={()=>getSize(item)}>{item}</button>)}
            </div>
            <div className={sizesMenu}>
                <p>Gloves:</p>
                {glovesSizes.map((item,idx)=>
                    <button style={{width:"50px",marginLeft:"3px"}} key={idx}
                            onClick={()=>getSize(item)}>{item}</button>)}

            </div>
            <div className="drop-filter">
                <button className={sizesMenu} style={{marginBottom:"10px"}}
                        onClick={()=>getSize('')}>Drop Sizes</button>
            </div>
        </div>
    );
};

export default SizeSubMenu;