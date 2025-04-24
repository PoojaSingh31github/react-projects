import React from "react";

const HOC =(Children)=>{
return (props)=>(
    <>
        <Children {...props} />
        <div>heyyyy in hoc</div>
    </>
)
}

export default HOC;