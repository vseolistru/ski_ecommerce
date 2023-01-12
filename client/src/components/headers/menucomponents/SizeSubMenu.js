import {useContext, useState} from "react";
import {State} from "../../../Store";

const SizeSubMenu = () => {

    const value = useContext(State)
    const getSize = value.ProductsAPI.getSize  //Sizes
    const [sizesMenu, setSizesMenu] = useState("sizes-menu-hidden ") //Sizes
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
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(183)}>183</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(186)}>186</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(191)}>191</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(192)}>192</button>
            </div>
            <div className={sizesMenu}>
                <p>Bikes:</p>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(54)}>54</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(56)}>56</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(58)}>58</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(60)}>60</button>
            </div>
            <div className={sizesMenu}>
                <p>Poles:</p>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>155</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>165</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>175</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>180</button>
            </div>
            <div className={sizesMenu}>
                <p>Boots:</p>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(40)}>40</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(41)}>41</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(42)}>42</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(43)}>43</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(44)}>44</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(45)}>45</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(46)}>46</button>
            </div>
            <div className={sizesMenu}>
                <p>Gloves:</p>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(6)}>6</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(7)}>7</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(8)}>8</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(9)}>9</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(10)}>10</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(11)}>11</button>
                <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(12)}>12</button>
            </div>
            <div className="drop-filter">
                <button className={sizesMenu} style={{marginBottom:"10px"}}
                        onClick={()=>getSize('')}>Drop Sizes</button>
            </div>
        </div>
    );
};

export default SizeSubMenu;