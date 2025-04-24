import React from "react";
import Button from "./Button";
import { useState } from "react";
import HOC from "./HOC";

const Mainnn=()=>{
    const [count, setCount] = useState(0);
    const HigherOrderFunc =HOC(Button)

    const handleCount =()=>{
        setCount((prev)=>prev+1);

    }
    const style={
        backgroundColor:"yellow",
        padding:"10px 20px"
    }
    return(
        <>
            <h2>Hello hunnyyyy bannyyy</h2>
            <p>{count}</p>
            <Button increaseCount={handleCount} buttonStyle={style} text={"this is text"} />
            <HigherOrderFunc increaseCount={handleCount} buttonStyle={style} text={"this is from HOc"}/>
        </>
    )
}

export default Mainnn;