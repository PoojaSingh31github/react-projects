import React from "react";

const Button =({increaseCount,buttonStyle,text})=>{
return(
    <button onClick={increaseCount} style={buttonStyle}>{text} </button>
)
}
export default Button;
